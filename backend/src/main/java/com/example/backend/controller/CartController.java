package com.example.backend.controller;

import com.example.backend.payload.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.backend.service.PaymentService;

@RestController
@RequestMapping("/pay")
public class CartController {
    @Autowired
    private PaymentService paymentService;

    @PostMapping("/initiate")
    public Object processCart(@RequestBody Payment payment) {
        try {
            paymentService.sendToCartTopic(payment);
            return ResponseEntity.status(HttpStatus.OK).body(payment);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


}
