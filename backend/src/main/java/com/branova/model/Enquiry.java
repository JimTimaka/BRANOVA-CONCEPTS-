package com.branova.model;

import jakarta.validation.constraints.NotBlank;

public class Enquiry {
    @NotBlank private String name;
    private String phone;
    private String email;
    @NotBlank private String message;

    public Enquiry() {}

    public String getName() { return name; }
    public String getPhone() { return phone; }
    public String getEmail() { return email; }
    public String getMessage() { return message; }

    public void setName(String name) { this.name = name; }
    public void setPhone(String phone) { this.phone = phone; }
    public void setEmail(String email) { this.email = email; }
    public void setMessage(String message) { this.message = message; }
}
