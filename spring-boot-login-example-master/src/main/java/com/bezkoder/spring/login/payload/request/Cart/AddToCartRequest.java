package com.bezkoder.spring.login.payload.request.Cart;

import jakarta.validation.constraints.NotNull;

public class AddToCartRequest {
    private @NotNull Long productId;
    private @NotNull Integer quantity;

    public AddToCartRequest() {
    }

    @Override
    public String toString() {
        return "CartResponse{" +
                ", productId=" + productId +
                ", quantity=" + quantity +
                ",";
    }

    // public Long getId() {
    //     return id;
    // }

    // public void setId(Long id) {
    //     this.id = id;
    // }


    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
