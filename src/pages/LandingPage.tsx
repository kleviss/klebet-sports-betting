import { Box, Button, Container, Typography, Stack, useTheme, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SportsSoccer, Casino, Security } from "@mui/icons-material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionButton = motion(Button);

export const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const features = [
    {
      icon: <SportsSoccer sx={{ fontSize: 48 }} />,
      title: "Live Sports",
      description: "Real-time odds and live betting on your favorite sports",
    },
    {
      icon: <Casino sx={{ fontSize: 48 }} />,
      title: "Best Odds",
      description: "Competitive odds from top bookmakers worldwide",
    },
    {
      icon: <Security sx={{ fontSize: 48 }} />,
      title: "Secure Platform",
      description: "Safe deposits and fast withdrawals",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // marginLeft: 30,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at center, rgba(25, 118, 210, 0.1) 0%, transparent 70%)",
          zIndex: 0,
        },
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "50vh",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3} alignItems="center" textAlign="center">
            <MotionTypography
              variant="h1"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              sx={{
                fontSize: { xs: "3.5rem", sm: "4.5rem", md: "6rem" },
                fontWeight: 800,
                background: "linear-gradient(45deg, #1976d2, #90caf9)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                letterSpacing: "-0.02em",
                textShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              Klebet
            </MotionTypography>
            <MotionTypography
              variant="h2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              sx={{
                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                color: "text.secondary",
                maxWidth: "800px",
                fontWeight: 500,
                lineHeight: 1.4,
              }}
            >
              Your Premier Sports Betting Platform
            </MotionTypography>
            <MotionButton
              variant="contained"
              size="large"
              onClick={() => navigate("/dashboard")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              sx={{
                py: 2,
                px: 8,
                fontSize: "1.25rem",
                borderRadius: "50px",
                background: "linear-gradient(45deg, #1976d2, #90caf9)",
                textTransform: "none",
                fontWeight: 600,
                boxShadow: "0 8px 24px rgba(25, 118, 210, 0.3)",
                "&:hover": {
                  background: "linear-gradient(45deg, #1565c0, #64b5f6)",
                  boxShadow: "0 12px 32px rgba(25, 118, 210, 0.4)",
                },
              }}
            >
              Get Started
            </MotionButton>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 2, md: 2 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                sx={{
                  p: 5,
                  height: "100%",
                  textAlign: "center",
                  background: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 4,
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
                }}
              >
                <Box
                  sx={{
                    color: "primary.main",
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "& svg": {
                      filter: "drop-shadow(0 4px 8px rgba(25, 118, 210, 0.3))",
                    },
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {feature.description}
                </Typography>
              </MotionBox>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
