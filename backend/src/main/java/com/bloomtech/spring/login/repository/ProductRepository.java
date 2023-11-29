package com.bloomtech.spring.login.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bloomtech.spring.login.models.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}
