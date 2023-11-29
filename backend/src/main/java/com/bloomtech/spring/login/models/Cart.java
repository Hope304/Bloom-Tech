package com.bloomtech.spring.login.models;

import jakarta.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.bloomtech.spring.login.payload.response.UserInfoResponse;
import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
@Table(name="cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "created_date")
    private Date createdDate;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;

    @JsonIgnore
    @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id", referencedColumnName = "id")
    private User user;

    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinTable(name = "cart_product", 
    //         joinColumns = @JoinColumn(name = "cart_id"),
    //         inverseJoinColumns = @JoinColumn(name = "product_id"))
    // private Product product;

    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinTable(name = "cart_user", 
    //         joinColumns = @JoinColumn(name = "cart_id"),
    //         inverseJoinColumns = @JoinColumn(name = "user_id"))
    // private User user;

    private int quantity;

    public Cart() {
    }

    public Cart(Product product, int quantity, User user){
        this.user = user;
        this.product = product;
        this.quantity = quantity;
        this.createdDate = new Date();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}