import { Box, Typography, Card, Stack, Chip } from "@mui/material";
import { useBets } from "../contexts/BetContext";

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

export const MyBets = () => {
  const { bets } = useBets();

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
          mt: "64px",
        }}
      >
        <Typography variant="h3" color="white" gutterBottom sx={{ fontWeight: 700 }}>
          No Bets Placed
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600 }}>
          You haven't placed any bets yet. Head to the dashboard to start betting!
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        p: { xs: 2, md: 4 },
        bgcolor: "#121212",
        mt: "64px",
      }}
    >
      <Typography variant="h4" color="white" sx={{ mb: 3, fontWeight: 700 }}>
        My Bets
      </Typography>

      <Stack spacing={2}>
        {bets.map((bet: Bet) => (
          <Card
            key={bet.id}
            sx={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              borderRadius: 2,
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="subtitle1" color="primary">
                  {bet.homeTeam} vs {bet.awayTeam}
                </Typography>
                <Chip
                  label={bet.status || "Pending"}
                  color={bet.status === "Won" ? "success" : bet.status === "Lost" ? "error" : "default"}
                  sx={{ borderRadius: 1 }}
                />
              </Box>
              <Typography variant="body1" color="white" gutterBottom>
                Selection: {bet.selectedTeam} @ {bet.odds.toFixed(2)}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Stake: ${bet.stake.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="success.main" sx={{ fontWeight: 600 }}>
                  Potential Win: ${(bet.stake * bet.odds).toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};
