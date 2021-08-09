# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Fixed
- Outdated typings from VTEX apps.

## [0.8.0] - 2021-08-09
### Added
- `rel` prop for better SEO

## [0.7.7] - 2021-07-05
### Changed
- README to give more information about the `scrollTo` and `target` props.

## [0.7.6] - 2021-03-25
### Fixed
- Logic of history replace.

## [0.7.5] - 2021-03-09
### Fixed
- undefined `href` breaking StoreLink and ProductLink

## [0.7.4] - 2021-03-08
### Fixed
- Product link was not working when used on sellers page

## [0.7.3] - 2021-02-11
### Added
- `escapeLinkRegex` useful option to use a regexp to remove unwanted characters.

## [0.7.2] - 2021-01-11
### Fixed
- Required fields not being required in `StoreLink` schema.

## [0.7.1] - 2020-12-03
### Fixed
- Use search API slugify method for product brand.

## [0.7.0] - 2020-09-10
### Added
- `scrollTo` option to perform scroll after navigation.
- `formatIOMessage` to link label.

## [0.6.2] - 2020-07-28
### Changed
- Specification group name and specification name use original values of Catalog

## [0.6.1] - 2020-07-24
### Fixed
- README.md file (fixed the Modus Operandi section).
- Props `label` and `buttonProps` of `StoreLink`  being optional but not in typescript.

## [0.6.0] - 2020-06-23
### Added
- Option to get a dynamic value from product specification.

## [0.5.1] - 2020-04-24
### Security
- Bump dependencies versions.

## [0.5.0] - 2020-04-07
### Added
- `queryString` values interpolation.

## [0.4.0] - 2020-03-06
### Added
- `displayMode` prop.

## [0.3.1] - 2020-02-27

### Fixed
- Documentation typos 

## [0.3.0] - 2020-02-19
### Added
- `target` prop to the schema of the components.

## [0.2.0] - 2020-02-19
### Added
- Schema to the blocks.
- `target` prop to all links.

## [0.1.1] - 2020-02-13
### Fixed
- Improper section for props was removed.

## [0.1.0] - 2020-01-31
### Added
- Initial release.
