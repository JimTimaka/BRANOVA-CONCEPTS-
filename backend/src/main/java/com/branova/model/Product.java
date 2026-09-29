package com.branova.model;

public abstract class Product {
    private final Long id;
    private String name;
    private String category;
    private double basePrice;

    protected Product(Long id, String name, String category, double basePrice) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.basePrice = basePrice;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getCategory() { return category; }
    public double getBasePrice() { return basePrice; }

    public void setName(String name) { this.name = name; }
    public void setCategory(String category) { this.category = category; }
    public void setBasePrice(double basePrice) { this.basePrice = basePrice; }

    public abstract double calculateUnitPrice();
}
