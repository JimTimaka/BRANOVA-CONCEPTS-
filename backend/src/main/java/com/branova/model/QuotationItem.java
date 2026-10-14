package com.branova.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "quotation_items")
public class QuotationItem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Quotation quotation;

    @ManyToOne(optional = false)
    private Product product;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal unitPrice;

    protected QuotationItem() {}

    public QuotationItem(Quotation quotation, Product product, int quantity, BigDecimal unitPrice) {
        if (quantity <= 0) throw new IllegalArgumentException("Quantity must be greater than zero.");
        this.quotation = quotation;
        this.product = product;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
    }

    public BigDecimal calculateLineTotal() {
        return unitPrice.multiply(BigDecimal.valueOf(quantity));
    }

    public Long getId() { return id; }
    public Product getProduct() { return product; }
    public int getQuantity() { return quantity; }
    public BigDecimal getUnitPrice() { return unitPrice; }
}
