package com.example.backend.service;

import com.example.backend.payload.Payment;

public interface PaymentService {
    void sendToCartTopic(Payment payment);
}
