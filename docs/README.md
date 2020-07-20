📢 Use this project, [contribute](https://github.com/vtex-apps/product-summary) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Store Link

<!-- DOCS-IGNORE:start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- DOCS-IGNORE:end -->

The Store Link app provides blocks responsible for displaying links in other theme blocks, such as the Product Summary. 

![image](https://user-images.githubusercontent.com/8517023/73387868-f1b36f80-42af-11ea-8e24-3045d2c819b4.png)

## Configuration

1. Add `store-link` app to your theme's dependencies in the `manifest.json`, for example:

```diff
  "dependencies": {
+   "vtex.store-link": "0.x"
  }
```

Now, you are able to use all blocks exported by the `store-link` app. Check out the full list below:

| Block name     | Description                                     |
| -------------- | ----------------------------------------------- |
| `link.product` | A link that consumes the product context.       |
| `link`         | A normal link that doesn't consume any context. |

2. Based on the exported list, choose the desired block and declare it in the block that will host the link. Find below an example of a `link.product` being used in the [`product-summary`](https://vtex.io/docs/components/product/vtex.product-summary) block:

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
      "link.product#product-page
    ]
  },
}
```

:warning: *Note that there is a `{slug}` placeholder being passed onto the `href` prop in the example above. When rendered, this placeholder will be overwritten by the value accrued from the closest product context, generating a link like `/everyday-necessaire/p`. Therefore, remember that in order for this format to work you have to place the `link.product` block inside of a another block that provides a product context, such as the [`ProductSummary`](https://vtex.io/docs/components/product/vtex.product-summary).*

### Props

All blocks exported by `store-link` share the same props:

| Prop name | Type     | Description | Default value |
| --------- | -------- | ------------------------------------------------- | ------------- |
| `label`   | `string` | Link text.         | `undefined`   |
| `href`    | `string` | Link URL.         | `#`         |
| `target`  | `string` | Where to display the linked URL. This prop works the same way as the target from [HTML `<a>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) (HTML *anchor* element). | `undefined`   |
| `displayMode` | `enum` | How the link should be displayed. Possible values are: `anchor` (displays a normal link with no styles) or `button` (displays a button that can be customized using the `buttonProps` prop.  | `anchor` |
| `buttonProps` | `objet` | How the link button should be displayed. Use this prop only when the `displayMode` prop is set as `button`. | `{ variant: primary, size: regular }` |

- `buttonProps` object:

| Prop name | Type | Description | Default value |
| --- | --- | --- | --- |
| `variant` | `enum` | Link button visual proeminence. Possible values are: `primary` or `secondary` (values are set according to the [VTEX Styleguide](https://styleguide.vtex.com/#/Components/Forms/Button)).  | `primary` |
| `size` | `enum` | Link button size. Possible values are: `small`, `regular` or `large` (values are set according to the [VTEX Styleguide](https://styleguide.vtex.com/#/Components/Forms/Button)). | `regular` |

## Modus Operandi

When creating an URL link using the `href` prop, you can create hypotheticals query string values, as shown in the example below:


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


According to the example above, if the current page have the query string `returnUrl` the value passed to the `href` prop will be used and the URL link will be properly built. If it does not have the `returnURL` query string, an empty string will take place.

Due to the context used by the `link.product` block, you can also build an URL path with product variables when using the `href` prop. 

| Product variable   | Description                                   |
| -------------- | --------------------------------------------- |
| `brand`      | Product brand name.                    |
| `brandId`    | Product brand ID.                     |
| `category1`  | Highest level category in the category tree.    |
| `category2`  | Second highest level category.                 |
| `category3`  | Third hieghest level category.                |
| `category4`  | Fourth highest level category.                 |
| `department` | Product department.                            |
| `productId`  | Product ID.                                    |
| `skuId`      | Current selected SKU ID.                       |
| `slug`       | The link text used to create the product link. |

Using one of these variables, you will be able to structure any desired URL for your store, such as a link to a given product department (`/{department}`).

To build URLs with variables related to the product specifications, you should use the following format: `{specificationGroups.groupName.specifications.specificationName}`, replacing `groupName` and `specificationName` with the specification group and the product specification names. For example:

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

In the example above, `Design` is the specification group name and `Dimensions` is the product specification name.

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization). All blocks have the same handles

| CSS Handles         |
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
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

<!-- DOCS-IGNORE:end -->
