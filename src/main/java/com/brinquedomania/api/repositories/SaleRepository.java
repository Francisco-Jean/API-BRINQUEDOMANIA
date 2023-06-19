package com.brinquedomania.api.repositories;

import com.brinquedomania.api.models.SaleModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SaleRepository extends JpaRepository<SaleModel, UUID> {

}
