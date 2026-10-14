package com.branova.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "quotations")
public class Quotation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Customer customer;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "quotation", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<QuotationItem> items = new ArrayList<>();

    public Quotation() {}

    public Quotation(Customer customer) { this.customer = customer; }

    @PrePersist
    void onCreate() { createdAt = LocalDateTime.now(); }

    public void addItem(Product product, int quantity) {
        items.add(new QuotationItem(this, product, quantity, product.calculateUnitPrice()));
    }

    public BigDecimal calculateTotal() {
        return items.stream().map(QuotationItem::calculateLineTotal).reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public Long getId() { return id; }
    public Customer getCustomer() { return customer; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public List<QuotationItem> getItems() { return items; }
    public void setCustomer(Customer customer) { this.customer = customer; }
}
