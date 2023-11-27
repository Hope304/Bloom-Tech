package com.bezkoder.spring.login.models;

import java.util.List;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="orders")
public class Order {

  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  private Long id ;

  @Column(name="created_date")
  private Date createdDate;

  @Column(name="total_price")
  private Double totalPrice ;


  @OneToMany(mappedBy = "order", fetch=FetchType.LAZY)
  private List<OrderItem> orderItem ;

  @ManyToOne()
  @JsonIgnore
  @JoinColumn(name = "user_id", referencedColumnName = "id")
  private User user;

  public Order(){

  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Date getCreatedDate() {
    return createdDate;
  }

  public void setCreatedDate(Date createdDate) {
    this.createdDate = createdDate;
  }

  public Double getTotalPrice() {
    return totalPrice;
  }

  public void setTotalPrice(Double totalPrice) {
    this.totalPrice = totalPrice;
  }


  public List<OrderItem> getOrderItems() {
    return orderItem;
  }

  public void setOrderItems(List<OrderItem> orderItems) {
    this.orderItem = orderItems;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  

}
