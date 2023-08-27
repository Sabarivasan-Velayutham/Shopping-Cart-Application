package com.example.backend.payload;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "payments") // Specify the collection name
public class Payment {
    private CartItem[] cartItem;
    private int totalQuantity;
    private double total;

    private String status;

    @Id
    private String transactionId;

    private String merchantId;
    private String gatewayId;
    private String taxId;

}
