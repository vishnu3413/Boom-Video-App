import { useNavigate } from "react-router-dom";
import defaultUserIcon from "../assets/avatar.png";
import icon from "../assets/logo.png";
import { useWallet } from "./WalletContext.jsx";

const UserWallet = () => {
  const navigate = useNavigate();
  const { walletAmount, loading } = useWallet();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="user-wallet-container flex items-center justify-between w-full px-4 py-0">
      <img src={icon} alt="Boom Logo" className="app-logo w-10 h-10" />

      <div className="flex items-center gap-3">
        <img
          src={defaultUserIcon}
          alt="User Profile"
          className="user-icon w-8 h-8 rounded-full"
        />
        <div className="wallet-amount text-sm font-medium">
          {loading
            ? "Loading..."
            : walletAmount !== null
            ? `₹${walletAmount.toFixed(2)}`
            : "Not logged in"}
        </div>
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="ml-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default UserWallet;