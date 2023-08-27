package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import com.example.backend.service.StreamService;


@RestController
@RequestMapping("/pay")
public class StatusController {
    @Autowired
    private StreamService streamService;

    @GetMapping(value = "/status/{transactionId}", produces = "text/event-stream")
    public ResponseEntity<SseEmitter> processStatus(@PathVariable("transactionId") String transactionId) {
        SseEmitter emitter = streamService.statusEmitter(transactionId);
        return ResponseEntity.status(HttpStatus.OK).body(emitter);
    }
}
