package com.brinquedomania.api.dtos;

import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public record SaleRecordDto(@NotNull UUID idSeller, @NotNull UUID idClient, @NotNull List<UUID> idsProducts,
                            @NotNull Float amount, @DateTimeFormat Date date) {
}
