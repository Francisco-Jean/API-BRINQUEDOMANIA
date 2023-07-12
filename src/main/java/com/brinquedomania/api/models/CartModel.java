package com.brinquedomania.api.models;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Classe que representa o MODEL da entidade cart (carrinho), onde sao definidos os seus atributos e metodos de criacao de acesso aos estados.
 */
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

    /**retorna o id do carrinho
     * @return UUID id
     */
    public UUID getId() {
        return id;
    }

    /**seta um novo id do carrinho
     * @param id UUID
     */
    public void setId(UUID id) {
        this.id = id;
    }

    /**retorna o id do cliente
     * @return UUID idClient
     */
    public UUID getIdClient() {
        return idClient;
    }

    /**seta um novo id do cliente
     * @param idClient UUID
     */
    public void setIdClient(UUID idClient) {
        this.idClient = idClient;
    }

    /**retorna os ids dos produtos do carrinho
     * @return Map<UUID, Integer> products
     */
    public Map<UUID, Integer> getIdsProducts() {
        return products;
    }

    /**seta os ids dos produtos do carrinho
     * @param idsProducts Map<UUID, Integer>
     */
    public void setIdsProducts(Map<UUID, Integer> idsProducts) {
        this.products = idsProducts;
    }

    /**retorna o valor total do carrinho
     * @return Float amount
     */
    public Float getAmount() {
        return amount;
    }

    /**seta um novo valor total do carrinho
     * @param amount Float
     */
    public void setAmount(Float amount) {
        this.amount = amount;
    }

    /**adiciona um produto ao carrinho
     * @param id UUID
     * @param quantity int
     */
    public void addProduct(UUID id, int quantity) {
        if (products == null) {
            products = new HashMap<UUID, Integer>();
        }
        products.put(id, quantity);
    }

    /**remove todos os produtos do carrinho
     *
     */
    public void clearCart() {
        this.products.clear();
    }
}
