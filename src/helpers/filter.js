export const filter = (products, { filterByOwner, searchQuerry }) => {
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

  return copyProducts;
};
