export const filter = (products, { filterByOwner }) => {
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

  return copyProducts;
};
