package com.brinquedomania.api.dtos;

import jakarta.validation.constraints.NotBlank;

public record ProductRecordDto(@NotBlank String category, @NotBlank String description, @NotBlank Float value,
                               @NotBlank String image) {
}