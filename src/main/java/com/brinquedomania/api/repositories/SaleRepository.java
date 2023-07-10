package com.brinquedomania.api.repositories;

import com.brinquedomania.api.models.SaleModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SaleRepository extends JpaRepository<SaleModel, UUID> {
    Optional<SaleModel> findById(UUID id);
    List<SaleModel> findByIdSeller(UUID id);
    List<SaleModel> findByIdClient(UUID id);
    List<SaleModel> findByDate(Date date);
}
