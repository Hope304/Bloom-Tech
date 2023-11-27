package com.bezkoder.spring.login.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bezkoder.spring.login.models.Cart;
import com.bezkoder.spring.login.models.User;

@Repository
public interface CartRepository extends JpaRepository<Cart , Long>{
  List<Cart> findAllByUserOrderByCreatedDateDesc(User user);
  Cart findByProductId_AndUser(Long productId, User user);
  List<Cart> findByProductId(Long productId);
  List<Cart> findByUser(User user);
  List<Cart> deleteByUser(User user);
}
