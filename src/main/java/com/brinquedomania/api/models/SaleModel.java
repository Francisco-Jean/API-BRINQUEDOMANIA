package com.brinquedomania.api.models;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Classe que representa o MODEL da entidade sale (venda), onde sao definidos os seus atributos e metodos de criacao de acesso aos estados.
 */
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

    /**retorna o id da venda
     * @return UUID id
     */
    public UUID getId() {
        return id;
    }

    /**seta um novo id da venda
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
    public void setIdSeller(UUID idSeller) {this.idSeller = idSeller;}

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

    /**retorna o mapa de produtos da venda
     * @return Map<UUID, Integer> products
     */
    public Map<UUID, Integer> getProducts() {
        return products;
    }

    /**retorna o valor total da venda
     * @return amount Float
     */
    public Float getAmount() {
        return amount;
    }

    /**seta um novo valor total da venda
     * @param amount Float
     */
    public void setAmount(Float amount) {
        this.amount = amount;
    }

    /**retorna a data da venda
     * @return Date date
     */
    public Date getDate() {
        return date;
    }

    /**seta uma nova data da venda
     * @param date Date
     */
    public void setDate(Date date) {
        this.date = date;
    }

    /**retorna o metodo de pagamento da venda
     * @return String paymentMethod
     */
    public String getPaymentMethod() {
        return paymentMethod;
    }

    /**seta um novo metodo de pagamento da venda
     * @param paymentMethod String
     */
    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    /**adiciona um novo produto ao mapa de produtos da venda
     * @param id UUID (id do produto)
     * @param quantity int (quantidade do produto)
     */
    public void addProduct(UUID id, int quantity) {
        if (products == null) {
            products = new HashMap<UUID, Integer>();
        }
        products.put(id, quantity);
    }
}
