package com.brinquedomania.api.models;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;
import java.util.UUID;

/**Classe que representa o MODEL da entidade usuario, onde sao definidos os seus atributos e metodos de criacao de acesso aos estados.
 */
@Entity
@Table(name = "TB_USERS")
public class UserModel implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    @Column(name = "TYPE", nullable = false)
    private String type;
    @Column(name = "EMAIL", nullable = false, unique = true)
    private String email;
    @Column(name = "PASSWORD", nullable = false)
    private String password;
    @Column(name = "NAME", nullable = false)
    private String name;
    @Column(name = "ADDRESS", nullable = false)
    private String address;
    @Column(name = "BIRTH_DATE", nullable = false)
    private Date birthDate;
    @Column(name = "IDENTIFIER", nullable = false, unique = true)
    private String identifier;


    /** retorna o id do usuario
     * @return UUID id
     */
    public UUID getId() {
        return id;
    }

    /**seta um novo id do usuario
     * @param id UUID
     */
    public void setId(UUID id) {
        this.id = id;
    }

    /**retorna o tipo do usuario (Seller, Client ou Manager)
     * @return String type
     */
    public String getType() {
        return type;
    }

    /**seta um novo tipo do usuario (Seller, Client ou Manager)
     * @param type String
     */
    public void setType(String type) {
        this.type = type;
    }

    /**retorna o email do usuario
     * @return String email
     */
    public String getEmail() {
        return email;
    }

    /**seta um novo email do usuario
     * @param email String
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**retorna a senha do usuario
     * @return String senha
     */
    public String getPassword() {
        return password;
    }

    /**seta uma nova senha do usuario
     * @param password String
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**retorna o nome do usuario
     * @return String nome
     */
    public String getName() {
        return name;
    }

    /**seta um novo nome do usuario
     * @param name String
     */
    public void setName(String name) {
        this.name = name;
    }

    /**retorna o endereco do usuario
     * @return String endereco
     */
    public String getAddress() {
        return address;
    }

    /**seta um novo endereco do usuario
     * @param address String
     */
    public void setAddress(String address) {
        this.address = address;
    }

    /**retorna a data de nascimento do usuario
     * @return Date birthDate
     */
    public Date getBirthDate() {
        return birthDate;
    }

    /**seta uma nova data de nascimento do usuario
     * @param birthDate Date
     */
    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    /**retorna o identificador do usuario (CPF)
     * @return String identifier
     */
    public String getIdentifier() {
        return identifier;
    }

    /**seta um novo identificador do usuario
     * @param identifier String
     */
    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }
}
