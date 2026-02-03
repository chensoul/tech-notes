import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/tech-notes/',
  title: "ChenSoul Tech Notes",
  // description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: 'http://blog.chensoul.cc' }
    ],

    sidebar: [
      {
        text: 'Java',
        collapsed: false,
        items: [
          { text: 'Intro', link: '/java/index.md' },
          { text: 'DDD', link: '/java/ddd.md' },
          { text: 'Maven', link: '/java/maven.md' },
          { text: 'Github', link: '/java/github.md' },
        ]
      },
      {
        text: 'Architecture',
        collapsed: false,
        items: [
          { text: 'Intro', link: '/architecture/index.md' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/chensoul/tech-notes' }
    ]
  }
})
