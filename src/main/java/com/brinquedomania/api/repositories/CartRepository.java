package com.brinquedomania.api.repositories;

import com.brinquedomania.api.models.CartModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;


/**
 * Interface responsável por realizar as operações de CRUD do carrinho de compras no banco de dados
 */
@Repository
public interface CartRepository extends JpaRepository<CartModel, UUID> {

    /**
     * Método responsável por buscar um carrinho de compras pelo id do cliente
     * @param idClient id do cliente
     * @return Optional<CartModel>
     */
    Optional<CartModel> findByIdClient(UUID idClient);

}
