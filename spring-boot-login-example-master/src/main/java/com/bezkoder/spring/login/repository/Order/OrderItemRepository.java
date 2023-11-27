package com.bezkoder.spring.login.repository.Order;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bezkoder.spring.login.models.Order;
import com.bezkoder.spring.login.models.OrderItem;
import com.bezkoder.spring.login.models.User;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    // Tìm OrderItem theo OrderId và OrderItemId
    Optional<OrderItem> findByOrder_IdAndId(Long orderId, Long orderItemId);
    List<OrderItem> findByOrderId(Long orderId);

}