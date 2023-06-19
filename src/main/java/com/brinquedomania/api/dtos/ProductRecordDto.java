package com.brinquedomania.api.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ProductRecordDto(@NotNull long idSeller, @NotBlank String category, @NotBlank String description, @NotNull Float value,
                               @NotBlank String imageLink) {
}