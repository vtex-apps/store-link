📢 Use this project, [contribute](https://github.com/vtex-apps/product-summary) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Store Link

<!-- DOCS-IGNORE:start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- DOCS-IGNORE:end -->

The Store Link app provides blocks for displaying links in other theme blocks, such as Product Summary.

![image](https://cdn.jsdelivr.net/gh/vtexdocs/dev-portal-content@main/images/vtex-store-link-0.png)

## Configurating the store link

1. Add the `store-link` app to your theme dependencies in the `manifest.json` file. Then, you can use all the [blocks](#blocks) exported by the `store-link` app and its respective [props](#props).

```diff
  "dependencies": {
+   "vtex.store-link": "0.x"
  }
```

2. Choose one of the [blocks](#blocks) exported by the `store-link` app and declare it in the block where the link will be displayed. See below an example of a `link.product` being used in the [`product-summary`](https://developers.vtex.com/docs/apps/vtex.product-summary) block to display the "More details" link.

```jsonc
{
  "link.product#product-page": {
    "props": {
      "href": "/{slug}/p",
      "label": "More details >"
    }
  },
  "product-summary.shelf": {
    "children": [
      "product-summary-image",
      "product-summary-name",
      "product-rating-inline",
      "product-summary-space",
      "product-summary-price",
      "link.product#product-page"
    ]
  },
}
```
> ⚠️ Note that you must place the `link.product` block inside a block that provides a product context (e.g., [`ProductSummary`](https://developers.vtex.com/docs/apps/vtex.product-summary)). From the previous example, note that a `{slug}` placeholder is being passed onto the `href` prop. When rendered, this placeholder is overwritten by the value accrued from the closest product context, generating a link like `/everyday-necessaire/p`.

## Blocks

| Block          | Description                                      |
| -------------- | ------------------------------------------------ |
| `link.product` | A link that uses the product context, such as a product slug or department. For example, `/{slug}/p`.       |
| `link`         | A regular link that does not require the product context to function. For example, `/home`. |

## Props

All blocks exported by `store-link` share the same props:

| Prop name         | Type     | Description                                                                                                                                                                                                                                                                                                                                                              | Default value                         |
| ----------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| `label`           | `string` | Link text and aria-label attribute.                                                                                                                                                                                                                                                                                                                                                               | `undefined`                           |
| `href`            | `string` | Link URL.                                                                                                                                                                                                                                                                                                                                                                | `#`                                   |
| `scrollTo`        | `string` | Element anchor to scroll after navigation. (E.g. `"#footer"`)                                                                                                                                                                                                                                                                                                            | `undefined`                           |
| `target`          | `string` | Where the linked URL will be displayed. This prop works the same way as the target from [HTML `<a>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a). Since the [*anchor* element's target](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target) default is `_self`, this prop will be set to `_self` if it is undefined. | `undefined`                           |
| `displayMode`     | `enum`   | How the link will be displayed. Possible values are: `anchor` (displays a normal link with no styles) or `button` (displays a button that can be customized using the `buttonProps` prop).                                                                                                                                                                               | `anchor`                              |
| `buttonProps`     | `object` | How the link button will be displayed. Use this prop only when the `displayMode` prop is set as `button`.                                                                                                                                                                                                                                                                | `{ variant: primary, size: regular }` |
| `escapeLinkRegex` | `string` | RegExp, with global match, used to remove special characters within product specifications (e.g., if you want to use `/[%]/g` then `escapeLinkRegex` = `[%]`).                                                                                                                                                                                                            | `undefined`                           |
| `rel`             | `string` | This prop specifies the relationship between the current document and linked ones for better SEO. This prop works the same way as the `rel` attribute from `<a>`, the [HTML anchor element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a). You can see supported values [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).       | `undefined`                           |

- `buttonProps` object:

| Prop name | Type   | Description                                                                                                                                                                                    | Default value |
| --------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `variant` | `enum` | Link button that has visual prominence. Possible values are: `primary` or `secondary` (values are set following the [VTEX Styleguide](https://styleguide.vtex.com/#/Components/Forms/Button)). | `primary`     |
| `size`    | `enum` | Link button size. Possible values are: `small`, `regular` or `large` (values are set following the [VTEX Styleguide](https://styleguide.vtex.com/#/Components/Forms/Button)).                  | `regular`     |

## App Behavior

When creating an URL link using the `href` prop, you can add custom query string values, as shown in the example below:

```json
{
  "link#foo": {
    "props": {
      "href": "/login?returnUrl={queryString.returnUrl}",
      "label": "Sign in"
    }
  }
}
```

Considering the `href` prop from the previous example, note that the URL link will be built correctly if the current page has the `returnUrl` query string. Otherwise, it will be built with an empty value.

Depending on the context that the `link.product` block uses, you can use product variables to structure different URL paths for the `href` prop. For example, you could create a link to a specific product department (`/{department}`).

| Product variable | Description                                    |
| ---------------- | ---------------------------------------------- |
| `brand`          | Product brand name.                            |
| `brandId`        | Product brand ID.                              |
| `category1`      | Highest level category in the category tree.   |
| `category2`      | Second highest level category.                 |
| `category3`      | Third highest level category.                  |
| `category4`      | Fourth highest level category.                 |
| `department`     | Product department.                            |
| `productId`      | Product ID.                                    |
| `skuId`          | Currently selected SKU ID.                     |
| `slug`           | The link text used to create the product link. |

To build URLs with variables related to product specifications, use the following format: `{specificationGroups.groupName.specifications.specificationName}`. Replace `groupName` and `specificationName` with the specification group and the product specification names accordingly. For example:

```jsonc
{
  "link.product#vtex": {
    "props": {
      "href": "{specificationGroups.Design.specifications.Dimensions}",
      "label": "VTEX"
    }
  }
}
```

In the example above, `Design` is the specification group name, and `Dimensions` is the product specification name.

## Customization

To apply CSS customizations in this and other blocks, see the [Using CSS handles for store customization](https://developers.vtex.com/docs/guides/vtex-io-documentation-using-css-handles-for-store-customization) guide. All blocks have the same handles.

| CSS handles         |
| ------------------- |
| `childrenContainer` |
| `label`             |
| `link`              |

<!-- DOCS-IGNORE:start -->

## Contributors ✨

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/anto90fg"><img src="https://avatars.githubusercontent.com/u/73878310?v=4?s=100" width="100px;" alt=""/><br /><sub><b>anto90fg</b></sub></a><br /><a href="https://github.com/vtex-apps/store-link/commits?author=anto90fg" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

<!-- DOCS-IGNORE:end -->
