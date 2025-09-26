"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
} from "../../ui/table";
import dynamic from "next/dynamic";
import { useTheme } from "../../../contexts/themeContext";
import { useUserData } from "../../../contexts/userrContext";
import { Skeleton } from "../../ui/skeleton";

// List of names for simulation
const names = [
  "Sofia",
  "Liam",
  "Olivia",
  "Noah",
  "Emma",
  "Ava",
  "Oliver",
  "Isabella",
  "Sophia",
  "Mia",
  "Jackson",
  "Elijah",
  "Lucas",
  "Aiden",
  "Harper",
  "Evelyn",
  "Lily",
  "Charlotte",
  "Amelia",
  "Mason",
  "Ella",
  "Benjamin",
  "Henry",
  "William",
  "Alexander",
  "James",
  "Sebastian",
  "Michael",
  "Joseph",
  "Avery",
  "Sophie",
  "Matteo",
  "Leo",
  "Zoe",
  "Luna",
  "Mila",
  "Liam",
  "David",
  "Sarah",
  "Grace",
  "Daniel",
  "Lucia",
  "Eva",
  "Santiago",
  "Abigail",
  "Emily",
  "Logan",
  "Victoria",
  "Julia",
  "Mateo",
  "Elena",
  "Aria",
  "Gabriel",
  "Alexander",
  "Victoria",
  "Amelia",
  "Emma",
  "Leonardo",
  "Lucas",
  "Elena",
  "Luna",
  "Aria",
  "Ella",
  "Stella",
  "Sebastian",
  "Mateo",
  "Eva",
  "Oliver",
  "Aiden",
  "Sophia",
  "Ava",
  "Noah",
  "Liam",
  "Olivia",
  "Isabella",
  "Lucas",
  "Ethan",
  "Mia",
  "Elijah",
  "Harper",
  "Emily",
  "Avery",
  "Daniel",
  "Sofia",
  "Matthew",
  "Grace",
  "Leo",
  "David",
  "Zoe",
  "Charlotte",
  "Sophie",
  "James",
  "Evelyn",
  "Lily",
  "Michael",
  "Adebayo",
  "Adesuwa",
  "Adewale",
  "Adewumi",
  "Adigun",
  "Afolabi",
  "Agboola",
  "Akintola",
  "Akinyemi",
  "Alaba",
  "Alade",
  "Alamu",
  "Alao",
  "Aluko",
  "Amadi",
  "Aminu",
  "Ayodele",
  "Babatunde",
  "Bala",
  "Thabo",
  "Nomvula",
  "Sipho",
  "Bontle",
  "Kagiso",
  "Noluthando",
  "Lungile",
  "Tebogo",
  "Thandiwe",
  "Tshepo",
  "Nandi",
  "Mpho",
  "Lerato",
  "Nombuso",
  "Sizwe",
  "Khanyisile",
  "Themba",
  "Zanele",
  "Sibusiso",
  "Lindiwe",
  "Tumelo",
  "Gugu",
  "Mandla",
  "Mpumelelo",
  "Nokuthula",
  "Phumzile",
  "Zodwa",
  "Vuyo",
  "Nomsa",
  "Sanele",
  "Nontle",
  "Mzwandile",
  "Nqobile",
  "Zinhle",
  "Andile",
  "Nozipho",
  "Lwazi",
  "Zanele",
  "Siphiwe",
  "Busisiwe",
  "Nkosinathi",
  "Mthokozisi",
  "Nonhlanhla",
  "Simphiwe",
  "Mandisa",
  "Siyabonga",
  "Nomthandazo",
  "Buhle",
  "Thulani",
  "Nompumelelo",
  "Thandi",
  "Thembi",
  "Thamsanqa",
  "Siphokazi",
  "Khwezi",
  "Nobuhle",
  "Vusi",
  "Nontando",
  "Mandlenkosi",
  "Zandile",
  "Khethiwe",
  "Thabang",
  "Nokwanda",
  "Sizakele",
  "Ntombi",
  "Mthandazo",
  "Lethabo",
  "Sithembile",
  "Nkosi",
  "Thobeka",
  "Ntando",
  "Zamokuhle",
  "Khosi",
  "Bhekisisa",
  "Sibongile",
  "Saneh",
  "Nokubonga",
  "Nkosinhle",
  "Nomcebo",
  "Luthando",
  "Mfundo",
  "Ntokozo",
  "Sizani",
  "Sibonelo",
  "Thabisa",
  "Nokukhanya",
  "Zenande",
  "Zamanguni",
  "Nkazimulo",
  "Nomonde",
  "Thandokazi",
  "Ndumiso",
  "Ntsikelelo",
  "Nolundi",
  "Vukani",
  "Nomusa",
  "Zanele",
  "Nomzamo",
  "Nolwazi",
  "Thembi",
  "Bongani",
  "Mandisi",
  "Maria",
  "Jose",
  "Carmen",
  "Antonio",
  "Manuel",
  "Isabel",
  "Francisco",
  "Laura",
  "David",
  "Ana",
  "Carlos",
  "Sofia",
  "Miguel",
  "Elena",
  "Juan",
  "Lucia",
  "Luis",
  "Pilar",
  "Javier",
  "Raquel",
  "Pedro",
  "Maria Jose",
  "Jesus",
  "Marta",
  "Diego",
  "Rocio",
  "Fernando",
  "Teresa",
  "Pablo",
  "Rosa",
  "Alejandro",
  "Beatriz",
  "Manuela",
  "Jaime",
  "Nuria",
  "Andres",
  "Natalia",
  "Daniel",
  "Lourdes",
  "Ruben",
  "Concepcion",
  "Adrian",
  "Patricia",
  "Santiago",
  "Paula",
  "Sergio",
  "Cristina",
  "Victor",
  "Marina",
  "Jose Antonio",
  "Celia",
  "Joaquin",
  "Miriam",
  "Ivan",
  "Carmen Maria",
  "Jorge",
  "Nerea",
  "Salvador",
  "Cecilia",
  "Raul",
  "Lidia",
  "Emilio",
  "Alba",
  "Alberto",
  "Silvia",
  "Roberto",
  "Mireia",
  "Hector",
  "Naiara",
  "Guillermo",
  "Ruth",
  "Eduardo",
  "Monica",
  "Ismael",
  "Lara",
  "Mariano",
  "Rocio Maria",
  "Ruben",
  "Alonso",
  "Cristina Maria",
  "Vicente",
  "Eva",
  "Xavier",
  "Gloria",
  "Eloy",
  "Laura Maria",
  "Sergio",
  "Julia",
  "Marcos",
  "Mercedes",
  "Esteban",
  "Carla",
  "Mauricio",
  "Sandra",
  "Bamidele",
  "Benjamin",
  "William",
  "John",
  "Jane",
  "Alice",
  "Bob",
  "Charlie",
  "Diana",
  "Ethan",
  "Fiona",
  "George",
  "Hannah",
  "Ivan",
  "Jasmine",
  "Kyle",
  "Laura",
  "Mason",
  "Nina",
  "Oscar",
  "Pamela",
  "Quentin",
  "Rachel",
  "Steve",
  "Tina",
  "Ursula",
  "Victor",
  "Wendy",
  "Xavier",
  "Yvonne",
  "Zach",
  "Akio",
  "Binh",
  "Chen",
  "Dinesh",
  "Eun",
  "Fatima",
  "Guillermo",
  "Hiroshi",
  "Indira",
  "Jorge",
  "Kiran",
  "Lien",
  "Ming",
  "Nadia",
  "Omar",
  "Pia",
  "Qasim",
  "Rashid",
  "Sakura",
  "Tariq",
  "Uma",
  "Vinh",
  "Wei",
  "Xia",
  "Yasmin",
  "Zara",
];

