package com.brinquedomania.api.repositories;

import com.brinquedomania.api.models.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;


/**
 * Interface responsável por realizar as operações de CRUD do produto no banco de dados
 */
@Repository
public interface ProductRepository extends JpaRepository<ProductModel, UUID> {

    /**
     * Método responsável por buscar um produto pelo seu id
     * @param id id do produto
     * @return
     */
    Optional<ProductModel> findById(UUID id);
}
