import { Box, Typography, Card, CardContent, Button, Stack, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useBets } from "../contexts/BetContext";
import { useNavigate } from "react-router-dom";
import { SportsBasketball } from "@mui/icons-material";

export const BetCheckout = () => {
  const { bets, removeBet, clearBets } = useBets();
  const navigate = useNavigate();

  const totalOdds = bets.reduce((acc, bet) => acc * bet.odds, 1);

  if (!bets || bets.length === 0) {
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
    <Box sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Your Bet Slip
      </Typography>

      <Stack spacing={2}>
        {bets.map((bet) => (
          <Card key={bet.id} sx={{ position: "relative" }}>
            <CardContent>
              <IconButton sx={{ position: "absolute", top: 8, right: 8 }} onClick={() => removeBet(bet.id)}>
                <Delete />
              </IconButton>
              <Typography variant="h6" gutterBottom>
                {bet.homeTeam} vs {bet.awayTeam}
              </Typography>
              <Typography color="text.secondary">
                {bet.sportTitle} - {bet.betType}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {bet.betName}
              </Typography>
              <Typography sx={{ mt: 1 }} color="primary">
                Odds: {bet.odds.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6">Total Odds: {totalOdds.toFixed(2)}</Typography>
          <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                // TODO: Implement bet placement
                clearBets();
                navigate("/dashboard");
              }}
            >
              Place Bets
            </Button>
            <Button variant="outlined" color="error" onClick={clearBets}>
              Clear All
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
