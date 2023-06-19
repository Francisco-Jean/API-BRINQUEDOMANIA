package com.brinquedomania.api.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.util.Date;

public record UserRecordDto(@NotBlank String name, @Email String email,
                            @NotBlank String password, @NotBlank String identifier,
                            String address, Date birthDate, @NotBlank String type) {
}