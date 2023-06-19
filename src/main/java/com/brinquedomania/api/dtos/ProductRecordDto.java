package com.brinquedomania.api.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record ProductRecordDto(@NotNull UUID idSeller, @NotBlank String category, @NotBlank String description, @NotNull Float value,
                               @NotBlank String imageLink) {
}