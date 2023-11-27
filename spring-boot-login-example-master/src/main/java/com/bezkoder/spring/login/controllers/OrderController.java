package com.bezkoder.spring.login.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bezkoder.spring.login.models.Order;
import com.bezkoder.spring.login.models.OrderItem;
import com.bezkoder.spring.login.models.User;
import com.bezkoder.spring.login.payload.request.OrderUpdateRequest;
import com.bezkoder.spring.login.payload.response.OrderResponse;
import com.bezkoder.spring.login.security.services.OrderService;
import com.bezkoder.spring.login.security.services.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/order")
public class OrderController {
  @Autowired 
  public OrderService orderService;

  @PostMapping("/add")
  public String placeOrder (){
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    User user = new User(userDetails.getUsername(),userDetails.getEmail(),userDetails.getPassword());
    user.setId(userDetails.getId());
    orderService.placeOrder(user);
    return "Created  String placeOrder";
  }

  @GetMapping("/get")
  public ResponseEntity<?> getListOrder(){
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    User user = new User(userDetails.getUsername(),userDetails.getEmail(),userDetails.getPassword());
    user.setId(userDetails.getId());
    List<Order> listOrder = orderService.listOders(user);
    return ResponseEntity.ok(listOrder);
  }
  @GetMapping("/getAll")
  public ResponseEntity<?> getAllListOrder(){
    List<OrderResponse> listOrder = orderService.listAllOders();
    return ResponseEntity.ok(listOrder);
  }

  @PutMapping("/update/{orderId}")
  // @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> updateOrderItem(@RequestBody OrderUpdateRequest orderUpdateRequest ){
    orderService.updateOrderItem(orderUpdateRequest);
    return ResponseEntity.ok(orderUpdateRequest);
  }

}
