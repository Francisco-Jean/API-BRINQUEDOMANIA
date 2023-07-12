package com.brinquedomania.api.repositories;

import com.brinquedomania.api.models.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;


/**
 * Interface responsavel por realizar as operacoes de CRUD do produto no banco de dados
 */
@Repository
public interface ProductRepository extends JpaRepository<ProductModel, UUID> {

    /**
     * Metodo responsavel por buscar um produto pelo seu id
     * @param id id do produto
     * @return lista de produtos que possuem o id passado como parametro
     */
    Optional<ProductModel> findById(UUID id);
}
