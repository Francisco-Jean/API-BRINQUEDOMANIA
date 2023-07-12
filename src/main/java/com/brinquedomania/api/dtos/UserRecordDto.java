package com.brinquedomania.api.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.util.Date;


/**Valida os dados de entrada do usuário, não permitindo que campos obrigatórios estejam vazios
 * @param name - not blank
 * @param email - email
 * @param password - not blank
 * @param identifier - not blank
 * @param address - não obrigatório
 * @param birthDate - não obrigatório
 * @param type - not blank
 */
public record UserRecordDto(@NotBlank String name, @Email String email,
                            @NotBlank String password, @NotBlank String identifier,
                            String address, Date birthDate, @NotBlank String type) {
}