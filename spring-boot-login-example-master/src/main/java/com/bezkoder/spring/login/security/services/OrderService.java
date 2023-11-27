package com.bezkoder.spring.login.security.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.Hashtable;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bezkoder.spring.login.models.Order;
import com.bezkoder.spring.login.models.OrderItem;
import com.bezkoder.spring.login.models.User;
import com.bezkoder.spring.login.payload.request.OrderUpdateRequest;
import com.bezkoder.spring.login.payload.request.Cart.CartItemRequest;
import com.bezkoder.spring.login.payload.response.CartResponse;
import com.bezkoder.spring.login.payload.response.OrderResponse;
import com.bezkoder.spring.login.repository.UserRepository;
import com.bezkoder.spring.login.repository.Order.OrderItemRepository;
import com.bezkoder.spring.login.repository.Order.OrderRepository;

@Service
public class OrderService {
  
  @Autowired
  private CartService cartService;

  @Autowired
  private OrderRepository orderRepository;
  
  @Autowired
  private OrderItemRepository orderItemRepository;

  @Autowired
  private UserRepository userRepository;

  public void placeOrder(User user){
    // tạo danh sách mua hàng đầu tiên cho người dùng
    CartResponse cartResponse = cartService.listCartItems(user);
    List<CartItemRequest> cartItemsList = cartResponse.getcartItems();
    //tạo order và lưu
    if(!cartItemsList.isEmpty()){
      Order newOrder = new Order();
      newOrder.setCreatedDate(new Date());
      newOrder.setUser(user);
      newOrder.setTotalPrice(cartResponse.getTotalCost());
      orderRepository.save(newOrder);
  
      for(CartItemRequest cartItem : cartItemsList){
        // Tạo oderItems và lưu từng item vào danh sách
        OrderItem orderItem = new OrderItem();
        orderItem.setCreatedDate(new Date());
        orderItem.setPrice(cartItem.getProduct().getPrice());
        orderItem.setProduct(cartItem.getProduct());
        orderItem.setQuantity(cartItem.getQuantity());
        orderItem.setOrder(newOrder);
        orderItem.setState("Đang Xác Thực");
        // thêm danh sach vào đặt hàng
        orderItemRepository.save(orderItem);
    }
    }
  }
  
  // Tìm danh sách sản phẩm user đã order
  public List<Order> listOders(User user) {
    return orderRepository.findAllByUserOrderByCreatedDateDesc(user);
  }

  public List<OrderResponse> listAllOders() {
    List<Order> orders = orderRepository.findAll(); 
    List<OrderResponse> orderResponses = new ArrayList<>();
    for(Order i : orders){
      Optional<User> user = userRepository.findById(i.getUser().getId());
      List<OrderItem> orderItem = orderItemRepository.findByOrderId(i.getId()); 
      orderResponses.add(new OrderResponse(orderItem,user.get(),i.getId()));
    }
    return orderResponses;
    // return orderRepository.findAllByUserOrderByCreatedDateDesc(user);
  }
  // Cập nhật tình trạng đơn hàng
  public void updateOrderItem(OrderUpdateRequest orderUpdateRequest){
    Long orderId = orderUpdateRequest.getOrderId();
    Long orderItemId = orderUpdateRequest.getOrderItemId();
    String state = orderUpdateRequest.getState();
    Optional<OrderItem> optionalOrderItem = orderItemRepository.findByOrder_IdAndId( orderId , orderItemId);
    OrderItem orderItem = optionalOrderItem.get();
    orderItem.setState(state);
    orderItem.setCreatedDate(new Date());
    orderItemRepository.save(orderItem);
  }

}
