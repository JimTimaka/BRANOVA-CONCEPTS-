package com.branova.repository;
import com.branova.model.Quotation;
import org.springframework.data.jpa.repository.JpaRepository;
public interface QuotationRepository extends JpaRepository<Quotation, Long> {}
