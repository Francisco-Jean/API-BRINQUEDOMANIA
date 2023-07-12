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


/**
 * Classe responsavel por implementar as rotas do CONTROLLER do produto.
 */
@RestController
@CrossOrigin(origins = "*")
public class ProductController {


    /**
     * Atributo responsável por realizar as operações de CRUD do produto no banco de dados
     */
    @Autowired
    ProductRepository productRepository;

    /**
     * Metodo/Rota responsavel por realizar o cadastro do produto
     * @param productRecordDto - DTO que contem os dados do produto para realizar o cadastro
     * @return - Retorna o produto que foi cadastrado
     */
    @PostMapping("/product/register")
    public ResponseEntity<ProductModel> saveProduct(@RequestBody @Valid ProductRecordDto productRecordDto) {
        var productModel = new ProductModel();
        BeanUtils.copyProperties(productRecordDto, productModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(productRepository.save(productModel));
    }

    /**
     * Metodo/Rota responsavel por listar todos os produtos cadastrados
     * @return - Retorna uma lista com todos os produtos cadastrados
     */
    @GetMapping("/product/listAll")
    public ResponseEntity<List<ProductModel>> getAllProduct() {
        return ResponseEntity.status(HttpStatus.OK).body(productRepository.findAll());
    }

    /**
     * Metodo/Rota responsavel por listar um produto especifico
     * @param id - ID do produto que deseja listar
     * @return - Retorna o produto que foi encontrado
     */
    @GetMapping("/product/listOne/{id}")
    public ResponseEntity<Object> getOneProductById(@PathVariable(value = "id") UUID id) {
        Optional<ProductModel> product0 = productRepository.findById(id);
        if (product0.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("usuário não encontrado.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(product0.get());
    }

    /**
     * Metodo/Rota responsavel por editar um produto especifico
     * @param id - ID do produto que deseja editar
     * @param productRecordDto - DTO que contem os dados do produto para realizar a edição
     * @return - Retorna o produto que foi editado
     */
    @PutMapping("/product/edit/{id}")
    public ResponseEntity<Object> updateUser(@PathVariable(value="id") UUID id,
                                             @RequestBody @Valid ProductRecordDto productRecordDto) {
        Optional<ProductModel> product0 = productRepository.findById(id);
        if(product0.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado.");
        }
        var productModel = product0.get();
        BeanUtils.copyProperties(productRecordDto, productModel);
        return ResponseEntity.status(HttpStatus.OK).body(productRepository.save(productModel));
    }

    /**
     * Metodo/Rota responsavel por deletar um produto especifico
     * @param id - ID do produto que deseja deletar
     * @return - Retorna uma mensagem de sucesso ou erro
     */
    @DeleteMapping("/product/delete/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable(value="id") UUID id) {
        Optional<ProductModel> product0 = productRepository.findById(id);
        if(product0.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado.");
        }
        productRepository.delete(product0.get());
        return ResponseEntity.status(HttpStatus.OK).body("Usuário deletado com sucesso.");
    }
}