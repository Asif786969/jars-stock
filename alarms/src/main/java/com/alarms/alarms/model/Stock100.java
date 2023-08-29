package com.alarms.alarms.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "stocks")
public class Stock100 {
    @Id 
    String stockID;
    String stockSymbol;
    String stockName;
    Double stockPrice;
    List<Double> stockOldClose= new ArrayList<>();
    List<Double> stockOldHigh= new ArrayList<>();
    List<Double> stockOldLow= new ArrayList<>();
    List<Double> stockOldOpen= new ArrayList<>();
    List<Long>volumes=new ArrayList<>();
    
}
