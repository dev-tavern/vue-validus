module.exports = {
  lang: 'en-US',
  title: 'Vue-Validus',
  description: 'Extensible lightweight validation library for Vue 3',

  head: [],

  themeConfig: {
    repo: 'dev-tavern/vue-validus',
    docsDir: 'docs',
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'API Reference', link: '/api/' }
    ],
    sidebarDepth: 4,
    sidebar: {
      '/': getGuideSidebar(),
      '/guide/': getGuideSidebar()
    }
  }
}

function getGuideSidebar() {
  return [
    {
      text: 'Introduction',
      children: [
        { text: 'Overview', link: '/guide/' },
        { text: 'Installation', link: '/guide/installation' },
        { text: 'Getting Started', link: '/guide/getting-started' }
      ]
    },
    {
      text: 'Core Concepts',
      children: [
        { text: 'Field', link: '/guide/field' },
        { text: 'Field Group', link: '/guide/field-group' },
        { text: 'Validation', link: '/guide/validation' }
      ]
    },
    {
      text: 'Advanced',
      children: [
        { text: 'TypeScript', link: '/guide/typescript' }
      ]
    }
  ]
}
