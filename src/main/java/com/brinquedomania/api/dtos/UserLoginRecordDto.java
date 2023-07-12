package com.brinquedomania.api.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/**Valida os dados de entrada do login do usuário, não permitindo que campos obrigatórios estejam vazios
 * @param email - email
 * @param password - not blank
 */
public record UserLoginRecordDto(@Email String email,
                            @NotBlank String password) {
}