package com.brinquedomania.api.repositories;

import com.brinquedomania.api.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Long> {
     UserModel findByIdentifier(String identifier);

     Optional<UserModel> findById(long id);

     UserModel findByEmail(String username);
}
