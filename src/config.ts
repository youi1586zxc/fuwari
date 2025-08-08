import type {
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from './types/config'
import { LinkPreset } from './types/config'

// 新增 expressiveCode 主题配置
export const expressiveCodeConfig = {
  theme: "github-light", // 可根据喜好替换为其他主题，如 "github-light", "vscode-dark" 等
};

export const siteConfig: SiteConfig = {
  title: 'QuiYu Blog',
  subtitle: '随心所欲！',
  lang: 'zh_CN',         
  themeColor: {
    hue: 355,         
    fixed: false,     
  },
  // 新增 TOC 配置（解决 "toc.enable 未定义" 错误）
  toc: {
    enable: true, // 启用目录功能
    // 可选：可添加宽度等其他配置（根据主题需求）
    // width: "240px"
  },
  banner: {
    enable: true,
    src: 'https://s1.imagehub.cc/images/2025/08/07/a75e8c038f6f86b88a767fda8bb31d88.webp',
    position: 'center',      
    credit: {
      enable: false,         
      text: '',              
      url: ''                
    }
  },
  favicon: [    
     {
       src: 'https://s1.imagehub.cc/images/2025/08/07/0690b26ee090bc5d56693e192eabbbe2.png',
       sizes: '128x128',              
     }
  ]
}

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,
    LinkPreset.About,
    {
      name: '随机图',
      url: 'https://www.loliapi.com/acg/',
      external: true,
    },
    {
      name: 'GitHub',
      url: 'https://github.com/saicaca/fuwari',
      external: true,
    },
  ],
}

export const profileConfig: ProfileConfig = {
  avatar: 'https://s1.imagehub.cc/images/2025/08/07/0690b26ee090bc5d56693e192eabbbe2.png',
  name: '秋雨',
  bio: 'Do As You Wish./随心所欲！',
  links: [
    {
      name: 'GitHub',
      icon: 'fa6-brands:github',
      url: 'https://github.com/youi1586zxc',
    },
    {
      name: 'QQ',
      icon: 'fa6-brands:qq',
      url: 'https://qm.qq.com/q/Str41spZOo',
    },
    {
      name: 'Email',
      icon: 'fa6-solid:envelope',
      url: 'mailto:xik@quiyu.top',
    },
  ],
}

export const licenseConfig: LicenseConfig = {
  enable: true,
  name: 'CC BY-NC-SA 4.0',
  url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
}
