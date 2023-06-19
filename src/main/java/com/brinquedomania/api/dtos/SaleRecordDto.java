package com.brinquedomania.api.dtos;

import jakarta.validation.constraints.NotNull;

import java.util.Date;
import java.util.List;

public record SaleRecordDto(@NotNull Long idSeller, @NotNull Long idClient,@NotNull List<Long> idsProducts,
                            @NotNull Float amount, Date date) {
}
