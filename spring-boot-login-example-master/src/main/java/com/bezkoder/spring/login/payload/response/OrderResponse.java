package com.bezkoder.spring.login.payload.response;

import java.util.List;

import com.bezkoder.spring.login.models.OrderItem;
import com.bezkoder.spring.login.models.User;


public class OrderResponse {
    private List<OrderItem> orderItem;
    private Long id;
    private User user;

    public OrderResponse(){

    }
    
    public OrderResponse(List<OrderItem> orderItem, User user, Long id) {
      this.orderItem = orderItem;
      this.user = user;
      this.id = id ;
    }
    
    public User getUser() {
      return user;
    }
    public void setUser(User user) {
      this.user = user;
    }

    public List<OrderItem> getOrderItem() {
      return orderItem;
    }

    public void setOrderItem(List<OrderItem> orderItem) {
      this.orderItem = orderItem;
    }

    public Long getId() {
      return id;
    }

    public void setId(Long id) {
      this.id = id;
    }

    
}
