package com.branova.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@DiscriminatorValue("BRANDED")
public class BrandedProduct extends Product {
    @Column(precision = 15, scale = 2)
    private BigDecimal brandingCost = BigDecimal.ZERO;

    protected BrandedProduct() {}

    public BrandedProduct(String name, String category, BigDecimal basePrice, BigDecimal brandingCost) {
        super(name, category, basePrice);
        this.brandingCost = brandingCost;
    }

    public BigDecimal getBrandingCost() { return brandingCost; }
    public void setBrandingCost(BigDecimal brandingCost) { this.brandingCost = brandingCost; }

    @Override
    public BigDecimal calculateUnitPrice() {
        return getBasePrice().add(brandingCost == null ? BigDecimal.ZERO : brandingCost);
    }
}
