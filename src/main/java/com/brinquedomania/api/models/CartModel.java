package com.brinquedomania.api.models;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Entity
@Table(name = "TB_CARTS")
public class CartModel implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(unique = true)
    private UUID idClient;

    @ElementCollection
    @CollectionTable(name = "PRODUCTS_CART")
    @MapKeyColumn(name = "idProduct")
    @Column(name = "quantity")
    private Map<UUID, Integer> products;

    private Float amount = 0F;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getIdClient() {
        return idClient;
    }

    public void setIdClient(UUID idClient) {
        this.idClient = idClient;
    }


    public Map<UUID, Integer> getIdsProducts() {
        return products;
    }

    public void setIdsProducts(Map<UUID, Integer> idsProducts) {
        this.products = idsProducts;
    }

    public Float getAmount() {
        return amount;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }

    public void addProduct(UUID id, int quantity) {
        if (products == null) {
            products = new HashMap<UUID, Integer>();
        }
        products.put(id, quantity);
    }

    public void clearCart() {
        this.products.clear();
    }
}
