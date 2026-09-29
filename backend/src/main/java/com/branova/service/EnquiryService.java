package com.branova.service;

import com.branova.model.Enquiry;
import com.branova.repository.EnquiryRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EnquiryService {
    private final EnquiryRepository enquiryRepository;

    public EnquiryService(EnquiryRepository enquiryRepository) {
        this.enquiryRepository = enquiryRepository;
    }

    public Enquiry save(Enquiry enquiry) { return enquiryRepository.save(enquiry); }
    public List<Enquiry> findAll() { return enquiryRepository.findAll(); }
}
