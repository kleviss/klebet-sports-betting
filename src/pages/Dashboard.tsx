import {
  Box,
  Typography,
  Card,
  Stack,
  IconButton,
  InputBase,
  Paper,
  Menu,
  MenuItem,
  Chip,
  Button,
  Dialog,
} from "@mui/material";
import { Search, SportsSoccer, KeyboardArrowDown, Schedule } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { fetchSports, fetchUpcomingGames, Sport, Game } from "../services/oddsApi";
import { useNavigate } from "react-router-dom";
import { useBetSlip } from "../contexts/BetSlipContext";

interface BetSlip {
  id: string;
  gameId: string;
  homeTeam: string;
  awayTeam: string;
  selectedTeam: string;
  odds: number;
  stake?: number;
}

export const Dashboard = () => {
  const [selectedSport, setSelectedSport] = useState("upcoming");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sports, setSports] = useState<Sport[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const navigate = useNavigate();

  const { betSlips, addBetSlip, updateStake, totalPotentialWin } = useBetSlip();

  useEffect(() => {
    const loadSports = async () => {
      const sportsData = await fetchSports();
      setSports(sportsData.filter((sport) => sport.active));
    };
    loadSports();
  }, []);

  useEffect(() => {
    const loadGames = async () => {
      setLoading(true);
      const gamesData = await fetchUpcomingGames(selectedSport);
      setGames(gamesData);
      setLoading(false);
    };
    loadGames();
  }, [selectedSport]);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (sportKey?: string) => {
    setAnchorEl(null);
    if (sportKey) {
      setSelectedSport(sportKey);
    }
  };

  const handlePlaceBet = (game: Game, teamName: string, odds: number) => {
    const newBetSlip: BetSlip = {
      id: `${game.id}-${teamName}`,
      gameId: game.id,
      homeTeam: game.home_team,
      awayTeam: game.away_team,
      selectedTeam: teamName,
      odds: odds,
      stake: 1,
    };

    addBetSlip(newBetSlip);
  };

  const handleCardClick = (game: Game) => {
    setSelectedGame(game);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        bgcolor: "#121212",
        position: "relative",
        paddingTop: "64px",
      }}
    >
      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          p: 3,
          marginRight: "350px",
          overflowX: "hidden",
          overflowY: "auto",
          height: "calc(100vh - 64px)",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
            mb: 4,
          }}
        >
          <Card
            sx={{
              background: "rgba(25, 118, 210, 0.08)",
              backdropFilter: "blur(10px)",
              borderRadius: 2,
              border: "1px solid rgba(255, 255, 255, 0.1)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
              },
            }}
          >
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Active Bets
              </Typography>
              <Typography variant="h2" sx={{ color: "#2196F3", fontWeight: 700 }}>
                {betSlips.length}
              </Typography>
            </Box>
          </Card>

          <Card
            sx={{
              background: "rgba(76, 175, 80, 0.08)",
              backdropFilter: "blur(10px)",
              borderRadius: 2,
              border: "1px solid rgba(255, 255, 255, 0.1)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
              },
            }}
          >
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Available Sports
              </Typography>
              <Typography variant="h2" sx={{ color: "#4CAF50", fontWeight: 700 }}>
                {sports.length}
              </Typography>
            </Box>
          </Card>

          <Card
            sx={{
              background: "rgba(233, 30, 99, 0.08)",
              backdropFilter: "blur(10px)",
              borderRadius: 2,
              border: "1px solid rgba(255, 255, 255, 0.1)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
              },
            }}
          >
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Total Markets
              </Typography>
              <Typography variant="h2" sx={{ color: "#E91E63", fontWeight: 700 }}>
                {games.length}
              </Typography>
            </Box>
          </Card>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ color: "#2196F3", fontWeight: 700, mb: 3 }}>
            Upcoming Matches
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <Paper
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                p: "4px 8px",
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 2,
              }}
            >
              <IconButton>
                <Search />
              </IconButton>
              <InputBase
                sx={{
                  ml: 1,
                  flex: 1,
                  color: "white",
                }}
                placeholder="Search matches..."
              />
            </Paper>

            <Chip
              icon={<SportsSoccer />}
              label={sports.find((s) => s.key === selectedSport)?.title || "All Sports"}
              onClick={handleMenuClick}
              deleteIcon={<KeyboardArrowDown />}
              onDelete={handleMenuClick}
              sx={{
                height: 48,
                minWidth: 200,
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 2,
                color: "white",
              }}
            />

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => handleMenuClose()}
              PaperProps={{
                sx: {
                  background: "rgba(18, 18, 18, 0.95)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: 2,
                  color: "white",
                },
              }}
            >
              <MenuItem onClick={() => handleMenuClose("upcoming")}>
                <SportsSoccer sx={{ mr: 1 }} /> All Sports
              </MenuItem>
              {sports.map((sport) => (
                <MenuItem key={sport.key} onClick={() => handleMenuClose(sport.key)}>
                  <SportsSoccer sx={{ mr: 1 }} /> {sport.title}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {loading ? (
            <Typography>Loading games...</Typography>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                },
                gap: 3,
              }}
            >
              {games.map((game) => {
                const mainMarket = game.bookmakers[0]?.markets[0];
                return (
                  <Card
                    key={game.id}
                    onClick={() => handleCardClick(game)}
                    sx={{
                      background: "rgba(18, 18, 18, 0.95)",
                      backdropFilter: "blur(10px)",
                      borderRadius: 2,
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      transition: "all 0.3s ease-in-out",
                      cursor: "pointer",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                      },
                    }}
                  >
                    <Box sx={{ p: 3 }}>
                      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                        <Schedule sx={{ fontSize: 18, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                          {new Date(game.commence_time).toLocaleString()}
                        </Typography>
                      </Stack>
                      <Typography variant="subtitle1" color="primary" gutterBottom sx={{ fontWeight: 600 }}>
                        {game.sport_title}
                      </Typography>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                        {game.home_team} vs {game.away_team}
                      </Typography>

                      {mainMarket && (
                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gap: 2,
                            mt: 2,
                          }}
                        >
                          {mainMarket.outcomes.map((outcome) => (
                            <Box
                              key={outcome.name}
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent card click when clicking odds
                                handlePlaceBet(game, outcome.name, outcome.price);
                              }}
                              sx={{
                                p: 1,
                                textAlign: "center",
                                background: betSlips.some(
                                  (slip) => slip.gameId === game.id && slip.selectedTeam === outcome.name
                                )
                                  ? "rgba(33, 150, 243, 0.3)"
                                  : "rgba(33, 150, 243, 0.1)",
                                borderRadius: 1,
                                cursor: "pointer",
                                transition: "all 0.2s",
                                "&:hover": {
                                  background: "rgba(33, 150, 243, 0.2)",
                                },
                              }}
                            >
                              <Typography variant="body2">{outcome.name}</Typography>
                              <Typography variant="h6" color="primary">
                                {outcome.price.toFixed(2)}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      )}
                    </Box>
                  </Card>
                );
              })}
            </Box>
          )}
        </Box>
      </Box>

      {/* Bet Slip Sidebar */}
      <Box
        sx={{
          width: 350,
          background: "rgba(18, 18, 18, 0.95)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          right: 0,
          top: "64px",
          height: "calc(100vh - 64px)",
          zIndex: 1200,
        }}
      >
        <Box sx={{ p: 3, flex: 1, overflowY: "auto" }}>
          <Typography variant="h5" sx={{ mb: 3, color: "white", fontWeight: 600 }}>
            Your Bet Slip
          </Typography>

          {betSlips.length === 0 ? (
            <Box sx={{ textAlign: "center", color: "text.secondary", py: 4 }}>
              <Typography variant="body1" gutterBottom>
                Your bet slip is empty
              </Typography>
              <Typography variant="body2">Click on any odds to add selections to your bet slip</Typography>
            </Box>
          ) : (
            <Stack spacing={2}>
              {betSlips.map((slip) => (
                <Card
                  key={slip.id}
                  sx={{
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    borderRadius: 2,
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle2" color="primary" gutterBottom>
                      {slip.homeTeam} vs {slip.awayTeam}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {slip.selectedTeam} @ {slip.odds.toFixed(2)}
                    </Typography>
                    <Paper
                      component="input"
                      type="number"
                      value={slip.stake}
                      onChange={(e) => updateStake(slip.id, parseFloat(e.target.value) || 1)}
                      sx={{
                        width: "100%",
                        background: "rgba(255, 255, 255, 0.1)",
                        border: "none",
                        p: 1,
                        color: "white",
                        "::placeholder": { color: "rgba(255, 255, 255, 0.5)" },
                      }}
                    />
                  </Box>
                </Card>
              ))}
            </Stack>
          )}
        </Box>

        {betSlips.length > 0 && (
          <Box
            sx={{
              p: 3,
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              background: "rgba(18, 18, 18, 0.95)",
              width: "100%",
            }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Total Potential Win: ${totalPotentialWin.toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={() => {
                if (betSlips.length > 0) {
                  navigate("/checkout", {
                    state: {
                      betSlips,
                      totalPotentialWin,
                    },
                  });
                }
              }}
              sx={{
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                color: "white",
                fontWeight: 600,
                textTransform: "none",
                fontSize: "1.1rem",
                py: 1.5,
                "&:hover": {
                  background: "linear-gradient(45deg, #1976D2 30%, #00B4D8 90%)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 16px rgba(33, 150, 243, 0.3)",
                },
              }}
            >
              Proceed to Checkout ({betSlips.length})
            </Button>
          </Box>
        )}
      </Box>

      {/* Add Dialog for more betting options */}
      <Dialog
        open={Boolean(selectedGame)}
        onClose={() => setSelectedGame(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            background: "rgba(18, 18, 18, 0.95)",
            backdropFilter: "blur(10px)",
            borderRadius: 2,
            border: "1px solid rgba(255, 255, 255, 0.1)",
            maxHeight: "calc(100vh - 100px)",
            overflowY: "auto",
          },
        }}
        sx={{
          "& .MuiDialog-paper": {
            margin: 2,
          },
          zIndex: 1300,
        }}
      >
        {selectedGame && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" color="white" gutterBottom>
              {selectedGame.home_team} vs {selectedGame.away_team}
            </Typography>
            <Typography variant="subtitle1" color="primary" gutterBottom>
              {selectedGame.sport_title}
            </Typography>

            {selectedGame.bookmakers.map((bookmaker) => (
              <Box key={bookmaker.key} sx={{ mt: 3 }}>
                <Typography variant="h6" color="white" gutterBottom>
                  {bookmaker.title}
                </Typography>
                {bookmaker.markets.map((market) => (
                  <Card
                    key={market.key}
                    sx={{
                      mt: 2,
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(10px)",
                      borderRadius: 2,
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <Box sx={{ p: 2 }}>
                      <Typography variant="subtitle2" color="primary" gutterBottom>
                        {market.key}
                      </Typography>
                      <Box
                        sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 2 }}
                      >
                        {market.outcomes.map((outcome) => (
                          <Box
                            key={outcome.name}
                            onClick={() => handlePlaceBet(selectedGame, outcome.name, outcome.price)}
                            sx={{
                              p: 1,
                              textAlign: "center",
                              background: betSlips.some(
                                (slip) => slip.gameId === selectedGame.id && slip.selectedTeam === outcome.name
                              )
                                ? "rgba(33, 150, 243, 0.3)"
                                : "rgba(33, 150, 243, 0.1)",
                              borderRadius: 1,
                              cursor: "pointer",
                              transition: "all 0.2s",
                              "&:hover": {
                                background: "rgba(33, 150, 243, 0.2)",
                              },
                            }}
                          >
                            <Typography variant="body2">{outcome.name}</Typography>
                            <Typography variant="h6" color="primary">
                              {outcome.price.toFixed(2)}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Card>
                ))}
              </Box>
            ))}
          </Box>
        )}
      </Dialog>
    </Box>
  );
};
