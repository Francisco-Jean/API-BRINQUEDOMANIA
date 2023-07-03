package com.brinquedomania.api.models;

import jakarta.persistence.*;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

@Entity
@Table(name = "TB_PRODUCTS")
public class ProductModel implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    @Column(name = "ID_SELLER", nullable = false)
    private UUID idSeller;
    @Column(name = "CATEGORY", nullable = false)
    private String category;
    @Column(name = "DESCRIPTION", nullable = false)
    private String description;
    @Column(name = "VALUE", nullable = false)
    private Float value;
    @Column(name = "IMAGE", nullable = false)
    private String imageLink;

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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Float getValue() {
        return value;
    }

    public void setValue(Float value) {
        this.value = value;
    }

    public String getImageLink() {
        return imageLink;
    }

    public void setImageLink(String imageLink) {
        this.imageLink = imageLink;
    }
}
