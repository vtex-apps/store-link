# VTEX Store Link

This repository provides some blocks that can help you creating links in a store.

![image](https://user-images.githubusercontent.com/8517023/73387868-f1b36f80-42af-11ea-8e24-3045d2c819b4.png)

## Configuration

1. Add `store-link` app to your theme's dependencies in the `manifest.json`, for example:

```jsonc
{
  "vtex.store-link": "0.x"
}
```

2. Now you can use the blocks exported by the app. In the following example you can see the usage of the `link.product` inside of a quick view component:

```jsonc
{
  "link.product#product-page": {
    "props": {
      "href": "/{slug}/p",
      "label": "Mais detalhes >"
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

You can see that there is a `{slug}` placeholder being passed to the `href` prop. When rendered, the placeholder will be replaced with the respective value of the closest product context and generate a link like `/everyday-necessaire/p`. However, keep in mind that in order for this work, you have to place the `link.product` block inside of a another block that provides a product context, such as the [`ProductSummary`](https://vtex.io/docs/components/product/vtex.product-summary).

### Props

The `link.product` and `link` blocks has the same props.

| Prop name | Type     | Description                             | Default value |
| --------- | -------- | --------------------------------------- | ------------- |
| `label`   | `string` | The label that you be shown to the user | `undefined`   |
| `href`    | `string` | The actual link                         | `'#'`         |

### Available variables

#### link.product

| Value          | Description                                                                                    |
| -------------- | ---------------------------------------------------------------------------------------------- |
| `'slug'`       | The slug of the product                                                                        |
| `'skuId'`      | The id of the current sku                                                                      |
| `'department'` | The department of the product                                                                  |
| `'category1'`  | The most general category of the product, the last available category is the most specific one |
| `'category2'`  | The second most general category                                                               |
| `'category3'`  | -                                                                                              |
| `'category4'`  | -                                                                                              |
| `'productId'`  | The id of the product                                                                          |
| `'brand'`      | Brand name                                                                                     |
| `'brandId'`    | Brand id                                                                                       |

With these variables you can form any url that you want, you can do something like `/{department}` and create a link to go to the department of the product
