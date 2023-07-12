package com.brinquedomania.api.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

/**Valida os dados de entrada do registro de venda, nao permitindo que campos obrigatorios estejam vazios
 * @param idClient - not null
 * @param paymentMethod - not blank
 */
public record SaleRecordDto(@NotNull UUID idClient,@NotBlank String paymentMethod) {
}
