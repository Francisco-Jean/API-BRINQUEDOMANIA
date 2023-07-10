package com.brinquedomania.api.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record SaleRecordDto(@NotNull UUID idClient,@NotBlank String paymentMethod) {
}
