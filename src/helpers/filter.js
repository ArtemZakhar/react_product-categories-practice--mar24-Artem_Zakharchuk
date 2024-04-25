export const filter = (
  products,
  { filterByOwner, searchQuerry, categorySearch },
) => {
  let copyProducts = [...products];

  switch (filterByOwner) {
    case 'All': {
      break;
    }

    default: {
      copyProducts = copyProducts.filter(
        product => product.user.name === filterByOwner,
      );
    }
  }

  if (searchQuerry) {
    const normalizeSearh = searchQuerry.toLowerCase().trim();

    copyProducts = copyProducts.filter(product => {
      const normalizeName = product.name.toLowerCase();

      return normalizeName.includes(normalizeSearh);
    });
  }

  if (categorySearch) {
    const showCategoryArr = Object.entries(categorySearch)
      .filter(([key, value]) => !value && key)
      .map(item => item[0]);

    const allCatLength = Object.keys(categorySearch).length;

    if (showCategoryArr.length < allCatLength) {
      copyProducts = copyProducts.filter(
        product => !showCategoryArr.includes(product.category.title),
      );
    }
  }

  return copyProducts;
};
