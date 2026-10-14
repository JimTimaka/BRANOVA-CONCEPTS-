package com.branova.model;

import org.junit.jupiter.api.Test;
import java.math.BigDecimal;
import static org.junit.jupiter.api.Assertions.assertEquals;

class QuotationTest {
    @Test
    void brandedProductIncludesBrandingCost() {
        Product notebook = new BrandedProduct("A5 Notebook", "Stationery",
                new BigDecimal("5000"), new BigDecimal("1500"));
        Customer customer = new Customer("Test Customer", "0700000000", "test@example.com");
        Quotation quotation = new Quotation(customer);
        quotation.addItem(notebook, 10);
        assertEquals(0, new BigDecimal("65000").compareTo(quotation.calculateTotal()));
    }

    @Test
    void generalSupplyUsesBasePrice() {
        Product chair = new GeneralSupply("Office Chair", "Office Supplies", new BigDecimal("250000"));
        Customer customer = new Customer("Test Customer", "0700000000", "test@example.com");
        Quotation quotation = new Quotation(customer);
        quotation.addItem(chair, 2);
        assertEquals(0, new BigDecimal("500000").compareTo(quotation.calculateTotal()));
    }
}
