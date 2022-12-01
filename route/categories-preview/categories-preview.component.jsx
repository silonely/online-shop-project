import { Fragment, useContext } from 'react';

import { CategoriesContext } from "../../src/context/categories.context"
import CategoryPreview from '../../component/categoriey-preview/category-preview.component'


const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext)
  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} products={products} title={title} />
        )
      })}
    </Fragment >

  )
};

export default CategoriesPreview;