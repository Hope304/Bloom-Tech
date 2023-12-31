package com.bloomtech.spring.login.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.bloomtech.spring.login.models.Product;

import com.bloomtech.spring.login.models.User;
import com.bloomtech.spring.login.payload.request.Cart.AddToCartRequest;
import com.bloomtech.spring.login.payload.response.CartResponse;
import com.bloomtech.spring.login.payload.response.MessageResponse;
import com.bloomtech.spring.login.payload.response.UserInfoResponse;
import com.bloomtech.spring.login.repository.CartRepository;
import com.bloomtech.spring.login.security.jwt.JwtUtils;
import com.bloomtech.spring.login.security.services.CartService;
import com.bloomtech.spring.login.security.services.ProductService;
import com.bloomtech.spring.login.security.services.UserDetailsImpl;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @Autowired
    private ProductService productService;


    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody AddToCartRequest addToCartRequest ) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = new User(userDetails.getUsername(), userDetails.getEmail(), userDetails.getPassword());
        user.setId(userDetails.getId());
        user.setRoles(null);
        Product product = productService.getProductById(addToCartRequest.getProductId());
        cartService.addToCart(addToCartRequest.getQuantity(), product,user);
        return ResponseEntity.ok(new MessageResponse("Added to cart"));
    }
    
    @GetMapping("/get")
    public ResponseEntity<?> getCartItems() {
        try {
            // Lấy thông tin user từ SecurityContextHolder
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            User user = new User(userDetails.getUsername(), userDetails.getEmail(), userDetails.getPassword());
            user.setId(userDetails.getId());
            user.setRoles(null);
            // Gọi service để lấy thông tin giỏ hàng
            CartResponse cartDto = cartService.listCartItems(user);
            return ResponseEntity.ok(cartDto);
        } catch (Exception e) {
              e.printStackTrace(); // In stack trace vào logs
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching cart items");
        }
    }
    @PutMapping("/update/{cartItemId}")
    public ResponseEntity<?> updateCartItem(@PathVariable("cartItemId") Long cartItemID ,@RequestBody @Valid AddToCartRequest cartDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = new User(userDetails.getUsername(), userDetails.getEmail(), userDetails.getPassword());
        user.setId(userDetails.getId());
        user.setRoles(null);
        Product product = productService.getProductById(cartDto.getProductId());
        cartService.updateCartItem(cartDto, user,product);
        return ResponseEntity.ok(new MessageResponse("Product has been updated"));
        
    }

    @DeleteMapping("/delete/{cartItemId}")
    public ResponseEntity<?> deleteCartItem(@PathVariable("cartItemId") Long cartItemID) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = new User(userDetails.getUsername(), userDetails.getEmail(), userDetails.getPassword());
        user.setId(userDetails.getId());
        user.setRoles(null);
        cartService.deleteCartItem(cartItemID, user);
        return ResponseEntity.ok(new MessageResponse("Product has been deleted"));
    }
    @DeleteMapping("/deleteAll")
    public ResponseEntity<?> deleteAllCartItem() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = new User(userDetails.getUsername(), userDetails.getEmail(), userDetails.getPassword());
        user.setId(userDetails.getId());
        user.setRoles(null);
        cartService.deleteAllCartItems(user);
        return ResponseEntity.ok(new MessageResponse("Product has been deleted"));
    }
}