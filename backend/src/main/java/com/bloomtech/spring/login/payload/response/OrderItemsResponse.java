package com.bloomtech.spring.login.payload.response;

import jakarta.validation.constraints.NotNull;

public class OrderItemsResponse {
  private @NotNull double price;
  private @NotNull int quantity;
  private @NotNull Long orderId;
  private @NotNull Long productId;

  public OrderItemsResponse () {}

  public OrderItemsResponse(@NotNull double price, @NotNull int quantity, @NotNull Long orderId, @NotNull Long productId) {
      this.price = price;
      this.quantity = quantity;
      this.orderId = orderId;
      this.productId = productId;
  }

  public double getPrice() {
    return price;
  }

  public void setPrice(double price) {
    this.price = price;
  }

  public int getQuantity() {
    return quantity;
  }

  public void setQuantity(int quantity) {
    this.quantity = quantity;
  }

  public Long getOrderId() {
    return orderId;
  }

  public void setOrderId(Long orderId) {
    this.orderId = orderId;
  }

  public Long getProductId() {
    return productId;
  }

  public void setProductId(Long productId) {
    this.productId = productId;
  }
  
}
