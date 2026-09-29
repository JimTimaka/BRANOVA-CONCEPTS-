package com.branova.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(name = "enquiries")
public class Enquiry {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank @Column(nullable = false)
    private String name;

    private String phone;
    private String email;

    @NotBlank @Column(nullable = false, length = 2000)
    private String message;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Enquiry() {}

    @PrePersist
    void onCreate() { createdAt = LocalDateTime.now(); }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getPhone() { return phone; }
    public String getEmail() { return email; }
    public String getMessage() { return message; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setName(String name) { this.name = name; }
    public void setPhone(String phone) { this.phone = phone; }
    public void setEmail(String email) { this.email = email; }
    public void setMessage(String message) { this.message = message; }
}
