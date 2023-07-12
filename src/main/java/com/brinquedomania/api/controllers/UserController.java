package com.brinquedomania.api.controllers;

import com.brinquedomania.api.dtos.UserRecordDto;
import com.brinquedomania.api.dtos.UserLoginRecordDto;
import com.brinquedomania.api.models.UserModel;
import com.brinquedomania.api.repositories.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Objects;


/**
 * Classe responsavel por implementar as rotas do CONTROLLER do usuario.
 */
@RestController
@CrossOrigin(origins = "*")
public class UserController {


    /**
     * Atributo responsavel por realizar as operacoes de CRUD do usuario no banco de dados
     */
    @Autowired
    UserRepository userRepository;

    /**
     * Metodo/Rota responsavel por realizar o login do usuario
     * @param userLoginRecordDto - DTO que contem os dados do usuario para realizar o login
     * @return - Retorna o usuario que realizou o login
     */
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody @Valid UserLoginRecordDto userLoginRecordDto){
        String email = userLoginRecordDto.email();
        String senha = userLoginRecordDto.password();
        UserModel user0 = userRepository.findByEmail(email);

        if (user0 == null || !Objects.equals(user0.getPassword(), senha)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("usuario nao encontrado");
        }
        return ResponseEntity.status(HttpStatus.OK).body(user0);
    }

    /**
     * Metodo/Rota responsavel por realizar o cadastro do usuario
     * @param userRecordDto - DTO que contem os dados do usuario para realizar o cadastro
     * @return - Retorna o usuario que foi cadastrado
     */
    @PostMapping("/user/register")
    public ResponseEntity<UserModel> saveUser(@RequestBody @Valid UserRecordDto userRecordDto) {
        var userModel = new UserModel();
        BeanUtils.copyProperties(userRecordDto, userModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(userRepository.save(userModel));
    }


    /**
     * Metodo/Rota responsavel por listar todos os usuarios cadastrados no banco de dados
     * @return - Retorna todos os usuarios cadastrados no banco de dados
     */
    @GetMapping("/user/listAll")
    public ResponseEntity<List<UserModel>> getAllUsers() {
        return ResponseEntity.status(HttpStatus.OK).body(userRepository.findAll());
    }

    /**
     * Metodo/Rota responsavel por listar um usuario cadastrado no banco de dados pelo seu identificador
     * @param identifier - Identificador do usuario
     * @return - Retorna o usuario que possui o identificador passado como parametro
     */
    @GetMapping("/user/listOne/{identifier}")
    public ResponseEntity<Object> getOneUser(@PathVariable(value = "identifier") String identifier) {
        UserModel user0 = userRepository.findByIdentifier(identifier);
        if (user0 == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("usuario nao encontrado");
        }
        return ResponseEntity.status(HttpStatus.OK).body(userRepository.findByIdentifier(identifier));
    }

    /**
     * Metodo/Rota responsavel por atualizar um usuario cadastrado no banco de dados pelo seu identificador
     * @param identifier - Identificador do usuario
     * @param userRecordDto - DTO que contem os dados do usuario para realizar a atualizacao
     * @return - Retorna o usuario que foi atualizado
     */
    @PutMapping("/user/edit/{identifier}")
    public ResponseEntity<Object> updateUser(@PathVariable(value="identifier") String identifier,
                                             @RequestBody @Valid UserRecordDto userRecordDto) {
        UserModel user0 = userRepository.findByIdentifier(identifier);
        if(user0 == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario nao encontrado.");
        }
        var userModel = userRepository.findByIdentifier(identifier);
        BeanUtils.copyProperties(userRecordDto, userModel);
        return ResponseEntity.status(HttpStatus.OK).body(userRepository.save(userModel));
    }

    /**
     * Metodo/Rota responsavel por deletar um usuario cadastrado no banco de dados pelo seu identificador
     * @param identifier - Identificador do usuario
     * @return - Retorna uma mensagem de sucesso ou erro
     */
    @DeleteMapping("/user/delete/{identifier}")
    public ResponseEntity<Object> deleteUser(@PathVariable(value="identifier") String identifier) {
        UserModel user0 = userRepository.findByIdentifier(identifier);
        if(user0 == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario nao encontrado.");
        }
        userRepository.delete(userRepository.findByIdentifier(identifier));
        return ResponseEntity.status(HttpStatus.OK).body("Usuario deletado com sucesso.");
    }

    /**
     * Metodo/Rota responsavel por listar todos os usuarios cadastrados no banco de dados pelo seu tipo
     * @param type - Tipo do usuario
     * @return - Retorna todos os usuarios que possuem o tipo passado como parametro
     */
    @GetMapping("/user/listByType/{type}")
    public ResponseEntity<List<UserModel>> getUserByType(@PathVariable(value = "type") String type) {
        List<UserModel> list = userRepository.findByType(type);

        return ResponseEntity.status(HttpStatus.OK).body(list);
    }
}
