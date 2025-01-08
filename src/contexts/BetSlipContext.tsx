import { createContext, useContext, useState, ReactNode } from "react";

export interface BetSlip {
  id: string;
  gameId: string;
  homeTeam: string;
  awayTeam: string;
  selectedTeam: string;
  odds: number;
  stake?: number;
}

interface BetSlipContextType {
  betSlips: BetSlip[];
  addBetSlip: (slip: BetSlip) => void;
  removeBetSlip: (id: string) => void;
  updateStake: (id: string, stake: number) => void;
  clearBetSlips: () => void;
  totalPotentialWin: number;
}

const BetSlipContext = createContext<BetSlipContextType | undefined>(undefined);

export const BetSlipProvider = ({ children }: { children: ReactNode }) => {
  const [betSlips, setBetSlips] = useState<BetSlip[]>([]);

  const addBetSlip = (newSlip: BetSlip) => {
    setBetSlips((prev) => {
      const exists = prev.find((slip) => slip.id === newSlip.id);
      if (exists) {
        return prev.filter((slip) => slip.id !== newSlip.id);
      }
      return [...prev, newSlip];
    });
  };

  const removeBetSlip = (id: string) => {
    setBetSlips((prev) => prev.filter((slip) => slip.id !== id));
  };

  const updateStake = (id: string, stake: number) => {
    setBetSlips((prev) => prev.map((slip) => (slip.id === id ? { ...slip, stake } : slip)));
  };

  const clearBetSlips = () => {
    setBetSlips([]);
  };

  const totalPotentialWin = betSlips.reduce((acc, slip) => {
    const stake = slip.stake || 0;
    return acc + stake * slip.odds;
  }, 0);

  return (
    <BetSlipContext.Provider
      value={{
        betSlips,
        addBetSlip,
        removeBetSlip,
        updateStake,
        clearBetSlips,
        totalPotentialWin,
      }}
    >
      {children}
    </BetSlipContext.Provider>
  );
};

export const useBetSlip = () => {
  const context = useContext(BetSlipContext);
  if (context === undefined) {
    throw new Error("useBetSlip must be used within a BetSlipProvider");
  }
  return context;
};
