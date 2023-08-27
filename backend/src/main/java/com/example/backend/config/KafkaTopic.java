package com.example.backend.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopic {

    @Value("${kafka.topicName}")
    private String topic;

    @Bean
    public NewTopic cartTopic() {
        return TopicBuilder.name(topic).partitions(1).replicas(1).build();
    }

}
