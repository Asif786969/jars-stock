package com.alarms.alarms.service;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alarms.alarms.model.Stock100;

import com.alarms.alarms.repository.repo100;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

@Service
public class alarmservice {
   

    @Autowired
    private repo100 repository100;

    public List<Stock100> All(){
        return repository100.findAll();
    }

    public Double RSI_corrected(List<Double> prices){
        List<Double> gains = new ArrayList<>();
        List<Double> losses = new ArrayList<>();
        
        for (int i = 0; i < 99; i++) {
            Double diff = prices.get(i) - prices.get(i + 1);
            if (diff > 0) {
                gains.add(diff);
                losses.add(0.0);
            } else {
                gains.add(0.0);
                losses.add(-diff);
            }
        }
        Double lastavgGain = calculateAverage(gains.subList(85, 99), 14);
        Double lastavgLoss = calculateAverage(losses.subList(85, 99), 14);

        for (int i = 84; i >= 0; i--) {
            lastavgGain = (13 * lastavgGain + gains.get(i)) / 14;
            lastavgLoss = (13 * lastavgLoss + losses.get(i)) / 14;
        }

        Double rs = lastavgGain / lastavgLoss;
        Double rsi = 100 * rs / (1 + rs);

        return rsi;
    }
    public List<Double> RSI_AVG14(List<Double> prices){
        List<Double> gains = new ArrayList<>();
        List<Double> losses = new ArrayList<>();
        
        for (int i = 0; i < 99; i++) {
            Double diff = prices.get(i) - prices.get(i + 1);
            if (diff > 0) {
                gains.add(diff);
                losses.add(0.0);
            } else {
                gains.add(0.0);
                losses.add(-diff);
            }
        }
        Double lastavgGain = calculateAverage(gains.subList(85, 99), 14);
        Double lastavgLoss = calculateAverage(losses.subList(85, 99), 14);

        List<Double> rsiList= new ArrayList<>();
        for (int i = 84; i >= 0; i--) {
            lastavgGain = (13 * lastavgGain + gains.get(i)) / 14;
            lastavgLoss = (13 * lastavgLoss + losses.get(i)) / 14;
            Double rs = lastavgGain / lastavgLoss;
            rsiList.add(100 * rs / (1 + rs));
        }
        Double latestrsi=rsiList.get(rsiList.size()-1);
        Double secondrsi=rsiList.get(rsiList.size()-2);
        Collections.reverse(rsiList);
        Double latestavg =calculateAverage(rsiList.subList(0, 14), 14);
        Double onedayoldavg=calculateAverage(rsiList.subList(1, 15), 14);
        List<Double> x=new ArrayList<>();

        x.add(latestrsi);
        x.add(secondrsi);
        x.add(latestavg);
        x.add(onedayoldavg);
        return x;      
    }
    public List<Double> getRSILIST(String symbol){
        Stock100 currStock = repository100.findBystockSymbol(symbol);
        List<Double> Prices=currStock.getStockOldClose();
        Prices.set(0, currStock.getStockPrice());
        return RSI_AVG14(Prices);
    }

    public Double getRsi(String symbol){
        Stock100 currStock = repository100.findBystockSymbol(symbol);
        List<Double> Prices=currStock.getStockOldClose();
        Prices.set(0, currStock.getStockPrice());
        return RSI_corrected(Prices);
    }

    private static Double calculateAverage(List<Double> data, int period) {
        Double sum = 0.0;
        for (Double value : data) {
            sum += value;
        }
        return sum / period;
    }

    public Double getbbold1(String symbol){
        Stock100 currStock100=repository100.findBystockSymbol(symbol);
        List<Double> Prices=currStock100.getStockOldClose().subList(1, 21);
        return BB_corrected(Prices);
    }

    public  List<List<String>> allRSI(){
        List<List<String>> alarms=new ArrayList<>();
        All().parallelStream().  
        forEach(ele->{
            Double rsi=getRsi(ele.getStockSymbol());
            if(rsi<30.0){
                List<String> temp=new ArrayList<>();
                temp.add(ele.getStockName());
                temp.add(ele.getStockSymbol());
                temp.add(ele.getStockPrice()+"");
                temp.add(String.format("%.2f", rsi));
                alarms.add(temp);
                
            }
        });

        return alarms;
    }

    public List<List<String>> Highbuy(){
        List<List<String>> highsalarms=new ArrayList<>();

        All().parallelStream().  
        forEach(ele->{
            Double rsi=getRsi(ele.getStockSymbol());
            Double bb=getBB(ele.getStockSymbol());
            Double bb1=getbbold1(ele.getStockSymbol());
            Double rsi1old=getRSILIST(ele.getStockSymbol()).get(1);

            if(rsi>60.0 && rsi1old<60 && bb1<1.0 && bb>1.0){
                List<String> temp=new ArrayList<>();
                temp.add(ele.getStockName());
                temp.add(ele.getStockSymbol());
                temp.add(ele.getStockPrice()+"");
                temp.add(String.format("%.2f", rsi));
                highsalarms.add(temp);
                
            }
        });
        return highsalarms;
    }
    
