import { type CollectionEntry, getCollection } from "astro:content";
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import { getCategoryUrl } from "@utils/url-utils.ts";

// 检索文章并按发布日期排序（优先置顶文章）
async function getRawSortedPosts() {
  const allBlogPosts = await getCollection("posts", ({ data }) => {
    // 生产环境过滤草稿，开发环境显示所有
    return import.meta.env.PROD ? data.draft !== true : true;
  });
  // 修复：删除多余的闭合括号（原代码此处多了一个 `)`）

  // 排序逻辑：先按置顶状态，再按发布时间
  const sorted = allBlogPosts.sort((a, b) => {
    // 优先比较置顶状态：置顶文章排在前面
    if (a.data.pinned && !b.data.pinned) return -1;
    if (!a.data.pinned && b.data.pinned) return 1;
    // 置顶状态相同则按发布时间倒序（最新在前）
    const dateA = new Date(a.data.published);
    const dateB = new Date(b.data.published);
    return dateA > dateB ? -1 : 1;
  });
  // 修复：删除重复的排序逻辑（原代码重复定义了 sorted）

  return sorted;
}

export async function getSortedPosts() {
  const sorted = await getRawSortedPosts();

  // 设置上一篇/下一篇文章关联
  for (let i = 1; i < sorted.length; i++) {
    sorted[i].data.nextSlug = sorted[i - 1].slug;
    sorted[i].data.nextTitle = sorted[i - 1].data.title;
  }
  for (let i = 0; i < sorted.length - 1; i++) {
    sorted[i].data.prevSlug = sorted[i + 1].slug;
    sorted[i].data.prevTitle = sorted[i + 1].data.title;
  }

  return sorted;
}

export type PostForList = {
  slug: string;
  data: CollectionEntry<"posts">["data"];
};

export async function getSortedPostsList(): Promise<PostForList[]> {
  const sortedFullPosts = await getRawSortedPosts();

  // 仅返回列表所需字段（不含文章正文）
  const sortedPostsList = sortedFullPosts.map((post) => ({
    slug: post.slug,
    data: post.data,
  }));

  return sortedPostsList;
}

export type Tag = {
  name: string;
  count: number;
};

export async function getTagList(): Promise<Tag[]> {
  const allBlogPosts = await getCollection<"posts">("posts", ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  // 统计标签出现次数
  const countMap: { [key: string]: number } = {};
  allBlogPosts.forEach((post) => {
    post.data.tags.forEach((tag) => {
      countMap[tag] = (countMap[tag] || 0) + 1;
    });
  });

  // 按标签名排序（忽略大小写）
  const sortedTags = Object.keys(countMap).sort((a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });

  return sortedTags.map((tag) => ({ name: tag, count: countMap[tag] }));
}

export type Category = {
  name: string;
  count: number;
  url: string;
};

export async function getCategoryList(): Promise<Category[]> {
  const allBlogPosts = await getCollection<"posts">("posts", ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  // 统计分类出现次数
  const count: { [key: string]: number } = {};
  allBlogPosts.forEach((post) => {
    const categoryName = post.data.category 
      ? (typeof post.data.category === "string" 
        ? post.data.category.trim() 
        : String(post.data.category).trim())
      : i18n(I18nKey.uncategorized); // 未分类文章的默认名称

    count[categoryName] = (count[categoryName] || 0) + 1;
  });

  // 按分类名排序（忽略大小写）
  const sortedCategories = Object.keys(count).sort((a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });

  // 生成包含链接的分类列表
  return sortedCategories.map((category) => ({
    name: category,
    count: count[category],
    url: getCategoryUrl(category),
  }));
}
