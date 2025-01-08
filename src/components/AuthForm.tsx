import { useState } from "react";
import { Box, TextField, Button, Typography, Alert, Container, Paper, useTheme } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { SportsSoccer } from "@mui/icons-material";
import { motion } from "framer-motion";

const MotionPaper = motion(Paper);
const MotionTypography = motion(Typography);

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { error: authError } = await (isLogin ? signIn(email, password) : signUp(email, password));
      if (authError) throw authError;
      navigate("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.message || "An error occurred during authentication");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // ml: 30,
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
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
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <MotionPaper
          elevation={24}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{
            p: { xs: 3, sm: 6 },
            borderRadius: 3,
            background: "rgba(18, 18, 18, 0.8)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <SportsSoccer
                sx={{
                  fontSize: 48,
                  color: "primary.main",
                  mb: 2,
                  filter: "drop-shadow(0 4px 8px rgba(25, 118, 210, 0.3))",
                }}
              />
            </motion.div>
            <MotionTypography
              variant="h3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              sx={{
                fontWeight: 700,
                background: "linear-gradient(45deg, #1976d2, #90caf9)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                mb: 1,
              }}
            >
              Klebet
            </MotionTypography>
            <MotionTypography
              variant="h5"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              sx={{ mb: 1, fontWeight: 500 }}
            >
              {isLogin ? "Welcome Back" : "Create Account"}
            </MotionTypography>
            <Typography variant="body1" color="text.secondary">
              {isLogin ? "Sign in to continue betting" : "Join the ultimate sports betting platform"}
            </Typography>
          </Box>

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

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  background: "rgba(255, 255, 255, 0.05)",
                  "&:hover, &.Mui-focused": {
                    "& fieldset": {
                      borderColor: "primary.main",
                    },
                    background: "rgba(255, 255, 255, 0.08)",
                  },
                },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  background: "rgba(255, 255, 255, 0.05)",
                  "&:hover, &.Mui-focused": {
                    "& fieldset": {
                      borderColor: "primary.main",
                    },
                    background: "rgba(255, 255, 255, 0.08)",
                  },
                },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                borderRadius: "50px",
                background: "linear-gradient(45deg, #1976d2, #90caf9)",
                fontSize: "1.1rem",
                textTransform: "none",
                fontWeight: 600,
                boxShadow: "0 8px 24px rgba(25, 118, 210, 0.3)",
                "&:hover": {
                  background: "linear-gradient(45deg, #1565c0, #64b5f6)",
                  boxShadow: "0 12px 32px rgba(25, 118, 210, 0.4)",
                },
              }}
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </Button>

            <Button
              fullWidth
              onClick={() => setIsLogin(!isLogin)}
              sx={{
                color: "primary.main",
                "&:hover": {
                  background: "rgba(25, 118, 210, 0.08)",
                },
              }}
            >
              {isLogin ? "Need an account? Sign Up" : "Have an account? Sign In"}
            </Button>
          </Box>
        </MotionPaper>
      </Container>
    </Box>
  );
};
