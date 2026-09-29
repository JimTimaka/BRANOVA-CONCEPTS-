package com.branova.model;

public class BrandedProduct extends Product {
    private double brandingCost;

    public BrandedProduct(Long id, String name, String category, double basePrice, double brandingCost) {
        super(id, name, category, basePrice);
        this.brandingCost = brandingCost;
    }

    public double getBrandingCost() { return brandingCost; }
    public void setBrandingCost(double brandingCost) { this.brandingCost = brandingCost; }

    @Override
    public double calculateUnitPrice() {
        return getBasePrice() + brandingCost;
    }
}
