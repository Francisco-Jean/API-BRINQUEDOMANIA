package com.brinquedomania.api.repositories;

import com.brinquedomania.api.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


/**
 * Interface responsavel por realizar as operacoes de CRUD do usuario no banco de dados
 */
@Repository
public interface UserRepository extends JpaRepository<UserModel, UUID> {


     /**Metodo responsavel por buscar um usuario no banco de dados pelo seu identificador
      * @param identifier Identificador do usuario
      * @return - Retorna o usuario que possui o identificador passado como parametro
      */
     UserModel findByIdentifier(String identifier);

        /**Metodo responsavel por buscar um usuario no banco de dados pelo seu id
        * @param id id do usuario
        * @return Retorna o usuario que possui o id passado como parametro
        */
     Optional<UserModel> findById(UUID id);

        /**Metodo responsavel por buscar um usuario no banco de dados pelo seu username
        * @param username username do usuario
        * @return Retorna o usuario que possui o username passado como parametro
        */
     UserModel findByEmail(String username);

        /**Metodo responsavel por buscar um usuario no banco de dados pelo seu tipo
        * @param Type tipo do usuario (Seller, Client ou User)
        * @return Retorna o usuario que possui o tipo passado como parametro
        */
     List<UserModel> findByType(String Type);
}
