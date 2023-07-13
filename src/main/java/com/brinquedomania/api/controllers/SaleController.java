package com.brinquedomania.api.controllers;

import com.brinquedomania.api.dtos.SaleRecordDto;
import com.brinquedomania.api.models.SaleModel;
import com.brinquedomania.api.repositories.CartRepository;
import com.brinquedomania.api.repositories.ProductRepository;
import com.brinquedomania.api.repositories.SaleRepository;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;


/**
 * Classe responsavel por implementar as rotas do CONTROLLER da venda.
 */
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class SaleController {

    /**
     * Atributo responsavel por realizar as operacoes de CRUD da venda no banco de dados
     */
    @Autowired
    SaleRepository saleRepository;

    /**
     * Atributo responsavel por realizar as operacoes de CRUD do carrinho de compras no banco de dados
     */
    @Autowired
    CartRepository cartRepository;

    /**
     * Atributo responsavel por realizar as operacoes de CRUD do produto no banco de dados
     */
    @Autowired
    ProductRepository productRepository;

    /**
     * Metodo/Rota responsavel por realizar o cadastro da venda
     * @param saleRecordDto - DTO que contem os dados da venda para realizar o cadastro
     * @return - Retorna a venda que foi cadastrada
     */
    @PostMapping("sale/register")
    public ResponseEntity<Object> saveSale(@RequestBody @Valid SaleRecordDto saleRecordDto){
        SaleModel saleModel = new SaleModel();
        BeanUtils.copyProperties(saleRecordDto, saleModel);

        var cart = cartRepository.findByIdClient(saleModel.getIdClient());

        /**
         * Verifica se o carrinho de compras esta vazio
         */
        if (cart.isEmpty() || cart.get().getIdsProducts().isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Seu carrinho de compras esta vazio. " +
                    "Adicione seus produtos nele para realizar a compra.");
        }

        saleModel.setAmount(cart.get().getAmount());

        UUID idSeller = productRepository.findById(cart.get().getIdsProducts().keySet().iterator().next()).get().getIdSeller();
        saleModel.setIdSeller(idSeller);
        LocalDate date = LocalDate.now();
        saleModel.setDate(java.sql.Date.valueOf(date));
        Map<UUID, Integer> products = cart.get().getIdsProducts();

        /**
         * Adiciona os produtos do carrinho de compras na venda
         */
        for (Map.Entry<UUID, Integer> entry : products.entrySet()) {
            UUID idProduct = entry.getKey();
            int quantidade = entry.getValue();

            saleModel.addProduct(idProduct, quantidade);
        }

        /**
          Limpa os produtos carrinho de compras e salva a venda
         */
        cart.get().clearCart();
        cart.get().setAmount(0.0F);
        cartRepository.save(cart.get());
        return ResponseEntity.status(HttpStatus.CREATED).body(saleRepository.save(saleModel));
    }

    /**
     * Metodo/Rota responsavel por listar todas as vendas do sistema
     * @return - Retorna uma lista com todas as vendas do sistema
     */
    @GetMapping("/sale/listAll")
    public ResponseEntity<List<SaleModel>> getAllSales() {
        return ResponseEntity.status(HttpStatus.OK).body(saleRepository.findAll());
    }

    /**
     * Metodo/Rota responsavel por listar todas as vendas de um vendedor, de um cliente ou de uma data especifica
     * @return - Retorna uma lista com todas as vendas do vendedor
     */
    @PostMapping("/sale/listBy")
    public ResponseEntity<List<SaleModel>> getSalesBy(@RequestBody Map<String, Object> request) throws ParseException {

        /**
         * Verifica se a busca das vendas sera pelo vendedor
         */
        if (((String) request.get("form")).equals("seller")){
            UUID id = UUID.fromString((String) request.get("value"));
            return ResponseEntity.status(HttpStatus.OK).body(saleRepository.findByIdSeller(id));

        }

        /**
         * Verifica se a busca das vendas sera pelo cliente
         */
        else if (((String) request.get("form")).equals("client")){
            UUID id = UUID.fromString((String) request.get("value"));
            return ResponseEntity.status(HttpStatus.OK).body(saleRepository.findByIdClient(id));
        }

        /**
         * Verifica se a busca das vendas sera pela data
         */
        else if (((String) request.get("form")).equals("date")){

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date date = sdf.parse((String) request.get("value"));
            return ResponseEntity.status(HttpStatus.OK).body(saleRepository.findByDate(date));
        }

        /**
<<<<<<< Updated upstream
         * Caso nao seja nenhuma das opcoes acima, retorna uma lista vazia
=======
         * Caso não seja nenhuma das opcoes acima, retorna uma lista vazia
>>>>>>> Stashed changes
         */
        else {
            List<SaleModel> vazia = new ArrayList<>();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(vazia);
        }
    }
}
