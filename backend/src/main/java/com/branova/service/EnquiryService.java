package com.branova.service;

import com.branova.model.Enquiry;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class EnquiryService {
    private final List<Enquiry> enquiries = new ArrayList<>();

    public Enquiry save(Enquiry enquiry) {
        enquiries.add(enquiry);
        return enquiry;
    }

    public List<Enquiry> findAll() {
        return Collections.unmodifiableList(enquiries);
    }
}
