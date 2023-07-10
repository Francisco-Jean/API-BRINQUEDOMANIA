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
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class SaleController {

    @Autowired
    SaleRepository saleRepository;

    @Autowired
    CartRepository cartRepository;

    @Autowired
    ProductRepository productRepository;

    @PostMapping("sale/register")
    public ResponseEntity<Object> saveSale(@RequestBody @Valid SaleRecordDto saleRecordDto){
        SaleModel saleModel = new SaleModel();
        BeanUtils.copyProperties(saleRecordDto, saleModel);

        var cart = cartRepository.findByIdClient(saleModel.getIdClient());

        if (cart.isEmpty() || cart.get().getIdsProducts().isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Seu carrinho de compras está vazio. " +
                    "Adicione seus produtos nele para realizar a compra.");
        }

        saleModel.setAmount(cart.get().getAmount());

        UUID idSeller = productRepository.findById(cart.get().getIdsProducts().keySet().iterator().next()).get().getIdSeller();
        saleModel.setIdSeller(idSeller);
        LocalDate date = LocalDate.now();
        saleModel.setDate(java.sql.Date.valueOf(date));
        Map<UUID, Integer> products = cart.get().getIdsProducts();

        for (Map.Entry<UUID, Integer> entry : products.entrySet()) {
            UUID idProduct = entry.getKey();
            int quantidade = entry.getValue();

            saleModel.addProduct(idProduct, quantidade);
        }

        cart.get().clearCart();
        cart.get().setAmount(0.0F);
        cartRepository.save(cart.get());
        return ResponseEntity.status(HttpStatus.CREATED).body(saleRepository.save(saleModel));
    }

    @GetMapping("/sale/listAll")
    public ResponseEntity<List<SaleModel>> getAllSales() {
        return ResponseEntity.status(HttpStatus.OK).body(saleRepository.findAll());
    }

    @PostMapping("/sale/listBy")
    public ResponseEntity<List<SaleModel>> getSalesBy(@RequestBody Map<String, Object> request) throws ParseException {

        System.out.println(request.get("form"));

        if (((String) request.get("form")).equals("seller")){
            UUID id = UUID.fromString((String) request.get("value"));
            return ResponseEntity.status(HttpStatus.OK).body(saleRepository.findByIdSeller(id));

        }
        else if (((String) request.get("form")).equals("client")){
            UUID id = UUID.fromString((String) request.get("value"));
            return ResponseEntity.status(HttpStatus.OK).body(saleRepository.findByIdClient(id));
        }
        else if (((String) request.get("form")).equals("date")){

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date date = sdf.parse((String) request.get("value"));
            return ResponseEntity.status(HttpStatus.OK).body(saleRepository.findByDate(date));
        }
        else {
            List<SaleModel> vazia = new ArrayList<>();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(vazia);
        }
    }
}
