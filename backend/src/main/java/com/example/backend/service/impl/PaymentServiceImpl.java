package com.example.backend.service.impl;

import com.example.backend.payload.Payment;
import com.example.backend.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService {
    @Autowired
    private KafkaTemplate<String, Payment> kafkaTemplate;

    @Value("${kafka.topicName}")
    private String topic;

    public void sendToCartTopic(Payment payment) {
        // Generate a unique transaction ID
        String transactionId = String.valueOf(System.currentTimeMillis());
        payment.setTransactionId(transactionId);

        try {
            kafkaTemplate.send(topic, payment);
            payment.setStatus("in progress");
        } catch (Exception e) {
            payment.setStatus("failure");
        }
    }
}
