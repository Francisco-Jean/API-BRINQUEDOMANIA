package com.brinquedomania.api.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserLoginRecordDto(@Email String email,
                            @NotBlank String password) {
                            }