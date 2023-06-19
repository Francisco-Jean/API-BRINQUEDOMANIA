package com.brinquedomania.api.controllers;

import com.brinquedomania.api.dtos.SaleRecordDto;
import com.brinquedomania.api.models.SaleModel;
import com.brinquedomania.api.repositories.SaleRepository;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class SaleController {

    @Autowired
    SaleRepository saleRepository;

    @PostMapping("sale/register")
    public ResponseEntity<Object> saveSale(@RequestBody @Valid SaleRecordDto saleRecordDto){
        var saleModel = new SaleModel();
        BeanUtils.copyProperties(saleRecordDto, saleModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(saleRepository.save(saleModel));
    }

    @GetMapping("/sale/listAll")
    public ResponseEntity<List<SaleModel>> getAllSales() {
        return ResponseEntity.status(HttpStatus.OK).body(saleRepository.findAll());
    }

    /*
    @GetMapping("/sale/listByIdSale/{idSeller}")
    public ResponseEntity<List<SaleModel>> getSalesByIdSeller(){

    }*/
}
