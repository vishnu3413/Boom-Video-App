import { useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

const PurchaseButton = ({ videoId, price, onPurchaseComplete }) => {
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const response = await api.get("/wallet");
        setWallet(response.data.balance);
      } catch (error) {
        console.error("Failed to fetch wallet balance", error);
      }
    };

    fetchWallet();
  }, []);

  const handlePurchase = async () => {
    if (wallet === null) return;
    if (wallet < price) {
      toast.error(`Insufficient balance. Your balance is ₹${wallet}, but this costs ₹${price}.`);
      return;
    }

    setLoading(true);
    try {
      await api.post(`/purchases/${videoId}`);
      toast.success("Purchase successful!")
      setMessage("Purchase successful!");
      setWallet((prev) => prev - price);

      if (onPurchaseComplete) onPurchaseComplete();
    } catch (error) {
      setMessage("Purchase failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handlePurchase}
        disabled={loading || wallet === null}
        className={`border border-white text-white font-semibold py-2 px-4 rounded ${
          loading || wallet === null ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Processing..." : `Buy for ₹${price}`}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default PurchaseButton;
