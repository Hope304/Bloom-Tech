package com.bloomtech.spring.login.payload.response;

import java.util.List;

import com.bloomtech.spring.login.payload.request.Cart.CartItemRequest;

public class CartResponse {
  private List<CartItemRequest> cartItems;
  private double totalCost;

  public CartResponse(List<CartItemRequest> cartItemDtoList, double totalCost) {
      this.cartItems = cartItemDtoList;
      this.totalCost = totalCost;
  }

  public List<CartItemRequest> getcartItems() {
      return cartItems;
  }

  public void setCartItems(List<CartItemRequest> cartItemDtoList) {
      this.cartItems = cartItemDtoList;
  }

  public double getTotalCost() {
      return totalCost;
  }

  public void setTotalCost(int totalCost) {
      this.totalCost = totalCost;
  }
}
