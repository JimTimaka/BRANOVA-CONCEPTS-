package com.branova.controller;

import com.branova.model.Enquiry;
import com.branova.service.EnquiryService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "${branova.frontend-url}")
public class ApiController {
    private final EnquiryService enquiryService;

    public ApiController(EnquiryService enquiryService) {
        this.enquiryService = enquiryService;
    }

    @GetMapping("/health")
    public Map<String, Object> health() {
        return Map.of("ok", true, "business", "Branova Concepts Uganda Ltd", "message", "Branova Java API is running");
    }

    @GetMapping("/services")
    public List<Map<String, String>> services() {
        return List.of(
            Map.of("name", "Sourcing", "description", "Product and supply sourcing for businesses and organisations."),
            Map.of("name", "Branding", "description", "Branding, printing and promotional production."),
            Map.of("name", "Supply", "description", "Branded and non-branded corporate and general supplies.")
        );
    }

    /** Public product metadata. Prices are quoted per brief, so fixed prices are not published. */
    @GetMapping("/catalog")
    public List<Map<String, String>> catalog() {
        return List.of(
            product("business-cards", "Business cards", "Printing", "Professional cards with your choice of stock and finish.", "assets/images/products/business-cards.jpg"),
            product("flyers-brochures", "Flyers & brochures", "Printing", "Promote services, products, campaigns and events.", "assets/images/products/flyers-brochures.jpg"),
            product("large-format-printing", "Large-format printing", "Printing", "Large visual prints for indoor and outdoor use.", "assets/images/products/large-format-printing.jpg"),
            product("pullup-banners", "Pull-up banners", "Branding", "Portable display systems for events and promotions.", "assets/images/products/pullup-banners.jpg"),
            product("vinyl-banners-signage", "Vinyl banners & signage", "Branding", "Custom banners, signs and branded display graphics.", "assets/images/products/vinyl-banners-signage.jpg"),
            product("event-backdrops", "Event backdrops", "Branding", "Branded backgrounds for conferences, launches and events.", "assets/images/products/event-backdrops.jpg"),
            product("vehicle-branding", "Vehicle branding", "Branding", "Turn company vehicles into moving brand visibility.", "assets/images/products/vehicle-branding.jpg"),
            product("branded-pens", "Branded pens", "Promotional", "Useful promotional items for teams, clients and events.", "assets/images/products/branded-pens.jpg"),
            product("mugs", "Branded mugs", "Promotional", "Custom mugs for corporate gifts and campaigns.", "assets/images/products/mugs.jpg"),
            product("tshirts-apparel", "T-shirts & apparel", "Promotional", "Branded wear for staff, teams, events and merchandise.", "assets/images/products/tshirts-apparel.jpg"),
            product("branded-umbrellas", "Branded umbrellas", "Promotional", "Practical branded merchandise for all-weather visibility.", "assets/images/products/branded-umbrellas.jpg"),
            product("corporate-gifts", "Corporate gifts", "Promotional", "Gift sets and promotional merchandise.", "assets/images/products/corporate-gifts.jpg"),
            product("notebooks-diaries", "Notebooks & diaries", "Stationery", "Branded notebooks, diaries and writing materials.", "assets/images/products/notebooks-diaries.jpg"),
            product("stamps-office-supplies", "Stamps & office supplies", "Stationery", "Everyday stationery and office essentials.", "assets/images/products/stamps-office-supplies.jpg"),
            product("packaging-labels", "Packaging & labels", "Packaging", "Labels, stickers and packaging to present your product.", "assets/images/products/packaging-labels.jpg"),
            product("general-supplies", "General supplies", "General Supplies", "Branded or non-branded products sourced to your brief.", "assets/images/products/corporate-gifts.jpg")
        );
    }

    private Map<String, String> product(String id, String name, String category, String description, String image) {
        return Map.of("id", id, "name", name, "category", category, "description", description, "image", image, "price", "Quote on request");
    }

    @PostMapping("/enquiries")
    @ResponseStatus(HttpStatus.CREATED)
    public Enquiry createEnquiry(@Valid @RequestBody Enquiry enquiry) {
        return enquiryService.save(enquiry);
    }
}