// List of market pairs for simulation
const marketPairs = [
  "EUR/CAD",
  "USD/JPY",
  "GBP/USD",
  "AUD/USD",
  "USD/CHF",
  "NZD/USD",
  "USD/ZAR",
  "EUR/JPY",
  "EUR/GBP",
  "GBP/JPY",
  "AUD/CAD",
  "CHF/JPY",
  "NZD/JPY",
  "GBP/CAD",
  "AUD/JPY",
  "EUR/AUD",
  "GBP/CHF",
  "CAD/JPY",
  "EUR/NZD",
  "AUD/NZD",
  "AUD/CHF",
  "GBP/NZD",
  "USD/SGD",
  "USD/HKD",
  "USD/TRY",
  "EUR/TRY",
  "NZD/CHF",
  "CAD/CHF",
  "NZD/CAD",
  "SGD/JPY",
];

const ActiveTraders = () => {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate a random transaction ID
      const transactionId = (
        "#" +
        Math.random().toString(36).substring(2, 6) +
        "-" +
        Math.floor(Math.random() * 1e9)
      ).toUpperCase();

      // Pick a random name from the list
      const name = names[Math.floor(Math.random() * names.length)];

      // Pick a random market pair from the list
      const market =
        marketPairs[Math.floor(Math.random() * marketPairs.length)];

      const newTrade = {
        transactionId,
        name,
        profit: "$" + Math.floor(Math.random() * 10000),
        market,
        autoTrade: Math.random() > 0.5 ? "Active" : "Self-Trader",
      };

      setTrades((prevTrades) => [newTrade, ...prevTrades.slice(0, 5)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  const { isDarkMode } = useTheme();
  const { details } = useUserData();

  return (
    <div className=" w-full my-2 px-2 rounded-lg ">
      {details === 0 ? (
        <Skeleton
          className={`  h-32 ${isDarkMode ? "bg-[#333]" : "bg-gray-200/80"}`}
        />
      ) : (
        <div className=" py-5 shadow[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
          {" "}
          <div
            className={`heading text-lg font-bold  px-3 my-2 rounded-lg ${
              isDarkMode ? "text-white" : ""
            }`}
          >
            Latest Trades{" "}
            <span className="text-green-700 text-sm">(Highest Gainers)</span>
          </div>
          <Table className=" ">
            <TableRow className="[&_tr]:border-0 border-0">
              <TableHead
                className={`font-bold ${
                  isDarkMode ? "text-white/80" : "text-black"
                }`}
              >
                Transaction ID
              </TableHead>
              <TableHead
                className={`font-bold ${
                  isDarkMode ? "text-white/80" : "text-black"
                }`}
              >
                Name
              </TableHead>
              <TableHead
                className={`font-bold ${
                  isDarkMode ? "text-white/80" : "text-black"
                }`}
              >
                Profit
              </TableHead>
              <TableHead
                className={`font-bold ${
                  isDarkMode ? "text-white/80" : "text-black"
                }`}
              >
                Market
              </TableHead>
              <TableHead
                className={`font-bold ${
                  isDarkMode ? "text-white/80" : "text-black"
                }`}
              >
                Auto-Trade
              </TableHead>
            </TableRow>
            <TableBody>
              {trades.map((trade, index) => (
                <TableRow key={index} className="border-0">
                  <TableCell
                    className={`border-0 ${
                      isDarkMode ? "text-white/70 font-old" : "font-old"
                    }`}
                  >
                    {trade.transactionId}
                  </TableCell>
                  <TableCell
                    className={`border-0 ${
                      isDarkMode ? "text-white/70 font-bld" : "font-old"
                    }`}
                  >
                    {trade.name}
                  </TableCell>
                  <TableCell
                    className={`border-0 ${
                      isDarkMode ? "text-white/70 font-bold" : "font-bold"
                    }`}
                  >
                    {trade.profit}
                  </TableCell>
                  <TableCell
                    className={`border-0 ${isDarkMode ? "text-white/70" : ""}`}
                  >
                    {trade.market}
                  </TableCell>
                  <TableCell
                    className={`border-0 ${
                      trade.autoTrade === "Active"
                        ? "text-green-500 font-bold"
                        : isDarkMode
                        ? "text-white/70"
                        : ""
                    }`}
                  >
                    {trade.autoTrade}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(ActiveTraders), { ssr: false });
