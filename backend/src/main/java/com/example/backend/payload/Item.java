package com.example.backend.payload;

import lombok.Data;

@Data
public class Item {
    private int itemId;
    private double price;
    private String name;
}
