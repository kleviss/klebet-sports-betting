import * as React from "react";
import { createContext, useContext, useState } from "react";
import type { BetSlip } from "./BetSlipContext";

export interface Bet {
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
  placeBets: (bets: BetSlip[]) => Promise<void>;
  removeBet: (id: string) => void;
  clearBets: () => void;
}

const BetContext = createContext<BetContextType | undefined>(undefined);

export const BetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bets, setBets] = useState<Bet[]>([]);

  const placeBets = async (betSlips: BetSlip[]) => {
    // Convert BetSlip to Bet
    const newBets: Bet[] = betSlips.map((slip) => ({
      id: slip.id,
      gameId: slip.gameId,
      homeTeam: slip.homeTeam,
      awayTeam: slip.awayTeam,
      selectedTeam: slip.selectedTeam,
      odds: slip.odds,
      stake: slip.stake || 1,
      status: "Pending",
    }));

    setBets((prevBets) => [...prevBets, ...newBets]);
  };

  const removeBet = (id: string) => {
    setBets((prevBets) => prevBets.filter((bet) => bet.id !== id));
  };

  const clearBets = () => {
    setBets([]);
  };

  return <BetContext.Provider value={{ bets, placeBets, removeBet, clearBets }}>{children}</BetContext.Provider>;
};

export const useBets = () => {
  const context = useContext(BetContext);
  if (!context) {
    throw new Error("useBets must be used within a BetProvider");
  }
  return context;
};
