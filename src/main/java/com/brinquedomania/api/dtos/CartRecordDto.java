package com.brinquedomania.api.dtos;

import jakarta.validation.constraints.NotNull;

import java.util.Map;
import java.util.UUID;

public record CartRecordDto(@NotNull UUID idClient, @NotNull Map<UUID, Integer> idsProducts) {

}
