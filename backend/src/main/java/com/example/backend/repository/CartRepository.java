package com.example.backend.repository;

import com.example.backend.payload.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface CartRepository extends MongoRepository<Payment, String> {
    // Define additional methods for specific query needs, if any

    @Query("{ 'transactionId' : ?0 }")
    public Payment findNewEntry(String transactionId);

}
