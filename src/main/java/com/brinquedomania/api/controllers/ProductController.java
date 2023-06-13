package com.brinquedomania.api.controllers;

import com.brinquedomania.api.dtos.UserRecordDto;
import com.brinquedomania.api.models.UserModel;
import com.brinquedomania.api.repositories.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ProductController {

    @Autowired
    UserRepository userRepository;

    /*
    @PostMapping("/products")
    public ResponseEntity<UserModel> saveUser(@RequestBody @Valid UserRecordDto)

    */

    @GetMapping("/home/{name}")
    public String bemVindo(@PathVariable String name){
        return "Bem-vindo, " + name;
    }
}
