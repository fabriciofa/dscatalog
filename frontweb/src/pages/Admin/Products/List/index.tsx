import { AxiosRequestConfig } from 'axios';
import ProductCrudCard from 'pages/Admin/Products/ProductCrudCard';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from 'types/product';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';

import './styles.css';

const List = () => {
  const [list, setList] = useState<SpringPage<Product>>();

  useEffect(() => {
    getProducts()
  }, []);

  const getProducts = () => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/products',
      withCredentials: true,
      params: {
        size: 30,
      }
    }
    requestBackend(config)
      .then(response => {
        setList(response.data)
      })
  }

  return (
    <div className="product-crud-container">
      <div className="product-crud-bar-container">
        <Link to="/admin/products/create">
          <button className="btn btn-primary text-white btn-crud-add">
            ADICIONAR
          </button>
        </Link>
        <div className="base-card product-filter-container">Search bar</div>
      </div>
      <div className="row">
        {list?.content.map(
          product => <ProductCrudCard product={product} onDelete={() => getProducts()} key={product.id} />
        )}
      </div>
    </div>
  );
};

export default List;
