package com.devsuperior.dscatalog.repositories;

import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.EmptyResultDataAccessException;

import com.devsuperior.dscatalog.entities.Product;
import com.devsuperior.dscatalog.tests.Factory;

@DataJpaTest
class ProductRepositoryTests {

	@Autowired
	private ProductRepository productRepository;

	private long existingId;
	private long nonExistingId;
	private long countTotalProducts;
	
	@BeforeEach
	void setUp() throws Exception {
		existingId = 1L;
		nonExistingId = 1000L;
		countTotalProducts = 25L;
	}

	@Test
	void findByIdShouldReturnEmptyOptionalWhenIdDoesNotExist() {
		Optional<Product> result = productRepository.findById(nonExistingId);
		Assertions.assertTrue(result.isEmpty());
	}
	
	@Test
	void findByIdShouldReturnOptionalProductWhenIdExists() {
		Optional<Product> result = productRepository.findById(existingId);
		Assertions.assertNotNull(result);
	}
	
	@Test
	void saveShouldPersistWithAutoincrementWhenIdIsNull() {
		Product product = Factory.createProduct();
		product.setId(null);
		Product result = productRepository.save(product);
		Assertions.assertNotNull(result.getId());
		Assertions.assertEquals(countTotalProducts + 1, result.getId());
	}
	
	@Test
	void deleteShouldDeleteWhenIdExists() {
		productRepository.deleteById(existingId);
		Optional<Product> result = productRepository.findById(existingId);
		Assertions.assertFalse(result.isPresent());
	}
	
	@Test
	void deleteShouldThrowEmptyDataAcessExceptionWhenIdDoesNotExist() {
		Assertions.assertThrows(EmptyResultDataAccessException.class, () -> {
			productRepository.deleteById(nonExistingId);
		});
	}

}
