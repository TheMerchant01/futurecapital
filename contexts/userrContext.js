"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { cryptos } from "../components/dashboard/MarketsPage/data/cryptos";

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const router = useRouter();
  const [details, setDetails] = useState(0);
  const [defaultOpen, setDefaultOPen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [address, setAddress] = useState();
  const [coinPrices, setCoinPrices] = useState({});
  const [cryptoPrices, setCryptoPrices] = useState({});
  const [currncyPrices, setCurrencyPrices] = useState({}); // Updated state variable name

  const [stockPrices, setStockPrices] = useState({}); // Updated state variable name

  let email = ""; // Initialize email

  if (typeof document !== "undefined") {
    const rawEmail = decodeURIComponent(
      document.cookie.replace(
        /(?:(?:^|.*;\s*)email\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      )
    );
    email = rawEmail.replace(/%40/g, "@");
  }
  const deposits = [
    {
      coinName: "Bitcoin",
      short: "Bitcoin",
      image: "/assets/bitcoin.webp",
      address: "0xiohxhihfojdokhijkhnofwefodsdhfodhod",
    },
    {
      coinName: "Ethereum",
      short: "Ethereum",
      image: "/assets/ethereum.webp",
      address: "0xiohxhihfojhijkhnowefodsdhfodhod",
    },
    {
      coinName: "Tether USDT",
      short: "Tether",
      image: "/assets/Tether.webp",
      address: "0Xxiohxhihfookhijkhnofwefodsdhfodhod",
    },
  ];
  useEffect(() => {
    const fetchStockPrices = async () => {
      try {
        // Create an array of unique symbols from stocks, join them and convert to uppercase
        // Make a single API request to fetch prices for all symbols using Polygon.io
        const response = await axios.get(
          `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2023-01-09?adjusted=true&apiKey=uBHWmV9nY9dXSxbrZJ8iiuFrcHsEiHED`
        );
        if (
          response.data &&
          response.data.status === "OK" &&
          response.data.results
        ) {
          const stockData = response.data.results;
          const priceData = {};

          stockData.forEach((stock) => {
            priceData[stock.T] = stock.c;
          });

          setStockPrices(priceData);
        }
      } catch (error) {
        console.error("Error fetching stock prices:", error);
      }
    };

    fetchStockPrices();
  }, []);
  useEffect(() => {
    const fetchStockPrices = async () => {
      try {
        // Create an array of unique symbols from stocks, join them and convert to uppercase
        // Make a single API request to fetch prices for all symbols using Polygon.io
        const response = await axios.get(
          `https://api.polygon.io/v2/aggs/grouped/locale/global/market/fx/2023-01-09?adjusted=true&apiKey=uBHWmV9nY9dXSxbrZJ8iiuFrcHsEiHED`
        );
        if (
          response.data &&
          response.data.status === "OK" &&
          response.data.results
        ) {
          console.log("This is the resposne", response);
          const stockData = response.data.results;
          const priceData = {};

          stockData.forEach((stock) => {
            priceData[stock.T] = stock.c;
          });

          setCurrencyPrices(priceData);
        }
      } catch (error) {
        console.error("Error fetching stock prices:", error);
      }
    };

    fetchStockPrices();
  }, []);
  useEffect(() => {
    // Function to fetch cryptocurrency prices and update state
    const fetchCryptoPrices = async () => {
      try {
        // Create an array of unique symbols from cryptos, join them and convert to lowercase
        const symbols = cryptos
          .map((crypto) => crypto.name.replace(/ /g, "-"))
          .join(",");

        // Make an API request to fetch prices for the symbols
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${symbols}&vs_currencies=usd`
        );

        if (response.ok) {
          const data = await response.json();
          setCryptoPrices(data);
        }
      } catch (error) {
        console.error("Error fetching cryptocurrency prices:", error);
      }
    };

    // Call the function to fetch prices on component mount
    fetchCryptoPrices();
  }, []); // The empty dependency array ensures the effect runs once on mount
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.post("/db/getAddess/", {
          _id: "68c721fc1fc2ea3718051d05",
        });
        setAddress(response.data);
      } catch (error) {
        console.log("Error fetching Adsress: ", error);
      }
    };
    fetchAddress();
  }, [details._id]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("defaultOpen", defaultOpen.toString());
    }
  }, [defaultOpen]);
  useEffect(() => {
    const fetchCoinPrices = async () => {
      try {
        // Create an array of coin symbols for API request
        const coinSymbols = deposits.map((coin) => coin.short.toLowerCase());

        // API request to fetch coin prices
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coinSymbols.join(
            ","
          )}&vs_currencies=usd`
        );

        // Update coinPrices state with fetched prices
        setCoinPrices(response.data);
      } catch (error) {
        console.error("Error fetching coin prices:", error);
      }
    };

    fetchCoinPrices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedMethod) {
      const assetId = selectedMethod.toLowerCase().replace(/\s+/g, "-");
      const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${assetId}&vs_currencies=usd`;

      axios
        .get(apiUrl)
        .then((response) => {
          setCurrentPrice(response.data[assetId]?.usd || 0);
        })
        .catch((error) => {
          console.error("Error fetching the current price:", error);
        });
    }
  }, [selectedMethod]);

  const fetchDetails = async () => {
    try {
      const response = await fetch(
        "/fetching/fetchAllDetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
          body: JSON.stringify({
            email,
            timestamp: Date.now(), // Add timestamp to force cache invalidation
          }),
        },
        { next: { revalidate: 0 } } // Disable caching
      );
      if (response.status === 200) {
        const data = await response.json();
        setDetails(data);
        setDefaultOPen(true);
      } else {
        // // Remove the "token" cookie if it's not found
        const tokenCookie = document.cookie
          .split(";")
          .find((cookie) => cookie.trim().startsWith("token="));
        if (tokenCookie) {
          document.cookie =
            "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
        router.replace("/auth");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch details initially
    fetchDetails();

    // eslint-disable-next-line react-hooks/exhaustive-deps

    const intervalId = setInterval(fetchDetails, 60000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);
  const setNotification = async (message, type, method) => {
    try {
      // Prepare the notification data
      const newNotification = {
        id: crypto.randomUUID(), // Generate a unique ID
        message,
        type,
        method,
        date: new Date().toISOString(), // Get the current date in ISO format
      };

      // Send the notification data to the backend
      const response = await axios.post("/notifs/setNotifs/api", {
        newNotification,
        email,
      }); // Replace with your actual backend endpoint

      if (response.status === 200) {
        // Notification sent successfully to the backend

        // Now, update the frontend state (details.notifications) with the new notification
        setDetails((prevDetails) => ({
          ...prevDetails,
          notifications: [...prevDetails.notifications, newNotification],
          isReadNotifications: false,
        }));
      } else {
        // Handle any errors or display an error message to the user
        console.error("Failed to send notification:", response.data);
      }
    } catch (error) {
      // Handle network errors or other unexpected errors
      console.error("Error sending notification:", error);
    }
  };
  const addAsset = async (email, assetType, assetId) => {
    try {
      // Define the request payload with the email, assetType, and assetId

      // Send a POST request to your API endpoint
      const response = await axios.post("/db/watch/add/api", {
        email,
        assetType,
        assetId,
      });

      if (response.data && response.data.success) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      // Handle errors here, such as network issues or server errors
      return false;
    }
  };
  const removeAsset = async (email, assetType, assetId) => {
    try {
      const response = await axios.post("/db/watch/remove/api", {
        email,
        assetType,
        assetId,
      });

      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  return (
    <UserDataContext.Provider
      value={{
        details,
        setDetails,
        selectedMethod,
        setSelectedMethod,
        currentPrice,
        setCurrentPrice,
        coinPrices,
        setCoinPrices,
        email,
        defaultOpen,
        setDefaultOPen,
        setNotification,
        removeAsset,
        addAsset,
        cryptoPrices,
        stockPrices,
        currncyPrices,
        address,
        fetchDetails,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);
