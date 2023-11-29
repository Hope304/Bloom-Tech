package com.bloomtech.spring.login.payload.response;

import com.bloomtech.spring.login.models.Promotion;

import jakarta.annotation.Nonnull;
import jakarta.validation.constraints.NotNull;

public class ProductResponse {
    private Long id;
    private @Nonnull String name;
    private @NotNull double price;
    private @NotNull String description;
    private String imageData;
    private @NotNull String type;
    private Promotion promotion;
    private String brand;


    public ProductResponse() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImageData() {
        return imageData;
    }

    public void setImageData(String imageData) {
        this.imageData = imageData;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Promotion getPromotion() {
        return promotion;
    }

    public void setPromotion(Promotion promotion) {
        this.promotion = promotion;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    
}
