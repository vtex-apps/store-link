📢 Use this project, [contribute](https://github.com/vtex-apps/product-summary) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

# Store Link

The Store Link app provides blocks responsible for displaying links in other theme blocks, such as the Product Summary. 

![image](https://user-images.githubusercontent.com/8517023/73387868-f1b36f80-42af-11ea-8e24-3045d2c819b4.png)

## Configuration

1. Add `store-link` app to your theme's dependencies in the `manifest.json`, for example:

```jsonc
{
  "vtex.store-link": "0.x"
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

A more complex example with `modal-layout` blocks can be found in the [Quick View](https://github.com/vtex-apps/modal-layout/blob/master/docs/README.md#modal-layout) example at the `modal-layout` documentation.

:warning: Note that there is a `{slug}` **placeholder** being passed onto the `href` prop in the example above. When rendered, this placeholder will be overwritten by the value accrued from the closest product context, generating a link like `/everyday-necessaire/p`. Therefore, remember that in order for this format to work you have to place the `link.product` block inside of a another block that provides a product context, such as the [`ProductSummary`](https://vtex.io/docs/components/product/vtex.product-summary).

All blocks exported by `store-link` share the same props:

| Prop name | Type     | Description                                                                                                                             | Default value |
| --------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `label`   | `string` | Link text                                                                                                                               | `undefined`   |
| `href`    | `string` | Link URL                                                                                                                                | `'#'`         |
| `target`  | `string` | This prop works the same way as the target of the [anchor element of html](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/a) | `undefined`   |
| `displayMode` | `DisplayMode` | How the link should be displayed | `'anchor'` |
| `buttonProps` | `ButtonProps` | Props to be passed if you use `displayMode` as `'button'` | `{ variant: 'primary', size: 'regular' }` |

### DisplayMode

| Value | Description |
| --- | --- |
| `'anchor'` | Display as a normal link with no styles |
| `'button'` | Display as a button and accept the `variant` prop to change the visual of it |

### ButtonProps
| Prop name | Type | Description | Default value |
| --- | --- | --- | --- |
| `variant` | `Variant` | The variant to be used if `displayMode` is `'button'` | `'primary'` |
| `size` | `Size` | Which predefined size it should use (You can access the [Styleguide documentation](https://styleguide.vtex.com/#/Components/Forms/Button) to understand better how it works). | `'regular'` |

### Variant

To understand better what means each variant it would be better to [access the documentation of our styleguide](https://styleguide.vtex.com/#/Components/Forms/Button). The following variants are the one supported by the button right now:

| Possible values |
| --- |
| `'primary'` |
| `'secondary'` |

### Size

You can [access the documentation of our styleguide](https://styleguide.vtex.com/#/Components/Forms/Button) to understand better how it works

| Possible values |
| --- |
| `'small'` |
| `'regular'` |
| `'large'` |

---

When creating a Link URL you have the query string values available. Example:

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

If the current page have the query string `returnUrl` its value will be used, otherwise an empty string will take place.

For the `link.product` block, you can use variables related to the product in context. With them, you will be able to structure any desired URL for your store, such as a link to a given product department (`/{department}`).

| Value value    | Description                                   |
| -------------- | --------------------------------------------- |
| `'brand'`      | Name of the product brand                     |
| `'brandId'`    | ID of the product brand                       |
| `'category1'`  | Height level category in the category tree    |
| `'category2'`  | Second highest level category                 |
| `'category3'`  | Third hieghest level category                 |
| `'category4'`  | Fourth highest level category                 |
| `'department'` | Product department                            |
| `'productId'`  | Product ID                                    |
| `'skuId'`      | Current selected SKU ID                       |
| `'slug'`       | The link text used to create the product link |

You will also be able access values related to the product specifications through a specific path, for example:

```jsonc
{
  "link.product#vtex": {
    "props": {
      "href": "{specificationGroups.App Data.specifications.vtex-url}",
      "label": "VTEX"
    }
  }
}
```
In this case, `App Data` is the specificationGroup name and `vtex-url` is the specification name.

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization). All blocks have the same handles

| CSS Handles         |
| ------------------- |
| `childrenContainer` |
| `label`             |
| `link`              |

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
