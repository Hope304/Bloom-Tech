package com.bloomtech.spring.login.models;


import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name="order_items")
public class OrderItem {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name="quantity")
  private @NotNull int quantity;

  @Column(name="price")
  private @NotNull double price;

  @Column(name ="created_date")
  private Date createdDate;

  @Column(name="state")
  private String state ;
  
  @ManyToOne
  @JsonIgnore
  @JoinColumn(name = "order_id", referencedColumnName = "id")
  private Order order;

  @OneToOne
  @JoinColumn(name = "product_id", referencedColumnName = "id")
  private Product product ;

  public OrderItem(){
    
  }
  
  public OrderItem(Order order , @NotNulll Product product , @NotNull int quantity , @NotNull double price ,String state ){
    this.order = order;
    this.quantity = quantity;
    this.product = product;
    this.price = price;
    this.state = state;
    this.createdDate = new Date();
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public int getQuantity() {
    return quantity;
  }

  public void setQuantity(int quantity) {
    this.quantity = quantity;
  }

  public double getPrice() {
    return price;
  }

  public void setPrice(double price) {
    this.price = price;
  }

  public Date getCreatedDate() {
    return createdDate;
  }

  public void setCreatedDate(Date createdDate) {
    this.createdDate = createdDate;
  }

  public Order getOrder() {
    return order;
  }

  public void setOrder(Order order) {
    this.order = order;
  }

  public Product getProduct() {
    return product;
  }

  public void setProduct(Product product) {
    this.product = product;
  }

  public String getState() {
    return state;
  }

  public void setState(String state) {
    this.state = state;
  }

}
