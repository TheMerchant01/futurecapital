// SmartsuppChat.js
"use client";
import { useEffect } from "react";

const SmartsuppChat = () => {
  useEffect(() => {
    // Dynamically add the Smartsupp chat script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://www.smartsuppchat.com/loader.js?";
    document.body.appendChild(script);

    // Set the Smartsupp key
    script.onload = () => {
      window._smartsupp = window._smartsupp || {};
      window._smartsupp.key = "4c618250bd5d29061450f9e414ce3b5af491bb53";
    };

    // Clean up the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []); // Empty dependency array to run once on mount

  return null; // This component doesn't need to render anything
};

export default SmartsuppChat;
