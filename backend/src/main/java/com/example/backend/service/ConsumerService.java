package com.example.backend.service;

import com.example.backend.payload.Payment;

public interface ConsumerService {
    void consumeCart(Payment payment);
}
