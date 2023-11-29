package com.bloomtech.spring.login.payload.request.Cart;

import com.bloomtech.spring.login.models.Cart;
import com.bloomtech.spring.login.models.Product;

import jakarta.validation.constraints.NotNull;

public class CartItemRequest {
    private Long id;
    private @NotNull Integer quantity;
    private @NotNull Product product;

    public CartItemRequest() {
    }

    public CartItemRequest(Cart cart) {
        this.setId(cart.getId());
        this.setQuantity(cart.getQuantity());
        this.setProduct(cart.getProduct());
    }

    @Override
    public String toString() {
        return "CartDto{" +
                ", quantity=" + quantity +
                ", productName=" + product.getName() +
                '}';
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

}