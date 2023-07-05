package com.brinquedomania.api.repositories;

import com.brinquedomania.api.models.CartModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CartRepository extends JpaRepository<CartModel, UUID> {
    Optional<CartModel> findByIdClient(UUID idClient);

}
