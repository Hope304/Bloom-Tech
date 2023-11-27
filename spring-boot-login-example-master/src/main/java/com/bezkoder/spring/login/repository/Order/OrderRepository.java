package com.bezkoder.spring.login.repository.Order;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bezkoder.spring.login.models.Order;
import com.bezkoder.spring.login.models.User;

@Repository
public interface OrderRepository extends JpaRepository<Order , Long> {
  List<Order> findAllByUserOrderByCreatedDateDesc(User user);
}
