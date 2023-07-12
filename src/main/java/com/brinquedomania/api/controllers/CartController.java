package com.brinquedomania.api.controllers;

import com.brinquedomania.api.dtos.CartRecordDto;
import com.brinquedomania.api.models.CartModel;
import com.brinquedomania.api.models.ProductModel;
import com.brinquedomania.api.models.SaleModel;
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

/**
 * Classe responsavel por implementar as rotas do CONTROLLER do carrinho de compras.
 */
@RestController
@CrossOrigin(origins = "*")
public class CartController {

    /**
     * Atributo responsável por realizar as operações de CRUD do carrinho de compras no banco de dados
     */
    @Autowired
    CartRepository cartRepository;

    /**
     * Atributo responsável por realizar as operações de CRUD do produto no banco de dados
     */
    @Autowired
    ProductRepository productRepository;

    /**
     * Método responsável por criar um carrinho de compras
     * @param cartRecordDto DTO com os dados do carrinho de compras
     * @return Carrinho de compras criado
     */
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

    /**
     * Método responsável por acessar um carrinho de compras pelo ID do cliente
     * @param idClient ID do cliente
     * @return Carrinho de compras do cliente ou mensagem de erro
     */
    @GetMapping("/cart/readByIdUser/{idClient}")
    public ResponseEntity<Object> readCart(@PathVariable UUID idClient){

        Optional<CartModel> cart = cartRepository.findByIdClient(idClient);

        if (cart.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Seu carrinho de compras está vazio");
        }
        return ResponseEntity.status(HttpStatus.OK).body(cart);
    }


    @PutMapping("/cart/edit")
    public ResponseEntity<Object> updateCart(@RequestBody Map<String, Object> requestBody){

        UUID idClient = UUID.fromString( (String) requestBody.get("idClient"));
        UUID idProduct = UUID.fromString( (String) requestBody.get("idProduct"));
        String action = (String) requestBody.get("action");

        Optional<CartModel> newCart = cartRepository.findByIdClient(idClient);
        System.out.println(newCart);
        if (newCart.isPresent()){
            var products = newCart.get().getIdsProducts();
            if (action.equals("add")){
                if (products.containsKey(idProduct)){
                    products.put(idProduct, products.get(idProduct) + 1);
                }
                else {
                    newCart.get().addProduct(idProduct, 1);
                }
                Float value = productRepository.findById(idProduct).get().getValue();
                newCart.get().setAmount(newCart.get().getAmount() + value);
            }
            else if (action.equals("remove")) {
                products.put(idProduct, products.get(idProduct) - 1);
                Float value = productRepository.findById(idProduct).get().getValue();
                newCart.get().setAmount(newCart.get().getAmount() - value);
                if (products.get(idProduct) == 0){
                    products.remove(idProduct);
                }
                if (newCart.get().getIdsProducts().isEmpty()){
                    newCart.get().setAmount(0.0F);
                }
            }
            newCart.get().setIdsProducts(products);
        }


        return ResponseEntity.status(HttpStatus.OK).body(cartRepository.save(newCart.get()));
    }

    @GetMapping("/cart/listAll")
    public ResponseEntity<List<CartModel>> getAllCarts() {
        return ResponseEntity.status(HttpStatus.OK).body(cartRepository.findAll());
    }

}
