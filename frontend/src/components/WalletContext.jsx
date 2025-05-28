import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../services/api";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletAmount, setWalletAmount] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const fetchWallet = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setWalletAmount(null);
        return;
      }

      const response = await api.get("/wallet");
      setWalletAmount(response.data.balance);
    } catch (error) {
      console.error("Failed to fetch wallet amount", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, [location.pathname]);

  return (
    <WalletContext.Provider value={{ walletAmount, loading, refreshWallet: fetchWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
