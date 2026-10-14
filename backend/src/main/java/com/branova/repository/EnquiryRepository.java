package com.branova.repository;
import com.branova.model.Enquiry;
import org.springframework.data.jpa.repository.JpaRepository;
public interface EnquiryRepository extends JpaRepository<Enquiry, Long> {}
