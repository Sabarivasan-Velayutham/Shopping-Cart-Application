package com.example.backend.payload;

import lombok.Data;

@Data
public class CartItem {
    private int quantity;
    private Item item;
}
