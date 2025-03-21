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
          { text: 'Maven', link: '/java/maven.md' },
          { text: 'Idea', link: '/java/idea.md' },
          { text: 'Jvm', link: '/java/jvm.md' },
        ]
      },
      {
        text: 'Architecture',
        collapsed: false,
        items: [
          { text: 'Intro', link: '/architecture/index.md' },
        ]
      },
      {
        text: 'Devops',
        collapsed: false,
        items: [
          { text: 'Intro', link: '/devops/index.md' },
          { text: 'Linux', link: '/devops/linux.md' },
          { text: 'Git', link: '/devops/git.md' },
          { text: 'Github', link: '/devops/github.md' },
          { text: 'Docker', link: '/devops/docker.md' },
          { text: 'K8s', link: '/devops/k8s.md' },
          { text: 'Jenkins', link: '/devops/jenkins.md' },
        ]
      },
      {
        text: 'Database',
        collapsed: false,
        items: [
          { text: 'Intro', link: '/database/index.md' },
          { text: 'MySQL', link: '/database/mysql.md' },
          { text: 'Posrgres', link: '/database/postgres.md' },
        ]
      },
      {
        text: 'Distribution',
        collapsed: false,
        items: [
          { text: 'Intro', link: '/distribution/index.md' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/chensoul/tech-notes' }
    ]
  }
})
