package com.branova.model;

public class Quotation {
    private final Product product;
    private final int quantity;

    public Quotation(Product product, int quantity) {
        if (quantity <= 0) throw new IllegalArgumentException("Quantity must be greater than zero.");
        this.product = product;
        this.quantity = quantity;
    }

    public Product getProduct() { return product; }
    public int getQuantity() { return quantity; }

    public double calculateTotal() {
        return product.calculateUnitPrice() * quantity;
    }
}
