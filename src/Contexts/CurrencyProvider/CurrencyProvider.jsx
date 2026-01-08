import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const CurrencyContext = createContext();

const CurrencyProvider = ({ children }) => {
  const [inrRate, setInrRate] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchInrRate = async () => {
    try {
      const res = await axios.get(
        "https://api.exchangerate-api.com/v4/latest/USD"
      );
      setInrRate(res.data.rates.INR);
    } catch (error) {
      console.error("Currency conversion failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInrRate();
  }, []);

  return (
    <CurrencyContext.Provider value={{ inrRate, loading }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyProvider;
