package com.example.backend.service;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface StreamService {
    SseEmitter statusEmitter(String transactionId);
}
