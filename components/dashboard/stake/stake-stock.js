export const stakingOptions = [
  {
    id: "aapl_stake_1",
    name: "APPLE Staking",
    coinName: "Apple",
    coinSymbol: "AAPL",
    description: "Stake your Bitcoin and earn rewards.",
    percentageRage: "5% - 12%",
    minimum: 100, // Minimum staking amount in BTC
    cycle: "Monthly", // Staking cycle (e.g., Daily, Monthly)
    durations: [
      { months: 1, percentage: 5 },
      { months: 3, percentage: 6.2 },
      { months: 4, percentage: 7.4 },
      { months: 6, percentage: 8.8 },
      { months: 8, percentage: 10.4 },
      { months: 12, percentage: 12 },
    ],
    imagePath: "/assets/markets/stock/AAPL.svg",
  },
  {
    id: "adbe_stake_1",
    name: "Adobe Staking",
    coinName: "Adobe",
    coinSymbol: "ADBE",
    percentageRage: "4% - 10%",

    description: "Stake your Ethereum and earn rewards.",
    minimum: 100, // Minimum staking amount in ETH
    cycle: "Monthly",
    durations: [
      { months: 1, percentage: 4 },
      { months: 3, percentage: 6.7 },
      { months: 6, percentage: 8.8 },
      { months: 12, percentage: 10 },
    ],
    imagePath: "/assets/markets/stock/ADBE.svg",
  },

  {
    id: "google_stake_1",
    name: "Google Staking",
    coinName: "Google",
    coinSymbol: "GOOGL",
    percentageRage: "4% - 9%",

    description: "Stake your Cardano SOL and earn rewards.",
    minimum: 100, // Minimum staking amount in ADA
    cycle: "Monthly",
    durations: [
      { months: 1, percentage: 4 },
      { months: 3, percentage: 6.5 },
      { months: 5, percentage: 7.6 },
      { months: 6, percentage: 8 },
      { months: 8, percentage: 9 },
    ],
    imagePath: "/assets/markets/stock/GOOGL.svg",
  },
  {
    id: "netflix_stake_1",
    name: "Netflix Staking",
    coinName: "Netflix",
    coinSymbol: "NFLX",
    percentageRage: "4% - 9%",

    description: "Stake your Cardano DOGE and earn rewards.",
    minimum: 100, // Minimum staking amount in ADA
    cycle: "Monthly",
    durations: [
      { months: 1, percentage: 4 },
      { months: 3, percentage: 6.5 },
      { months: 5, percentage: 7.6 },
      { months: 6, percentage: 8 },
      { months: 8, percentage: 9 },
    ],
    imagePath: "/assets/markets/stock/NFLX.svg",
  },
  {
    id: "nike_stake_1",
    name: "Nike Staking",
    coinName: "Nike",
    coinSymbol: "NKE",
    percentageRage: "2% - 9%",

    description: "Stake your Cardano ADA and earn rewards.",
    minimum: 100, // Minimum staking amount in ADA
    cycle: "Monthly",
    durations: [
      { months: 1, percentage: 2.5 },
      { months: 3, percentage: 3.6 },
      { months: 5, percentage: 4.4 },
      { months: 8, percentage: 6.3 },
      { months: 10, percentage: 7.6 },
      { months: 12, percentage: 9 },
    ],
    imagePath: "/assets/markets/stock/NKE.svg",
  },
  {
    id: "tesla_stake_1",
    name: "Tesla Staking",
    coinName: "Telsa",
    coinSymbol: "TSLA",
    percentageRage: "2% - 9%",

    description: "Stake your USDT and earn rewards.",
    minimum: 100, // Minimum staking amount in ADA
    cycle: "Monthly",
    durations: [
      { months: 1, percentage: 2.5 },
      { months: 3, percentage: 3.6 },
      { months: 5, percentage: 4.4 },
      { months: 8, percentage: 6.3 },
      { months: 10, percentage: 7.6 },
      { months: 12, percentage: 9 },
    ],
    imagePath: "/assets/markets/stock/TSLA.svg",
  },
  {
    id: "amazon_stake_1",
    name: "amazon Staking",
    coinName: "Amazon",
    coinSymbol: "AMZN",
    percentageRage: "2% - 9%",

    description: "Stake your TRX and earn rewards.",
    minimum: 100, // Minimum staking amount in ADA
    cycle: "Monthly",
    durations: [
      { months: 1, percentage: 2.5 },
      { months: 3, percentage: 3.6 },
      { months: 5, percentage: 4.4 },
      { months: 8, percentage: 6.3 },
      { months: 10, percentage: 7.6 },
      { months: 12, percentage: 9 },
    ],
    imagePath: "/assets/markets/stock/AMZN.svg",
  },
];
