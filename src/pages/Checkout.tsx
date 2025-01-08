import { Box, Typography, Card, Stack, Button, Paper } from "@mui/material";
import { useBetSlip } from "../contexts/BetSlipContext";
import { useBets } from "../contexts/BetContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SportsBasketball } from "@mui/icons-material";

interface LocationState {
  betSlips: Array<{
    id: string;
    gameId: string;
    homeTeam: string;
    awayTeam: string;
    selectedTeam: string;
    odds: number;
    stake?: number;
  }>;
  totalPotentialWin: number;
}

export const Checkout = () => {
  const { betSlips, updateStake, removeBetSlip, totalPotentialWin, clearBetSlips, addBetSlip } = useBetSlip();
  const { placeBets } = useBets();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle direct navigation with state
  useEffect(() => {
    const state = location.state as LocationState;
    if (state?.betSlips && state.betSlips.length > 0) {
      // Clear existing slips and add the ones from route state
      clearBetSlips();
      state.betSlips.forEach((slip) => {
        addBetSlip(slip);
      });
    }
  }, [location.state, clearBetSlips, addBetSlip]);

  const handlePlaceBets = async () => {
    try {
      await placeBets(betSlips);
      clearBetSlips();
      alert("Bets placed successfully!");
      navigate("/dashboard");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to place bets. Please try again.";
      alert(errorMessage);
    }
  };

  // If no bets in context or route state, show empty state
  if (!betSlips || betSlips.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 64px)",
          p: 3,
          bgcolor: "#121212",
          textAlign: "center",
          mt: "64px",
        }}
      >
        <SportsBasketball sx={{ fontSize: 100, color: "primary.main", mb: 3 }} />
        <Typography variant="h3" color="white" gutterBottom sx={{ fontWeight: 700 }}>
          No Active Bets
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600 }}>
          Your bet slip is empty. Head back to the dashboard to place some exciting bets!
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/dashboard")}
          sx={{
            py: 2,
            px: 6,
            background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
            color: "white",
            fontWeight: 600,
            textTransform: "none",
            fontSize: "1.2rem",
            borderRadius: 2,
            "&:hover": {
              background: "linear-gradient(45deg, #1976D2 30%, #00B4D8 90%)",
              transform: "translateY(-2px)",
              boxShadow: "0 8px 16px rgba(33, 150, 243, 0.3)",
            },
          }}
        >
          Browse Games
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        // width: "calc(100% + 64px)",
        minHeight: "calc(100vh - 64px)",
        p: { xs: 2, md: 4 },
        bgcolor: "#121212",
        overflowX: "hidden",
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          background: "rgba(255, 255, 255, 0.05)",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "rgba(255, 255, 255, 0.2)",
          borderRadius: "3px",
        },
        mt: "64px",
        // backgroundColor: "red",
      }}
    >
      <Typography variant="h4" color="white" sx={{ mb: 3, fontWeight: 700 }}>
        Checkout
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "3fr 1fr" },
          gap: 3,
          width: "100%",
          maxWidth: "100%",
        }}
      >
        {/* Bet Slips */}
        <Stack spacing={2} sx={{ width: "100%" }}>
          {betSlips.map((slip) => (
            <Card
              key={slip.id}
              sx={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                borderRadius: 2,
                border: "1px solid rgba(255, 255, 255, 0.1)",
                width: "100%",
              }}
            >
              <Box sx={{ p: 3 }}>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  {slip.homeTeam} vs {slip.awayTeam}
                </Typography>
                <Typography variant="body1" color="white" gutterBottom>
                  Selection: {slip.selectedTeam} @ {slip.odds.toFixed(2)}
                </Typography>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center", mt: 2 }}>
                  <Paper
                    component="input"
                    type="number"
                    value={slip.stake || 1}
                    onChange={(e) => updateStake(slip.id, parseFloat(e.target.value) || 1)}
                    sx={{
                      flex: 1,
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "none",
                      p: 1.5,
                      color: "white",
                      borderRadius: 1,
                      "&::-webkit-inner-spin-button": {
                        WebkitAppearance: "none",
                      },
                    }}
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeBetSlip(slip.id)}
                    sx={{ minWidth: 100 }}
                  >
                    Remove
                  </Button>
                </Box>
                <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                  Potential Win: ${((slip.stake || 1) * slip.odds).toFixed(2)}
                </Typography>
              </Box>
            </Card>
          ))}
        </Stack>

        {/* Summary Card */}
        <Card
          sx={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            borderRadius: 2,
            border: "1px solid rgba(255, 255, 255, 0.1)",
            height: "fit-content",
            position: { md: "sticky" },
            top: { md: 24 },
            width: "100%",
          }}
        >
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" color="white" gutterBottom>
              Bet Summary
            </Typography>
            <Stack spacing={2} sx={{ mt: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography color="text.secondary">Number of Bets</Typography>
                <Typography color="white">{betSlips.length}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography color="text.secondary">Total Stake</Typography>
                <Typography color="white">
                  ${betSlips.reduce((acc, slip) => acc + (slip.stake || 1), 0).toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography color="text.secondary">Total Potential Win</Typography>
                <Typography color="success.main" sx={{ fontWeight: 600 }}>
                  ${totalPotentialWin.toFixed(2)}
                </Typography>
              </Box>
              <Button
                variant="contained"
                size="large"
                onClick={handlePlaceBets}
                sx={{
                  mt: 2,
                  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                  color: "white",
                  fontWeight: 600,
                  textTransform: "none",
                  fontSize: "1.1rem",
                  py: 1.5,
                  width: "100%",
                  "&:hover": {
                    background: "linear-gradient(45deg, #1976D2 30%, #00B4D8 90%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 16px rgba(33, 150, 243, 0.3)",
                  },
                }}
              >
                Place Bets
              </Button>
            </Stack>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};
