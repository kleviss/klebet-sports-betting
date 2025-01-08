import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import {
  SportsSoccer,
  // Casino, Timeline,
  Person,
  ShoppingCart,
  Logout,
  Receipt,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const drawerWidth = 260;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate("/auth");
  };

  const menuItems = [
    { text: "Betting", icon: <SportsSoccer />, path: "/dashboard" },
    { text: "My Bets", icon: <Receipt />, path: "/my-bets" },
    { text: "Profile", icon: <Person />, path: "/profile" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <Box sx={{ display: "flex", overflow: "hidden" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "rgba(18, 18, 18, 0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: "0.5px",
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 20px rgba(33, 150, 243, 0.3)",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            KLEBET
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => navigate("/checkout")}
            // sx={{
            //   mr: 2,
            //   background: "rgba(255, 255, 255, 0.05)",
            //   backdropFilter: "blur(10px)",
            //   "&:hover": {
            //     background: "rgba(255, 255, 255, 0.1)",
            //   },
            // }}
          >
            <Badge badgeContent={0} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <IconButton
            onClick={handleProfileClick}
            sx={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <Avatar
              sx={{
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                width: 35,
                height: 35,
                border: "2px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              {user?.email?.[0].toUpperCase()}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                mt: 1,
                background: "rgba(18, 18, 18, 0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                navigate("/profile");
              }}
            >
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "rgba(18, 18, 18, 0.85)",
            backdropFilter: "blur(20px)",
            borderRight: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "4px 0 30px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto", mt: 2, px: 2 }}>
          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.text}
                onClick={() => navigate(item.path)}
                sx={{
                  mb: 1,
                  borderRadius: "12px",
                  background: isActive(item.path)
                    ? "linear-gradient(45deg, rgba(33, 150, 243, 0.15), rgba(33, 203, 243, 0.15))"
                    : "transparent",
                  "&:hover": {
                    background: isActive(item.path)
                      ? "linear-gradient(45deg, rgba(33, 150, 243, 0.2), rgba(33, 203, 243, 0.2))"
                      : "rgba(255, 255, 255, 0.05)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive(item.path) ? "#2196F3" : "rgba(255, 255, 255, 0.7)",
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    "& .MuiTypography-root": {
                      fontWeight: isActive(item.path) ? 600 : 400,
                      color: isActive(item.path) ? "#2196F3" : "rgba(255, 255, 255, 0.7)",
                    },
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${drawerWidth}px)`,
          minHeight: "100vh",
          // mt: "64px", // Height of AppBar
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: "2px",
          },
          "&::-webkit-scrollbar-track": {
            background: "rgba(255, 255, 255, 0.05)",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "3px",
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
