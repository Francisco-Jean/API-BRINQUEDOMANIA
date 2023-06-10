package com.brinquedomania.api.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {

    @GetMapping("/home/{name}")
    public String bemVindo(@PathVariable String name){
        return "Bem-vindo, " + name;
    }
}
