package com.brinquedomania.api.repositories;

import com.brinquedomania.api.models.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<ProductModel, UUID> {
   /* ProductModel findByIdentifier(String identifier);
    Optional<ProductModel> findById(UUID id);*/
}
