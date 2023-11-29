package com.bloomtech.spring.login.security.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bloomtech.spring.login.models.Product;
import com.bloomtech.spring.login.models.Promotion;
import com.bloomtech.spring.login.payload.response.ProductResponse;
import com.bloomtech.spring.login.repository.ProductRepository;
import com.bloomtech.spring.login.repository.PromotionRepository;

@Service
public class ProductService {
    @Autowired
    ProductRepository productRepository;
    @Autowired
    PromotionRepository promotionRepository;

    public void createProduct(MultipartFile image,ProductResponse productDto) throws IOException {
        Optional<Promotion> promotion = promotionRepository.findById(3);
        Product product = new Product();
        product.setDescription(productDto.getDescription());
        product.setImageData(Base64.getEncoder().encodeToString(image.getBytes()));
        product.setName(productDto.getName());
        product.setPrice(productDto.getPrice());
        product.setType(productDto.getType());
        product.setPromotion(promotion.get());
        product.setBrand(productDto.getBrand());
        productRepository.save(product);
    }

    public ProductResponse getProductResponse(Product product) {
        ProductResponse productResponse = new ProductResponse();
        productResponse.setDescription(product.getDescription());
        productResponse.setImageData(product.getImageData());
        productResponse.setName(product.getName());
        productResponse.setPrice(product.getPrice());
        productResponse.setId(product.getId());
        productResponse.setType(product.getType());
        productResponse.setPromotion(product.getPromotion());
        productResponse.setBrand(product.getBrand());
        return productResponse;
    }

    public List<ProductResponse> getAllProducts() {
        List<Product> allProducts = productRepository.findAll();
        List<ProductResponse> productDtos = new ArrayList<>();
        for(Product product: allProducts) {
            productDtos.add(getProductResponse(product));
        }
        return productDtos;
    }
    public ProductResponse getProduct(Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        return product.map(this::getProductResponse).orElse(null);
    }

    public void updateProduct(Integer promotionId, ProductResponse productResponse) throws Exception {
        Optional<Product> optionalProduct = productRepository.findById(productResponse.getId());
        Optional<Promotion> optionalPromotion = promotionRepository.findById(promotionId);
        // throw an exception if product does not exists
        if (!optionalProduct.isPresent()) {
            throw new Exception("product not present");
        }
        Product product = new Product();
        product.setImageData(optionalProduct.get().getImageData());
        product.setId(productResponse.getId());
        product.setName(productResponse.getName());
        product.setPrice(productResponse.getPrice());
        product.setDescription(productResponse.getDescription());
        product.setBrand(productResponse.getBrand());
        product.setType(productResponse.getType());
        product.setPromotion(optionalPromotion.get());
        productRepository.save(product);
    }
    public void deleteProduct(Long productId){
        Optional<Product> optionalProduct = productRepository.findById(productId);
        Product product = optionalProduct.get();
        productRepository.delete(product);
    }
    public Product getProductById(Long productId)  {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        return optionalProduct.get();
    }
}
