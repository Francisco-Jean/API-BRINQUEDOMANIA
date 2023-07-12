package com.brinquedomania.api.models;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.UUID;

/**
 * Classe que representa o MODEL da entidade produto, onde sao definidos os seus atributos e metodos de criacao de acesso aos estados.
 */
@Entity
@Table(name = "TB_PRODUCTS")
public class ProductModel implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    @Column(name = "ID_SELLER", nullable = false)
    private UUID idSeller;
    @Column(name = "NAME", nullable = false)
    private String name;
    @Column(name = "CATEGORY", nullable = false)
    private String category;
    @Column(name = "DESCRIPTION", nullable = false)
    private String description;
    @Column(name = "VALUE", nullable = false)
    private Float value;
    @Column(name = "IMAGE", nullable = false)
    private String imageLink;

    /**retorna o nome do produto
     * @return String name
     */
    public String getName() {
        return name;
    }
    
    /**seta um novo nome do produto
     * @param name String
     */
    public void setName(String name) {
        this.name = name;
    }

    /**retorna o id do produto
     * @return UUID id
     */
    public UUID getId() {
        return id;
    }

    /**seta um novo id do produto
     * @param id UUID
     */
    public void setId(UUID id) {
        this.id = id;
    }

    /**retorna o id do vendedor
     * @return UUID idSeller
     */
    public UUID getIdSeller() {
        return idSeller;
    }

    /**seta um novo id do vendedor
     * @param idSeller UUID
     */
    public void setIdSeller(UUID idSeller) {
        this.idSeller = idSeller;
    }

    /**retorna a categoria do produto
     * @return String category
     */
    public String getCategory() {
        return category;
    }

    /**seta uma nova categoria do produto
     * @param category String
     */
    public void setCategory(String category) {
        this.category = category;
    }

    /**retorna a descricao do produto
     * @return String description
     */
    public String getDescription() {
        return description;
    }

    /**seta uma nova descricao do produto
     * @param description String
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**retorna o valor do produto
     * @return Float value
     */
    public Float getValue() {
        return value;
    }

    /**seta um novo valor do produto
     * @param value Float
     */
    public void setValue(Float value) {
        this.value = value;
    }

    /**retorna o link da imagem do produto
     * @return String imageLink
     */
    public String getImageLink() {
        return imageLink;
    }

    /**seta um novo link da imagem do produto
     * @param imageLink String
     */
    public void setImageLink(String imageLink) {
        this.imageLink = imageLink;
    }
}
