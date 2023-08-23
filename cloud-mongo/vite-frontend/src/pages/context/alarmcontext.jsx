import React, { createContext, useContext, useState } from 'react';

const AlarmStocksContext = createContext();

const AlarmStocksProvider = ({ children }) => {
  const [alarmsStocks, setAlarmsStocks] = useState([]);

  return (
    <AlarmStocksContext.Provider value={{ alarmsStocks, setAlarmsStocks }}>
      {children}
    </AlarmStocksContext.Provider>
  );
};

const useAlarmStocks = () => {
  const context = useContext(AlarmStocksContext);
  if (!context) {
    throw new Error('useAlarmStocks must be used within a AlarmStocksProvider');
  }
  return context;
};

export { AlarmStocksProvider, useAlarmStocks };
