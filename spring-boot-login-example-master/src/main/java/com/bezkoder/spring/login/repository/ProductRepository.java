package com.bezkoder.spring.login.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bezkoder.spring.login.models.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}

