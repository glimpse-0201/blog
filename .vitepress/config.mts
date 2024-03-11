import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Blog",
  description: "乱七八糟",
  srcDir: './src',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local',
    },
    nav: [
      { text: 'Home', link: '/' },
      {
        text: '编码相关', link: '/code/'
      }, {
        text: '偷鸡摸狗', link: '/skill/'
      }, {
        text: '记录生活', link: '/live/'
      }
    ],

    sidebar: {
      '/code/': {
        base: '/code/',
        items: [
          {
            text: '编码相关',
            items: [{
              text: '前端',
              base: '/code/js/',
              collapsed: true,
              items: [{
                text: '拷贝',
                link: 'copy'
              }],
            }],
          },
        ]
      },
      '/skill': [{
        text: '技术相关',
        collapsed: false,
        items: [
          { text: 'Index', link: '/skill/' },
        ]
      }],
      '/live': [{
        text: '技术相关',
        collapsed: false,
        items: [
          { text: 'Index', link: '/live/' },
        ]
      }]
    },
    outline: {
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/glimpse-0201' }
    ]
  }
})
