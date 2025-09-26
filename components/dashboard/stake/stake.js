export const stakingOptions = [
  {
    id: "btc_stake_1",
    name: "Bitcoin Staking",
    coinName: "Bitcoin",
    coinSymbol: "BTC",
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
    imagePath: "/assets/markets/crypto/BTC.svg",
  },
  {
    id: "eth_stake_1",
    name: "Ethereum Staking",
    coinName: "Ethereum",
    coinSymbol: "ETH",
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
    imagePath: "/assets/markets/crypto/ETH.svg",
  },

  {
    id: "sol_stake_1",
    name: "Solana Staking",
    coinName: "Solana",
    coinSymbol: "SOL",
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
    imagePath: "/assets/markets/crypto/SOL.svg",
  },
  {
    id: "doge_stake_1",
    name: "Doge Staking",
    coinName: "Dogecoin",
    coinSymbol: "DOGE",
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
    imagePath: "/assets/markets/crypto/DOGE.svg",
  },
  {
    id: "ada_stake_1",
    name: "Cardano Staking",
    coinName: "Cardano",
    coinSymbol: "ADA",
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
    imagePath: "/assets/markets/crypto/ADA.svg",
  },
  {
    id: "tether_stake_1",
    name: "Tether Staking",
    coinName: "Tether",
    coinSymbol: "USDT",
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
    imagePath: "/assets/markets/crypto/USDT.svg",
  },
  {
    id: "tron_stake_1",
    name: "Tron Staking",
    coinName: "Tron",
    coinSymbol: "TRX",
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
    imagePath: "/assets/markets/crypto/TRX.svg",
  },
];
