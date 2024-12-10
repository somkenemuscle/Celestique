export const navigation = {
  categories: [
    {
      id: 'women',
      name: 'Women',
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '/products/collections/women/tops' },
            { name: 'Dresses', href: '/products/collections/women/dresses' },
            { name: 'All Women', href: '/products/collections/women' },
          ],
        }
      ],
    },
    {
      id: 'men',
      name: 'Men',
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Shirts', href: '/products/collections/men/shirts' },
            { name: 'Shorts', href: '/products/collections/men/shorts' },
            { name: 'All Men', href: '/products/collections/men' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Products', href: '/products' },
  ],
}