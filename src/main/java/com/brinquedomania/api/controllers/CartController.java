package com.brinquedomania.api.controllers;

import com.brinquedomania.api.dtos.CartRecordDto;
import com.brinquedomania.api.models.CartModel;
import com.brinquedomania.api.models.ProductModel;
import com.brinquedomania.api.repositories.CartRepository;
import com.brinquedomania.api.repositories.ProductRepository;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    CartRepository cartRepository;

    @Autowired
    ProductRepository productRepository;

    @PostMapping("/cart/creat")
    public ResponseEntity<Object> saveCart(@RequestBody @Valid CartRecordDto cartRecordDto){
        
        var cartModel = new CartModel();
        
        float amount = 0F;
        BeanUtils.copyProperties(cartRecordDto, cartModel);

        Map<UUID, Integer> idsProducts = cartModel.getIdsProducts();


        for (Map.Entry<UUID, Integer> entry : idsProducts.entrySet()) {
            UUID idProduct = entry.getKey();
            int quantidade = entry.getValue();

            Optional<ProductModel> product = productRepository.findById(idProduct);

            if (product.isPresent()){
                amount += product.get().getValue() * quantidade;
            }
        }

        cartModel.setAmount(amount);

        return ResponseEntity.status(HttpStatus.CREATED).body(cartRepository.save(cartModel));
    }

    @GetMapping("/cart/readByIdUser/{idClient}")
    public ResponseEntity<Object> readCart(@PathVariable UUID idClient){

        Optional<CartModel> cart = cartRepository.findByIdClient(idClient);

        if (cart.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Seu carrinho de compras está vazio");
        }
        return ResponseEntity.status(HttpStatus.OK).body(cart);
    }


}
