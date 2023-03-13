module.exports = {
  lang: 'en-US',
  title: 'Vue-Validus',
  description: 'Extensible lightweight validation library for Vue',

  head: [],

  themeConfig: {
    repo: 'dev-tavern/vue-validus',
    docsDir: 'docs',
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'API Reference', link: '/api/' },
      { text: 'GitHub', link: 'https://github.com/dev-tavern/vue-validus' }
    ],
    sidebarDepth: 4,
    sidebar: {
      '/': getGuideSidebar(),
      '/guide/': getGuideSidebar(),
      '/api/': getApiSidebar()
    },
    footer: {
      message: '<a href="https://github.com/dev-tavern/vue-validus/blob/develop/LICENSE">MIT Licensed</a>',
      copyright: 'Copyright © 2021-present | <a href="https://github.com/joshuagamble">Josh Gamble</a> | <a href="https://github.com/dev-tavern">dev-tavern</a>'
    }
  }
}

function getGuideSidebar() {
  return [
    {
      text: 'Introduction',
      items: [
        { text: 'Overview', link: '/guide/' },
        { text: 'Installation', link: '/guide/installation' },
        { text: 'Getting Started', link: '/guide/getting-started' }
      ]
    },
    {
      text: 'Core Concepts',
      items: [
        { text: 'Field', link: '/guide/field' },
        { text: 'Field Group', link: '/guide/field-group' },
        { text: 'Validation', link: '/guide/validation' }
      ]
    },
    {
      text: 'Advanced',
      items: [
        { text: 'TypeScript', link: '/guide/typescript' }
      ]
    }
  ]
}

function getApiSidebar() {
  return [
    {
      text: 'Field',
      items: [
        {
          text: 'Creation', link: '/api/#field-creation', items: [
            { text: 'field', link: '/api/#field-1' }
          ]
        },
        {
          text: 'Properties', link: '/api/#field-properties', items: [
            { text: 'value', link: '/api/#value' },
            { text: 'invalid', link: '/api/#invalid' },
            { text: 'errors', link: '/api/#errors' },
            { text: 'errorMessages', link: '/api/#errormessages' }
          ]
        },
        {
          text: 'Methods', link: '/api/#field-methods', items: [
            { text: 'validate', link: '/api/#validate' },
            { text: 'clear', link: '/api/#clear' },
            { text: 'hasError', link: '/api/#haserror' },
            { text: 'addValidator', link: '/api/#addvalidator' },
            { text: 'removeValidator', link: '/api/#removevalidator' }
          ]
        }
      ]
    },
    {
      text: 'FieldGroup',
      items: [
        {
          text: 'Creation', link: '/api/#fieldgroup-creation', items: [
            { text: 'fieldGroup', link: '/api/#fieldgroup-1' }
          ]
        },
        {
          text: 'Properties', link: '/api/#fieldgroup-properties', items: [
            { text: 'dynamic properties', link: '/api/#dynamic-properties' },
            { text: 'invalid', link: '/api/#invalid-1' }
          ]
        },
        {
          text: 'Methods', link: '/api/#fieldgroup-methods', items: [
            { text: 'validate', link: '/api/#validate-1' },
            { text: 'clear', link: '/api/#clear-1' },
            { text: 'get', link: '/api/#get' },
            { text: 'getErrorFields', link: '/api/#geterrorfields' },
            { text: 'getValue', link: '/api/#getvalue' }
          ]
        }
      ]
    },
    {
      text: 'Validators',
      items: [
        {
          text: 'Built-In', link: '/api/#validators-built-in', items: [
            { text: 'email', link: '/api/#email' },
            { text: 'equals', link: '/api/#equals' },
            { text: 'equalsByFieldName', link: '/api/#equalsbyfieldname' },
            { text: 'match', link: '/api/#match' },
            { text: 'max', link: '/api/#max' },
            { text: 'maxLength', link: '/api/#maxlength' },
            { text: 'min', link: '/api/#min' },
            { text: 'minLength', link: '/api/#minlength' },
            { text: 'numeric', link: '/api/#numeric' },
            { text: 'required', link: '/api/#required' },
            { text: 'requiredIf', link: '/api/#requiredif' }
          ],
        },
        { text: 'Custom', link: '/api/#validators-custom' }
      ]
    },
    {
      text: 'Typescript',
      items: [
        {
          text: 'Interfaces', link: '/api/#typescript-interfaces', items: [
            { text: 'Field', link: '/api/#field-2' },
            { text: 'FieldGroup', link: '/api/#fieldgroup-2' },
            { text: 'Validator', link: '/api/#validator' },
            { text: 'ValidatorCondition', link: '/api/#validatorcondition' }
          ]
        },
        {
          text: 'Types', link: '/api/#typescript-types', items: [
            { text: 'FieldGroupProps', link: '/api/#fieldgroupprops' },
            { text: 'FieldGroupType', link: '/api/#fieldgrouptype' }
          ]
        }
      ]
    },
    {
      text: 'Utils',
      items: [
        {
          text: 'Methods', link: '/api/#utility-methods', items: [
            { text: 'toPlainObject', link: '/api/#toplainobject' }
          ]
        }
      ]
    }
  ]
}
