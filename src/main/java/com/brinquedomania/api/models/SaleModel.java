package com.brinquedomania.api.models;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Entity
@Table(name = "TB_SALES")
public class SaleModel implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private UUID idSeller;
    private UUID idClient;
    private Float amount;
    private Date date;

    @ElementCollection
    @CollectionTable(name = "PRODUCTS_SALE")
    @MapKeyColumn(name = "idProduct")
    @Column(name = "quantity")
    private Map<UUID, Integer> products;

    private String paymentMethod;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getIdSeller() {
        return idSeller;
    }

    public void setIdSeller(UUID idSeller) {
        this.idSeller = idSeller;
    }

    public UUID getIdClient() {
        return idClient;
    }

    public void setIdClient(UUID idClient) {
        this.idClient = idClient;
    }

    public Map<UUID, Integer> getProducts() {
        return products;
    }

    public Float getAmount() {
        return amount;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public void addProduct(UUID id, int quantity) {
        if (products == null) {
            products = new HashMap<UUID, Integer>();
        }
        products.put(id, quantity);
    }
}
