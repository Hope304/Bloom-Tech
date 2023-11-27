package com.bezkoder.spring.login.security.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bezkoder.spring.login.exceptions.CartItemNotExistException;
import com.bezkoder.spring.login.models.Cart;
import com.bezkoder.spring.login.models.Product;
import com.bezkoder.spring.login.models.User;
import com.bezkoder.spring.login.payload.request.Cart.AddToCartRequest;
import com.bezkoder.spring.login.payload.request.Cart.CartItemRequest;
import com.bezkoder.spring.login.payload.response.CartResponse;
import com.bezkoder.spring.login.payload.response.UserInfoResponse;
import com.bezkoder.spring.login.repository.CartRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CartService {

    @Autowired
    private  CartRepository cartRepository;

    public CartService(){}

    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    public void addToCart(int quantity, Product product, User user){
        Cart cart = new Cart(product, quantity, user);
        cartRepository.save(cart);
    }


    public CartResponse listCartItems(User user) {
        List<Cart> cartList = cartRepository.findByUser(user);
        List<CartItemRequest> cartItems = new ArrayList<>();
        for (Cart cart:cartList){
            CartItemRequest cartItemDto = getResponseFromCart(cart);
            cartItems.add(cartItemDto);
        }
        double totalCost = 0;
        for (CartItemRequest cartItemDto :cartItems){
            totalCost += (cartItemDto.getProduct().getPrice()* cartItemDto.getQuantity());
        }
        return new CartResponse(cartItems,totalCost);
    }


    public static CartItemRequest getResponseFromCart(Cart cart) {
        return new CartItemRequest(cart);
    }


    public void updateCartItem(AddToCartRequest cartResponse, User user,Product product){
        Cart cart = (Cart) cartRepository.findByProductId_AndUser(product.getId(),user);
        cart.setQuantity(cartResponse.getQuantity());
        cart.setCreatedDate(new Date());
        cartRepository.save(cart);
    }

    public void deleteCartItem(Long itemID,User user) {
        Cart cart = (Cart) cartRepository.findByProductId_AndUser(itemID,user);
        cartRepository.delete(cart);
    }

    public void deleteAllCartItems(User user) {
        List<Cart> cartList = cartRepository.findByUser(user);
        cartRepository.deleteAll(cartList);
    }


    public void deleteUserCartItems(User user) {
        cartRepository.deleteByUser(user);
    }
}
