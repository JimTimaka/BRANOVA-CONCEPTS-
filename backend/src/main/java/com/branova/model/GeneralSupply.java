package com.branova.model;

public class GeneralSupply extends Product {
    public GeneralSupply(Long id, String name, String category, double basePrice) {
        super(id, name, category, basePrice);
    }

    @Override
    public double calculateUnitPrice() {
        return getBasePrice();
    }
}
