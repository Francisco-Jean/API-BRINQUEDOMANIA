package com.brinquedomania.api.repositories;

import com.brinquedomania.api.models.SaleModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


/**
 * Interface responsável por realizar as operações de CRUD da venda no banco de dados
 */
@Repository
public interface SaleRepository extends JpaRepository<SaleModel, UUID> {

    /**Metodo responsavel por buscar uma venda no banco de dados pelo seu id
     * @param id - id da venda
     * @return - Retorna a venda que possui o id passado como parametro
     */
    Optional<SaleModel> findById(UUID id);


    /**Metodo responsavel por buscar todas as vendas no banco de dados pelo id do vendedor
     * @param id - id do vendedor
     * @return - Retorna todas as venda que possuem o id do vendedor passado como parametro
     */
    List<SaleModel> findByIdSeller(UUID id);

    /**Metodo responsavel por buscar todas as vendas no banco de dados pelo id do cliente
     * @param id - id do cliente
     * @return - Retorna todas as vendas que possuem o id do cliente passado como parametro
     */
    List<SaleModel> findByIdClient(UUID id);

    /**Metodo responsavel por buscar todas as vendas no banco de dados pela data
     * @param date - data da venda
     * @return - Retorna todas as vendas que possuem a data passada como parametro
     */
    List<SaleModel> findByDate(Date date);
}
