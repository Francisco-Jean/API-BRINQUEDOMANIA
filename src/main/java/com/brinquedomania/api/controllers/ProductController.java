package com.brinquedomania.api.controllers;

import com.brinquedomania.api.dtos.ProductRecordDto;
import com.brinquedomania.api.models.ProductModel;
import com.brinquedomania.api.repositories.ProductRepository;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    ProductRepository productRepository;
    @PostMapping("/product/register")
    public ResponseEntity<ProductModel> saveProduct(@RequestBody @Valid ProductRecordDto productRecordDto) {
        var productModel = new ProductModel();
        BeanUtils.copyProperties(productRecordDto, productModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(productRepository.save(productModel));
    }
    @GetMapping("/product/listAll")
    public ResponseEntity<List<ProductModel>> getAllProduct() {
        return ResponseEntity.status(HttpStatus.OK).body(productRepository.findAll());
    }
    @GetMapping("/product/listOne/{id}")
    public ResponseEntity<Object> getOneProductById(@PathVariable(value = "id") UUID id) {
        Optional<ProductModel> product0 = productRepository.findById(id);
        if (product0.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("usuário não encontrado.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(product0.get());
    }
    //IMPLEMENTACAO PUT E DELETE (BIA)
}