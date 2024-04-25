/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { Product } from './components/Products';
import { filter } from './helpers/filter';
import { OwnerFilter } from './components/OwnerFilter/OwnerFilter';

const products = productsFromServer.map(product => {
  const category = categoriesFromServer.find(
    cat => cat.id === product.categoryId,
  );
  const user = usersFromServer.find(us => us.id === category.ownerId);

  return { ...product, category, user };
});

export const App = () => {
  const initialCatecoriesState = categoriesFromServer.reduce((acc, elem) => {
    const { title } = elem;

    if (!(title in acc)) {
      // eslint-disable-next-line no-param-reassign
      acc[title] = false;
    }

    return acc;
  }, {});

  const [searchQuerry, setSearcQuerry] = useState('');
  const [filterByOwner, setFilterByOwner] = useState('All');
  const [categorySearch, setCategorySearc] = useState(initialCatecoriesState);

  const filteredProducts = filter(products, {
    filterByOwner,
    searchQuerry,
    categorySearch,
  });

  const TABLE_HEADERS = ['ID', 'Product', 'Category', 'User'];

  const resetFilters = () => {
    setFilterByOwner('All');
    setSearcQuerry('');
    resetCategorySearch();
  };

  const handleCategorySearch = categoryName => {
    setCategorySearc(prevState => {
      return {
        ...prevState,
        [categoryName]: !prevState[categoryName],
      };
    });
  };

  const resetCategorySearch = () => {
    setCategorySearc(initialCatecoriesState);
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <OwnerFilter
              users={usersFromServer}
              filter={filterByOwner}
              onFilterChange={setFilterByOwner}
            />

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={searchQuerry}
                  onChange={event => setSearcQuerry(event.target.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  {searchQuerry && (
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => setSearcQuerry('')}
                    />
                  )}
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                onClick={() => resetCategorySearch()}
                className={`button is-success mr-6  ${Object.values(categorySearch).some(value => value) && 'is-outlined'}`}
              >
                All
              </a>

              {categoriesFromServer.map(serverCategory => (
                <a
                  data-cy="Category"
                  className={`button mr-2 my-1 ${categorySearch[serverCategory.title] && 'is-info'}`}
                  href="#/"
                  key={serverCategory.id}
                  onClick={() => handleCategorySearch(serverCategory.title)}
                >
                  {serverCategory.title}
                </a>
              ))}
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                onClick={() => resetFilters()}
                className="button is-link is-outlined is-fullwidth"
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          <p data-cy="NoMatchingMessage">
            {filteredProducts.length === 0 &&
              'No products matching selected criteria'}
          </p>

          <table
            data-cy="ProductTable"
            className="table is-striped is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                {TABLE_HEADERS.map(header => (
                  <th key={header}>
                    <span className="is-flex is-flex-wrap-nowrap">
                      {header}
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort" />
                        </span>
                      </a>
                    </span>
                  </th>
                ))}

                {/* <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Product
                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-down" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Category
                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-up" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    User
                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th> */}
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map(product => (
                <Product product={product} key={product.id} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
