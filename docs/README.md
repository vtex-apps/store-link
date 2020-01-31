# Store Link

This repository provides some blocks that can help you creating links in a store.

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

2. Based on the exported list, choose the desired block and declare it in the block that will host the link. Find below an example of a link.product being used in the [product-summary](https://vtex.io/docs/components/product/vtex.product-summary) block:

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

## Props

All blocks exported by `store-link` share the same props:

| Prop name | Type     | Description | Default value |
| --------- | -------- | ----------- | ------------- |
| `label`   | `string` | Link text   | `undefined`   |
| `href`    | `string` | Link URL    | `'#'`         |

When creating a Link URL for your `link.product` block, use the variables listed below. With them, you will be able to structure any desired URL for your store, such as a link to a given product department (`/{department}`).

| Value value    | Description                                   |
| -------------- | --------------------------------------------- |
| `'slug'`       | The link text used to create the product link |
| `'skuId'`      | Current selected SKU ID                       |
| `'department'` | Product department                            |
| `'category1'`  | Height level category in the category tree    |
| `'category2'`  | Second highest level category                 |
| `'category3'`  | Third hieghest level category                 |
| `'category4'`  | Fourth highest level category                 |
| `'productId'`  | Product ID                                    |
| `'brand'`      | Name of the product brand                     |
| `'brandId'`    | ID of the product brand                       |

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization). All blocks have the same handles

| CSS Handles         |
| ------------------- |
| `childrenContainer` |
| `label`             |
| `link`              |
