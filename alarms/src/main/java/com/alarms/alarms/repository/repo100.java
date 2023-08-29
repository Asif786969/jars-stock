package com.alarms.alarms.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.alarms.alarms.model.Stock100;


public interface repo100 extends MongoRepository<Stock100,String> {
    Stock100 findBystockSymbol(String stock_symbol);
    
}
