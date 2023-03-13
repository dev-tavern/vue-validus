# Changelog

## [1.0.7] - 2023-03-13

- Fix reactivity of field `errorMessages` when clearing a field object
- Enhance TypeScript support for field group

## [1.0.6] - 2023-01-16

- Add support for Vue 2
  - By leveraging vue-demi, this package is now usable by both Vue 2 & 3
  - The vue2-validus project, which specifically supports Vue 2, will be deprecated
- Bump minimist from 1.2.5 to 1.2.6
- Bump jsdom from 16.4.0 to 16.7.0
- Bump terser from 5.5.1 to 5.14.2
- Bump minimatch from 3.0.4 to 3.1.2
- Bump loader-utils from 1.4.0 to 1.4.2
- Bump decode-uri-component from 0.2.0 to 0.2.2
- Bump vitepress from 0.9.1 to 0.22.4

## [1.0.5] - 2022-03-08

- Update `Field` types for properties: `value`, `invalid`
- Update `FieldGroup` type for property: `invalid`
- Update type guards for `Field` and `FieldGroup`
- Update api documentation
- Bump prismjs from 1.25.0 to 1.27.0

## [1.0.4] - 2022-02-14

- Bump follow-redirects from 1.13.1 to 1.14.8
- Bump tmpl from 1.0.4 to 1.0.5
- Bump prismjs from 1.24.0 to 1.25.0

## [1.0.3] - 2021-08-15

- Bump glob-parent from 5.1.1 to 5.1.2
- Bump postcss from 7.0.35 to 7.0.36
- Bump prismjs from 1.23.0 to 1.24.0
- Bump path-parse from 1.0.6 to 1.0.7

## [1.0.2] - 2021-05-30

- Bump ws from 7.4.1 to 7.4.6
- Bump browserslist from 4.16.3 to 4.16.6
- Bump lodash from 4.17.20 to 4.17.21
- Bump hosted-git-info from 2.8.8 to 2.8.9

## [1.0.1] - 2021-02-26

- Updates for IE compatibility:
  - leverage babel plugin in rollup build configuration
  - include babel transform plugin for Object.entries
  - include babel transform plugin for Array.includes

## [1.0.0] - 2021-02-20

- Initial release for vue-validus, includes:
  - field & field group implementations
  - built-in validators
  - support for custom validators
  - typings
  - vitepress docs

[1.0.7]: https://github.com/dev-tavern/vue-validus/releases/tag/v1.0.7
[1.0.6]: https://github.com/dev-tavern/vue-validus/releases/tag/v1.0.6
[1.0.5]: https://github.com/dev-tavern/vue-validus/releases/tag/v1.0.5
[1.0.4]: https://github.com/dev-tavern/vue-validus/releases/tag/v1.0.4
[1.0.3]: https://github.com/dev-tavern/vue-validus/releases/tag/v1.0.3
[1.0.2]: https://github.com/dev-tavern/vue-validus/releases/tag/v1.0.2
[1.0.1]: https://github.com/dev-tavern/vue-validus/releases/tag/v1.0.1
[1.0.0]: https://github.com/dev-tavern/vue-validus/releases/tag/v1.0.0
