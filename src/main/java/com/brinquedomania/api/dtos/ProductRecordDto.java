package com.brinquedomania.api.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

/**Valida os dados de entrada do registro de produto, não permitindo que campos obrigatórios estejam vazios
 * @param idSeller - not null
 * @param name - not blank
 * @param category - not blank
 * @param description - not blank
 * @param value - not null
 * @param imageLink - not blank
 */
public record ProductRecordDto(@NotNull UUID idSeller, @NotBlank String name, @NotBlank String category, @NotBlank String description, @NotNull Float value,
                               @NotBlank String imageLink) {
}