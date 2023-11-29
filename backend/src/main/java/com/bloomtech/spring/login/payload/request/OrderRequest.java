package com.bloomtech.spring.login.payload.request;

import com.bloomtech.spring.login.models.Order;

import jakarta.validation.constraints.NotNull;

public class OrderRequest {
  private Long id ;
  private @NotNull Long userId ;
  
  public OrderRequest(){

  }
  public OrderRequest(Order order){
    this.setId(order.getId());
  }
  public Long getId() {
    return id;
  }
  public void setId(Long id) {
    this.id = id;
  }
  public Long getUserId() {
    return userId;
  }
  public void setUserId(Long userId) {
    this.userId = userId;
  }
  
}
