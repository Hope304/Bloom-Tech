package com.bloomtech.spring.login.payload.request;

import jakarta.validation.constraints.NotNull;

public class OrderUpdateRequest {
  private @NotNull Long orderId;
  private @NotNull Long orderItemId;
  private String state;

  public OrderUpdateRequest(){

  }

  public Long getOrderId() {
    return orderId;
  }

  public void setOrderId(Long orderId) {
    this.orderId = orderId;
  }

  public Long getOrderItemId() {
    return orderItemId;
  }

  public void setOrderItemId(Long orderItemId) {
    this.orderItemId = orderItemId;
  }

  public String getState() {
    return state;
  }

  public void setState(String state) {
    this.state = state;
  }
  
}
