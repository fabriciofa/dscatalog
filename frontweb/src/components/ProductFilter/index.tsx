import './styles.css';
import { ReactComponent as SearchIcon } from 'assets/images/search-icon.svg';
import { Category } from 'types/category';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';

type ProductFilterData = {
  name: string;
  category: Category;
};

const ProductFilter = () => {
  const [selectCategories, setCategories] = useState<Category[]>([]);

  const { register, handleSubmit, control } = useForm<ProductFilterData>();

  const onSubmit = (formData: ProductFilterData) => {
    console.log(formData);
  };

  useEffect(() => {
    const config: AxiosRequestConfig = {
      url: '/categories',
      method: 'GET',
    };

    requestBackend(config).then((response) => {
      setCategories(response.data.content);
    });
  }, []);

  return (
    <div className="base-card product-filter-container">
      <form className="product-filter-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="product-filter-name-container">
          <input
            type="text"
            {...register('name')}
            className="form-control"
            placeholder="Nome do Produto"
            name="name"
          />
          <button className="product-filter-search-button">
            <SearchIcon />
          </button>
        </div>
        <div className="product-filter-bottom-container">
          <div className="product-filter-category-container">
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={selectCategories}
                  classNamePrefix="product-filter-select"
                  isClearable
                  placeholder="Categoria"
                  getOptionLabel={(category: Category) => category.name}
                  getOptionValue={(category: Category) => String(category.id)}
                />
              )}
            />
          </div>
          <button className="btn btn-outline-secondary product-filter-btn-style">LIMPAR <span className="product-filter-btn-word">FILTRO</span></button>
        </div>
      </form>
    </div>
  );
};

export default ProductFilter;
