package com.bezkoder.spring.login.exceptions;

public class CartItemNotExistException extends IllegalArgumentException {
  public CartItemNotExistException(String msg) {
      super(msg);
  }
} 
