package com.bloomtech.spring.login.exceptions;

public class CartItemNotExistException extends IllegalArgumentException {
  public CartItemNotExistException(String msg) {
      super(msg);
  }
} 
