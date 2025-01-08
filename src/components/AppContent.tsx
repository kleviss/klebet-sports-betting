import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "./DashboardLayout";
import { Dashboard } from "../pages/Dashboard";
import { Checkout } from "../pages/Checkout";
import { Profile } from "../pages/Profile";
import { LandingPage } from "../pages/LandingPage";
import { MyBets } from "../pages/MyBets";

export const AppContent = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/dashboard"
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />
      <Route
        path="/checkout"
        element={
          <DashboardLayout>
            <Checkout />
          </DashboardLayout>
        }
      />
      <Route
        path="/my-bets"
        element={
          <DashboardLayout>
            <MyBets />
          </DashboardLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <DashboardLayout>
            <Profile />
          </DashboardLayout>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
