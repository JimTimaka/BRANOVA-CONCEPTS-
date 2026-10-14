package com.branova.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@DiscriminatorValue("GENERAL")
public class GeneralSupply extends Product {
    protected GeneralSupply() {}

    public GeneralSupply(String name, String category, BigDecimal basePrice) {
        super(name, category, basePrice);
    }

    @Override
    public BigDecimal calculateUnitPrice() {
        return getBasePrice();
    }
}
