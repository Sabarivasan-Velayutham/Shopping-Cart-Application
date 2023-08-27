package com.example.backend.service.impl;

import com.example.backend.controller.StatusController;
import com.example.backend.payload.Payment;
import com.example.backend.repository.CartRepository;
import com.example.backend.service.ConsumerService;
import com.example.backend.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class ConsumerServiceImpl implements ConsumerService {

    @Autowired
    private CartRepository cartRepository;

    @KafkaListener(topics = "${kafka.topicName}", groupId = "${kafka.groupID}")
    public void consumeCart(Payment payment) {
        String status = (payment.getTotal() > 1000) ? "failure" : "success";
        payment.setStatus(status);

        try {
            cartRepository.save(payment);
            System.out.println("Cart inserted into MongoDB: " + payment.toString());

        } catch (Exception e) {
        }
    }
}
