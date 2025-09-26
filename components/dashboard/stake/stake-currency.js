export const stakingOptions = [
  {
    id: "chfjpy_stake_1",
    name: "CHFJPY Staking",
    coinName: "CHF~JPY",
    coinSymbol: "CHFJPY",
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
    imagePath: "/assets/markets/currencies/CHFJPY.svg",
  },
  {
    id: "eurjpy_stake_1",
    name: "eurjpy Staking",
    coinName: "EUR~JPY",
    coinSymbol: "EURJPY",
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
    imagePath: "/assets/markets/currencies/EURJPY.svg",
  },

  {
    id: "AUDUSD_stake_1",
    name: "AUDUSD Staking",
    coinName: "AUD~USD",
    coinSymbol: "AUDUSD",
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
    imagePath: "/assets/markets/currencies/AUDUSD.svg",
  },
  {
    id: "EURGBP_stake_1",
    name: "EURGBP Staking",
    coinName: "EUR~GBP",
    coinSymbol: "EURGBP",
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
    imagePath: "/assets/markets/currencies/EURGBP.svg",
  },
  {
    id: "USDCAD_stake_1",
    name: "USDCAD Staking",
    coinName: "USD~CAD",
    coinSymbol: "USDCAD",
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
    imagePath: "/assets/markets/currencies/USDCAD.svg",
  },
];
