package com.alarms.alarms.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.alarms.alarms.model.Stock100;
import com.alarms.alarms.service.alarmservice;

@RestController
@CrossOrigin(origins= "*" )
public class alarmController {

   @Autowired
    private alarmservice service;

    @GetMapping("/all")
    public List<Stock100> All(){
        return service.All();
    }

    
    @PostMapping("/rsi")
    public Double Rsi(@RequestBody String symbol ){
        return  service.getRsi(symbol);
    }

    @PostMapping("/rsiall")
    public List<Double> Rsiall(@RequestBody String symbol ){
         return service.getRSILIST(symbol);
    }

    @PostMapping("/bb")
    public String BB(@RequestBody String symbol){
        return String.format("%.2f", service.getBB(symbol));
    }
    @GetMapping("/alarms")
    public List<List<String>> alarmsallStocks(){
        return service.allRSI();
    }
    @GetMapping("/crossrsi")
    public List<List<String>> crossrsi(){

        return service.allcrossrsi();
    }


    @GetMapping("/updateallstock")
    public String updateall(){
        service.All().parallelStream()
        .forEach(element->{
            try {
                service.update100day(element.getStockSymbol());
            } catch (Exception e) {
                System.out.println("Errror"+element.getStockSymbol());
                System.out.println(e);
            }
        });
        
        return "Successfully updated all 100 days of stocks";
    }

    @GetMapping("/highbuy")
    public List<List<String>> highbuy(){
        return service.Highbuy();
    }

    

   

}
