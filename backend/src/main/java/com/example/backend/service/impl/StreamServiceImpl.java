package com.example.backend.service.impl;

import com.example.backend.payload.Payment;
import com.example.backend.repository.CartRepository;
import com.example.backend.service.StreamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.async.AsyncRequestTimeoutException;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

@Service
public class StreamServiceImpl implements StreamService {
    @Autowired
    private CartRepository cartRepository;
    @Value("${maxRetries}")
    private int maxRetries;
    @Value("${retryIntervalMillis}")
    private int retryIntervalMillis;

    public SseEmitter statusEmitter(String transactionId) {
        int retries=0;

        SseEmitter emitter = new SseEmitter();

        while (retries < maxRetries) {

            try {
                Payment newEntry = cartRepository.findNewEntry(transactionId);
                System.out.println("payment entry : " + newEntry);
                if (newEntry != null) {
                    retries = maxRetries;
                    Thread.sleep(2000);

                    String status = newEntry.getStatus();
                    System.out.println("New Entry -> " + newEntry.getTransactionId() + " : " + status);
                    emitter.send(status);
                } else {
                    Thread.sleep(retryIntervalMillis);
                    retries++;
                }
            } catch (IOException e) {
                e.printStackTrace();
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            } catch (AsyncRequestTimeoutException ignored) {
            }
        }
        return emitter;
    }
}
