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

    @PostMapping("/enquiries")
    @ResponseStatus(HttpStatus.CREATED)
    public Enquiry createEnquiry(@Valid @RequestBody Enquiry enquiry) {
        return enquiryService.save(enquiry);
    }
}
