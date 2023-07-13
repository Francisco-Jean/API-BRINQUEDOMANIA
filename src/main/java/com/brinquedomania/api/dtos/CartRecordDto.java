package com.brinquedomania.api.dtos;

import jakarta.validation.constraints.NotNull;

import java.util.Map;
import java.util.UUID;

<<<<<<< Updated upstream
/**Valida os dados de entrada do registro de carrinho, nao permitindo que campos obrigatorios estejam vazios
=======
/**Valida os dados de entrada do registro de carrinho, nao permitindo que campos obrigatórios estejam vazios
>>>>>>> Stashed changes
 * @param idClient - not null
 * @param idsProducts - not null
 */
public record CartRecordDto(@NotNull UUID idClient, @NotNull Map<UUID, Integer> idsProducts) {

}
