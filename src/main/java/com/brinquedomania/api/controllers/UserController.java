package com.brinquedomania.api.controllers;

import com.brinquedomania.api.dtos.UserRecordDto;
import com.brinquedomania.api.models.UserModel;
import com.brinquedomania.api.repositories.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
public class UserController {

    @Autowired
    UserRepository userRepository;
    @PostMapping("/user/cliente/cadastro")
    public ResponseEntity<UserModel> saveUser(@RequestBody @Valid UserRecordDto userRecordDto) {
        var userModel = new UserModel();
        BeanUtils.copyProperties(userRecordDto, userModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(userRepository.save(userModel));
    }
    @GetMapping("/user/cliente/listAll")
    public ResponseEntity<List<UserModel>> getAllUsers() {
        return ResponseEntity.status(HttpStatus.OK).body(userRepository.findAll());
    }
    @GetMapping("/user/cliente/listOne/{identifier}")
    public ResponseEntity<Object> getOneUser(@PathVariable(value = "identifier") String identifier) {
         UserModel user0 = userRepository.findByIdentifier(identifier);
        if (user0 == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("usuário não encontrado");
        }
        return ResponseEntity.status(HttpStatus.OK).body(userRepository.findByIdentifier(identifier));
    }

    /*@PutMapping("/user/editar_cliente/{id}")
    public ResponseEntity<Object> updateUser(@PathVariable(value="id") UUID id,
                                             @RequestBody @Valid UserRecordDto userRecordDto) {
        Optional<UserModel> user0 = userRepository.findById(id);
        if(user0.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        var userModel = user0.get();
        BeanUtils.copyProperties(userRecordDto, userModel);
        return ResponseEntity.status(HttpStatus.OK).body(userRepository.save(userModel));
    }
    @DeleteMapping("/user/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable(value="id") UUID id) {
        Optional<UserModel> user0 = userRepository.findById(id);
        if(user0.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        userRepository.delete(user0.get());
        return ResponseEntity.status(HttpStatus.OK).body("User deleted successfully");
    }*/
}
