import { useParams } from 'react-router';
import { Fragment, useContext, useEffect, useState } from 'react';

import { CategoriesContext } from '../../src/context/categories.context';
import './category.style.scss'
import ProductCard from '../../component/product-card/product-card.component';

const Category = () =>{
  const {category} = useParams();
  const {categoriesMap} = useContext(CategoriesContext);

  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() =>{
    setProducts(categoriesMap[category])
  }, [category, categoriesMap])

  return(
    <Fragment>
      <h2 className='category-title'>{category.toUpperCase()}</h2>
      <div className='category-container'>
        { products &&
          products.map((product) =>(<ProductCard key={product.id} product={product} />))
        }
      </div>    
    </Fragment>

  )

}

export default Category;