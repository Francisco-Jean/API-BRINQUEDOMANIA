package com.brinquedomania.api.models;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
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
    @CollectionTable(name = "PRODUCTS", joinColumns = @JoinColumn(name = "id"))
    private List<UUID> idsProducts;

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

    public List<UUID> getIdsProducts() {
        return idsProducts;
    }

    public void setIdsProducts(List<UUID> idsProducts) {
        this.idsProducts = idsProducts;
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
}