    public Double BB_corrected(List<Double> Prices){
        Double movingavg = 0.0;
        Double deviation = 0.0;
        Double sd = 0.0;
        
        for(Double price:Prices){
            movingavg+=price;
        }
        movingavg/=20.0;
        for(Double price:Prices){
            deviation+=(price-movingavg)*(price-movingavg);
        }
        deviation/=20.0;
        sd=Math.sqrt(deviation);
        return (Prices.get(0)+2*sd-movingavg)/(4*sd);



    }
    public Double getBB(String symbol){
        Stock100 currStock100=repository100.findBystockSymbol(symbol);
        List<Double> Prices=currStock100.getStockOldClose().subList(0, 20);
        Prices.set(0,currStock100.getStockPrice());
        return BB_corrected(Prices);
    }
    
    public List<Double> getcrossrsi(String symbol) {
        Stock100 currStock100=repository100.findBystockSymbol(symbol);
        List<Double> Prices=currStock100.getStockOldClose();
        Prices.set(0,currStock100.getStockPrice());
        return RSI_AVG14(Prices);
    }

    public List<List<String>> allcrossrsi(){
        List<List<String>> crossrsi=new ArrayList<>();

        All().parallelStream().  
        forEach(ele->{
            List<Double> x=getcrossrsi(ele.getStockSymbol());
            Double latestrsi=x.get(0);
            Double onedayoldrsi=x.get(1);
            Double latestavg=x.get(2);
            Double onedayoldavg=x.get(3);
            if(latestrsi>latestavg && onedayoldrsi<onedayoldavg){
                List<String> temp=new ArrayList<>();
                temp.add(ele.getStockName());
                temp.add(ele.getStockSymbol());
                temp.add(ele.getStockPrice()+"");
                temp.add(String.format("%.2f", latestrsi));
                crossrsi.add(temp);
                
            }
        });
        return crossrsi;
    }


    public void update100day(String symbol) throws Exception{
        URL url = new URL("https://query1.finance.yahoo.com/v8/finance/chart/"+symbol+"?region=US&lang=en-US&includePrePost=false&interval=1d&useYfid=true&range=100d&corsDomain=finance.yahoo.com&.tsrc=finance");
       
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            InputStream inputStream = connection.getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));

            StringBuilder response = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }

            Gson gson = new GsonBuilder().setPrettyPrinting().create();

            Object json = gson.fromJson(response.toString(), Object.class);
            String formattedJson = gson.toJson(json);
        

            ObjectMapper objectMapper = new ObjectMapper();

            // Parse JSON string into a JsonNode object
            JsonNode jsonNode = objectMapper.readTree(formattedJson);

            
            JsonNode volumes=jsonNode.path("chart").path("result").get(0).path("indicators").path("quote").get(0).path("volume");
            JsonNode highs=jsonNode.path("chart").path("result").get(0).path("indicators").path("quote").get(0).path("high");
            JsonNode lows=jsonNode.path("chart").path("result").get(0).path("indicators").path("quote").get(0).path("low");
            JsonNode opens=jsonNode.path("chart").path("result").get(0).path("indicators").path("quote").get(0).path("open");
            JsonNode closes=jsonNode.path("chart").path("result").get(0).path("indicators").path("quote").get(0).path("close");


            List<Long> voluemeList=new ArrayList<>();
            for(JsonNode volume:volumes){
            voluemeList.add(volume.longValue());
            }

            List<Double> highList=new ArrayList<>();
            for(JsonNode high:highs){
            highList.add(high.doubleValue());
            }

            List<Double> lowList=new ArrayList<>();
            for(JsonNode low:lows){
                lowList.add(low.doubleValue());
            }
            
            List<Double> openList=new ArrayList<>();
            for(JsonNode open:opens){
                openList.add(open.doubleValue());
            }
            List<Double> closeList=new ArrayList<>();
            for(JsonNode close:closes){
                closeList.add(close.doubleValue());
            }

            Collections.reverse(closeList);       
            Collections.reverse(openList);
            Collections.reverse(lowList);
            Collections.reverse(highList);
            Collections.reverse(voluemeList);    

            Stock100 existing_stock=repository100.findBystockSymbol(symbol);
            existing_stock.setStockOldOpen(openList);
            existing_stock.setStockOldClose(closeList);
            existing_stock.setStockOldLow(lowList);
            existing_stock.setVolumes(voluemeList);
            existing_stock.setStockOldHigh(highList);
            repository100.save(existing_stock);

    }

    
    
}
