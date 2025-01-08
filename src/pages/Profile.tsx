import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  Button,
  TextField,
  Avatar,
  Chip,
  Fade,
  CircularProgress,
  Alert,
  IconButton,
  Stack,
} from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { AccountBalance, Payment, History, TrendingUp, ArrowUpward, ArrowDownward, Casino } from "@mui/icons-material";
import { getUserBalance, getUserTransactions, createTransaction, Transaction } from "../services/supabaseService";
import { motion, AnimatePresence } from "framer-motion";
import { useSnackbar } from "notistack";
import { NumericFormat } from "react-number-format";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const MotionPaper = motion(Paper);
const MotionBox = motion(Box);

const getTransactionIcon = (type: Transaction["type"]) => {
  switch (type) {
    case "deposit":
      return <ArrowUpward color="success" />;
    case "withdrawal":
      return <ArrowDownward color="error" />;
    case "bet":
      return <Casino color="warning" />;
    case "win":
      return <TrendingUp color="success" />;
    default:
      return <Payment />;
  }
};

export const Profile = () => {
  const [tabValue, setTabValue] = useState(0);
  const { user } = useAuth();
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const loadUserData = async () => {
      if (user?.id) {
        const [userBalance, userTransactions] = await Promise.all([
          getUserBalance(user.id),
          getUserTransactions(user.id),
        ]);
        setBalance(userBalance);
        setTransactions(userTransactions);
        setLoading(false);
      }
    };

    loadUserData();
  }, [user?.id]);

  const handleDeposit = async () => {
    if (!user?.id || !amount) return;
    setProcessing(true);
    setError(null);
    try {
      await createTransaction(user.id, "deposit", Number(amount));
      const newBalance = await getUserBalance(user.id);
      setBalance(newBalance);
      setAmount("");
      enqueueSnackbar("Deposit successful!", { variant: "success" });
      setTabValue(2);
    } catch (error) {
      setError("Failed to process deposit. Please try again.");
      enqueueSnackbar("Deposit failed", { variant: "error" });
      console.error("Deposit error:", error);
    } finally {
      setProcessing(false);
    }
  };

  const handleWithdraw = async () => {
    if (!user?.id || !amount) return;
    const withdrawAmount = Number(amount);

    if (balance === null || withdrawAmount > balance) {
      setError("Insufficient funds");
      return;
    }

    setProcessing(true);
    setError(null);
    try {
      await createTransaction(user.id, "withdrawal", -withdrawAmount);
      const newBalance = await getUserBalance(user.id);
      setBalance(newBalance);
      setAmount("");
      setTabValue(2);
    } catch (err) {
      setError("Failed to process withdrawal. Please try again.");
      console.error("Withdrawal failed:", err);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Fade in>
      <Box
        sx={{
          mt: "64px",
          minHeight: "100vh",
          p: { xs: 2, md: 4 },
          background: "linear-gradient(135deg, rgba(18, 18, 18, 0.95) 0%, rgba(18, 18, 18, 0.8) 100%)",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "radial-gradient(circle at center, rgba(25, 118, 210, 0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          },
        }}
      >
        <Box sx={{ maxWidth: 1600, mx: "auto" }}>
          <Stack direction={{ xs: "column", lg: "row" }} spacing={4} sx={{ height: "100%" }}>
            <Box sx={{ width: { xs: "100%", lg: "400px" }, flexShrink: 0 }}>
              <MotionPaper
                elevation={6}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                sx={{
                  p: { xs: 4, lg: 6 },
                  height: "100%",
                  background: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 3,
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  minHeight: { lg: 600 },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "100%",
                    background: "linear-gradient(180deg, rgba(25, 118, 210, 0.05) 0%, transparent 100%)",
                    pointerEvents: "none",
                  },
                }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <Avatar
                      sx={{
                        width: 120,
                        height: 120,
                        mx: "auto",
                        mb: 3,
                        background: "linear-gradient(45deg, #1976d2, #90caf9)",
                        fontSize: "3rem",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                        border: "4px solid rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      {user?.email?.[0].toUpperCase()}
                    </Avatar>
                  </motion.div>
                  <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                    {user?.email?.split("@")[0]}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    {user?.email}
                  </Typography>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Paper
                      elevation={4}
                      sx={{
                        mt: 4,
                        p: 3,
                        background: "linear-gradient(45deg, rgba(25, 118, 210, 0.1), rgba(144, 202, 249, 0.1))",
                        borderRadius: 2,
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      <Typography variant="overline" display="block" sx={{ opacity: 0.7 }}>
                        Current Balance
                      </Typography>
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 700,
                          background: "linear-gradient(45deg, #1976d2, #90caf9)",
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          color: "transparent",
                        }}
                      >
                        €{balance?.toFixed(2)}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Box>
              </MotionPaper>
            </Box>

            <Box sx={{ width: { xs: "100%", lg: "600px" }, flexShrink: 0 }}>
              <MotionPaper
                elevation={6}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                sx={{
                  height: "100%",
                  minHeight: { lg: 600 },
                  background: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 3,
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  overflow: "hidden",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "100%",
                    background: "linear-gradient(180deg, rgba(25, 118, 210, 0.05) 0%, transparent 100%)",
                    pointerEvents: "none",
                    zIndex: 0,
                  },
                  "& > *": {
                    position: "relative",
                    zIndex: 1,
                  },
                }}
              >
                <Tabs
                  value={tabValue}
                  onChange={(e, v) => setTabValue(v)}
                  variant="fullWidth"
                  sx={{
                    borderBottom: 1,
                    borderColor: "rgba(255, 255, 255, 0.1)",
                    "& .MuiTab-root": {
                      py: 3,
                      fontSize: { xs: "0.9rem", md: "1.1rem" },
                      transition: "all 0.3s",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                      },
                    },
                    "& .Mui-selected": {
                      color: "#90caf9 !important",
                    },
                    "& .MuiTabs-indicator": {
                      background: "linear-gradient(45deg, #1976d2, #90caf9)",
                      height: 3,
                    },
                  }}
                >
                  <Tab
                    icon={<Payment sx={{ mb: 1 }} />}
                    label="Deposit"
                    sx={{
                      flexDirection: "column",
                      "&.Mui-selected": {
                        "& .MuiSvgIcon-root": {
                          color: "#90caf9",
                        },
                      },
                    }}
                  />
                  <Tab
                    icon={<AccountBalance sx={{ mb: 1 }} />}
                    label="Withdraw"
                    sx={{
                      flexDirection: "column",
                      "&.Mui-selected": {
                        "& .MuiSvgIcon-root": {
                          color: "#90caf9",
                        },
                      },
                    }}
                  />
                  <Tab
                    icon={<History sx={{ mb: 1 }} />}
                    label="History"
                    sx={{
                      flexDirection: "column",
                      "&.Mui-selected": {
                        "& .MuiSvgIcon-root": {
                          color: "#90caf9",
                        },
                      },
                    }}
                  />
                </Tabs>

                <Box sx={{ flex: 1, overflow: "auto", p: { xs: 2, md: 6, lg: 6 } }}>
                  <TabPanel value={tabValue} index={0}>
                    <MotionBox
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      sx={{ maxWidth: 600, mx: "auto", width: "100%" }}
                    >
                      <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 700, mb: 3 }}>
                        Add Funds
                      </Typography>
                      {error && (
                        <Alert
                          severity="error"
                          sx={{
                            mb: 3,
                            borderRadius: 2,
                            background: "rgba(211, 47, 47, 0.1)",
                            border: "1px solid rgba(211, 47, 47, 0.3)",
                          }}
                        >
                          {error}
                        </Alert>
                      )}
                      <NumericFormat
                        customInput={TextField}
                        fullWidth
                        label="Amount to Deposit"
                        value={amount}
                        onValueChange={(values) => setAmount(values.value)}
                        prefix="€"
                        decimalScale={2}
                        allowNegative={false}
                        sx={{
                          mb: 3,
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            background: "rgba(255, 255, 255, 0.05)",
                            transition: "all 0.3s",
                            "&:hover, &.Mui-focused": {
                              background: "rgba(255, 255, 255, 0.08)",
                              "& fieldset": {
                                borderColor: "primary.main",
                              },
                            },
                          },
                        }}
                      />
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          fullWidth
                          variant="contained"
                          size="large"
                          onClick={handleDeposit}
                          disabled={processing || !amount || Number(amount) <= 0}
                          sx={{
                            py: 2,
                            borderRadius: 2,
                            background: "linear-gradient(45deg, #1976d2, #90caf9)",
                            fontSize: "1.1rem",
                            textTransform: "none",
                            "&:hover": {
                              background: "linear-gradient(45deg, #1565c0, #64b5f6)",
                            },
                          }}
                        >
                          {processing ? <CircularProgress size={24} color="inherit" /> : "Deposit with Stripe"}
                        </Button>
                      </motion.div>
                    </MotionBox>
                  </TabPanel>

                  <TabPanel value={tabValue} index={1}>
                    <MotionBox
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      sx={{ maxWidth: 600, mx: "auto", width: "100%" }}
                    >
                      <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 700, mb: 3 }}>
                        Withdraw Funds
                      </Typography>
                      {error && (
                        <Alert
                          severity="error"
                          sx={{
                            mb: 3,
                            borderRadius: 2,
                            background: "rgba(211, 47, 47, 0.1)",
                            border: "1px solid rgba(211, 47, 47, 0.3)",
                          }}
                        >
                          {error}
                        </Alert>
                      )}
                      <NumericFormat
                        customInput={TextField}
                        fullWidth
                        label="Amount to Withdraw"
                        value={amount}
                        onValueChange={(values) => setAmount(values.value)}
                        prefix="€"
                        decimalScale={2}
                        allowNegative={false}
                        sx={{
                          mb: 3,
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            background: "rgba(255, 255, 255, 0.05)",
                            transition: "all 0.3s",
                            "&:hover, &.Mui-focused": {
                              background: "rgba(255, 255, 255, 0.08)",
                              "& fieldset": {
                                borderColor: "primary.main",
                              },
                            },
                          },
                        }}
                      />
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          fullWidth
                          variant="contained"
                          size="large"
                          onClick={handleWithdraw}
                          disabled={
                            processing ||
                            !amount ||
                            Number(amount) <= 0 ||
                            (balance !== null && Number(amount) > balance)
                          }
                          sx={{
                            py: 2,
                            borderRadius: 2,
                            background: "linear-gradient(45deg, #f50057, #ff4081)",
                            fontSize: "1.1rem",
                            textTransform: "none",
                            "&:hover": {
                              background: "linear-gradient(45deg, #c51162, #f73378)",
                            },
                          }}
                        >
                          {processing ? <CircularProgress size={24} /> : "Request Withdrawal"}
                        </Button>
                      </motion.div>
                      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
                        Available balance: €{balance?.toFixed(2)}
                      </Typography>
                    </MotionBox>
                  </TabPanel>

                  <TabPanel value={tabValue} index={2}>
                    <Stack spacing={2} sx={{ maxWidth: 1000, mx: "auto", width: "100%" }}>
                      <AnimatePresence>
                        {transactions.map((transaction, index) => (
                          <motion.div
                            key={transaction.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <Paper
                              elevation={2}
                              sx={{
                                mb: 2,
                                p: 3,
                                borderRadius: 2,
                                background: "rgba(255, 255, 255, 0.03)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                transition: "transform 0.2s",
                                "&:hover": {
                                  transform: "translateY(-2px)",
                                  background: "rgba(255, 255, 255, 0.05)",
                                },
                              }}
                            >
                              <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                                <IconButton
                                  sx={{
                                    background: "rgba(255, 255, 255, 0.05)",
                                    "&:hover": { background: "rgba(255, 255, 255, 0.1)" },
                                  }}
                                >
                                  {getTransactionIcon(transaction.type)}
                                </IconButton>
                                <Box sx={{ flex: 1 }}>
                                  <Typography variant="subtitle1" sx={{ fontWeight: 600, textTransform: "capitalize" }}>
                                    {transaction.type}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {new Date(transaction.created_at).toLocaleString()}
                                  </Typography>
                                </Box>
                                <Stack alignItems="flex-end">
                                  <Typography
                                    variant="h6"
                                    color={transaction.amount > 0 ? "success.main" : "error.main"}
                                    sx={{ fontWeight: 600 }}
                                  >
                                    {transaction.amount > 0 ? "+" : ""}€{Math.abs(transaction.amount)}
                                  </Typography>
                                  <Chip
                                    label={transaction.status}
                                    size="small"
                                    color={transaction.status === "completed" ? "success" : "default"}
                                    sx={{
                                      mt: 1,
                                      borderRadius: 1,
                                      "& .MuiChip-label": { px: 2 },
                                    }}
                                  />
                                </Stack>
                              </Stack>
                            </Paper>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </Stack>
                  </TabPanel>
                </Box>
              </MotionPaper>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Fade>
  );
};
