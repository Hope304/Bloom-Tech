package com.bezkoder.spring.login.controllers;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Locale.Category;

import javax.sql.rowset.serial.SerialException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bezkoder.spring.login.payload.response.MessageResponse;
import com.bezkoder.spring.login.payload.response.ProductResponse;
import com.bezkoder.spring.login.security.services.ProductService;
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/product")
public class ProductController {
    @Autowired
    ProductService productService;

    @PostMapping("/add")
    // @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createProduct(@RequestParam("image") MultipartFile image,
    @RequestParam("name") String name,
    @RequestParam("price") double price,
    @RequestParam("type") String type,
    @RequestParam("description") String description) throws IOException {
        ProductResponse productResponse = new ProductResponse();
        productResponse.setName(name);
        productResponse.setPrice(price);
        productResponse.setType(type);
        productResponse.setDescription(description);
        productService.createProduct(image ,productResponse);
        //  return new ResponseEntity.badRequest().body(new ApiResponse(true, "product has been added"), HttpStatus.CREATED);
        return ResponseEntity.ok(new MessageResponse("product has been added!"));
    }

    @GetMapping("/")
    // @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ProductResponse>> getProducts() {
        List<ProductResponse> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/get/{productId}")
    public ResponseEntity<?> getProduct(@PathVariable("productId") Long productId) throws Exception {
        ProductResponse product = productService.getProduct(productId);
        return ResponseEntity.ok(product);
    }

    // create an api to edit the product


    @PostMapping("/update/{productId}")
    public ResponseEntity<?> updateProduct(@PathVariable("productId") Long productId, @RequestBody ProductResponse productResponse) throws Exception {
        productService.updateProduct(productResponse, productId);
        return ResponseEntity.ok(new MessageResponse("product has been updated!"));
    }

    @DeleteMapping("/delete/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable("productId") Long productId){
        productService.deleteProduct(productId);
        return ResponseEntity.ok(new MessageResponse("product has been deleted!"));
    }
}

