package com.branova.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

class QuotationTest {
    @Test
    void brandedProductIncludesBrandingCost() {
        Product notebook = new BrandedProduct(1L, "A5 Notebook", "Stationery", 5000, 1500);
        Quotation quotation = new Quotation(notebook, 10);
        assertEquals(65000, quotation.calculateTotal());
    }

    @Test
    void generalSupplyUsesBasePrice() {
        Product chair = new GeneralSupply(2L, "Office Chair", "Office Supplies", 250000);
        Quotation quotation = new Quotation(chair, 2);
        assertEquals(500000, quotation.calculateTotal());
    }
}
