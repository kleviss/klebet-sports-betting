import React, { createContext, useContext, useState } from "react";

interface Bet {
  id: string;
  gameId: string;
  homeTeam: string;
  awayTeam: string;
  selectedTeam: string;
  odds: number;
  stake: number;
  status?: "Pending" | "Won" | "Lost";
}

interface BetContextType {
  bets: Bet[];
  placeBets: (bets: Bet[]) => Promise<void>;
}

const BetContext = createContext<BetContextType | undefined>(undefined);

export const BetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bets, setBets] = useState<Bet[]>([]);

  const placeBets = async (newBets: Bet[]) => {
    // In a real app, this would make an API call
    setBets((prevBets) => [...prevBets, ...newBets]);
  };

  return <BetContext.Provider value={{ bets, placeBets }}>{children}</BetContext.Provider>;
};

export const useBets = () => {
  const context = useContext(BetContext);
  if (!context) {
    throw new Error("useBets must be used within a BetProvider");
  }
  return context;
};
