import axios from 'axios';
import Pagination from 'components/Pagination';
import ProductCard from 'components/ProductCard';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from 'types/product';
import { BASE_URL } from 'util/requests';
import { AxiosParams } from 'util/vendor/axios';
import { SpringPage } from 'util/vendor/spring';

import './styles.css';

const Catalog = () => {
  const [page, setPage] = useState<SpringPage<Product>>();

  useEffect(() => {
    const params: AxiosParams = {
      method: 'GET',
      url: `${BASE_URL}/products`,
      params: {
        page: 0,
        size: 12,
      },
    };

    axios(params).then((response) => {
      setPage(response.data);
      console.log(page);
    });
  }, []);

  return (
    <div className="container my-4 catalog-container">
      <div className="row catalog-container-title">
        <h1>Catálogo de Produtos</h1>
      </div>
      <div className="row">
        {page?.content.map((product) => (
          <div className="col-sm-6 col-md-4 col-xl-3" key={product.id}>
            <Link to="/products/1">
              <ProductCard product={product} />
            </Link>
          </div>
        ))}
      </div>
      <div className="row">
        <Pagination />
      </div>
    </div>
  );
};

export default Catalog;
