import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { AppShell } from "@/layouts/AppShell";
import { AuthShell } from "@/layouts/AuthShell";
import { GuestRoute } from "@/features/auth/GuestRoute";
import { ProtectedRoute } from "@/features/auth/ProtectedRoute";
import { SignInPage } from "@/features/auth/pages/SignInPage";
import { SignUpPage } from "@/features/auth/pages/SignUpPage";
import { LandingPage } from "@/features/landing/pages/LandingPage";
import { HomePage } from "@/features/dashboard/pages/HomePage";
import { VehiclesPage } from "@/features/vehicles/pages/VehiclesPage";
import { AddVehiclePage } from "@/features/vehicles/pages/AddVehiclePage";
import { EditVehiclePage } from "@/features/vehicles/pages/EditVehiclePage";
import { VehicleDashboardPage } from "@/features/vehicles/pages/VehicleDashboardPage";
import { VehicleChatPage } from "@/features/ai-chat/pages/VehicleChatPage";
import { RemindersPage } from "@/features/reminders/pages/RemindersPage";
import { AddReminderPage } from "@/features/reminders/pages/AddReminderPage";
import { EditReminderPage } from "@/features/reminders/pages/EditReminderPage";
import { ExpensesPage } from "@/features/expenses/pages/ExpensesPage";
import { AddExpensePage } from "@/features/expenses/pages/AddExpensePage";
import { EditExpensePage } from "@/features/expenses/pages/EditExpensePage";
import { ProfilePage } from "@/features/profile/pages/ProfilePage";
import { UpdateProfilePage } from "@/features/profile/pages/UpdateProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    element: <GuestRoute />,
    children: [
      {
        element: <AuthShell />,
        children: [
          { path: "/sign-in", element: <SignInPage /> },
          { path: "/sign-up", element: <SignUpPage /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppShell />,
        children: [
          { path: "/app", element: <HomePage /> },
          { path: "/app/vehicles", element: <VehiclesPage /> },
          { path: "/app/vehicles/new", element: <AddVehiclePage /> },
          { path: "/app/vehicles/:carId/edit", element: <EditVehiclePage /> },
          { path: "/app/vehicles/:carId", element: <VehicleDashboardPage /> },
          { path: "/app/vehicles/:carId/chat", element: <VehicleChatPage /> },
          { path: "/app/reminders", element: <RemindersPage /> },
          { path: "/app/reminders/new", element: <AddReminderPage /> },
          { path: "/app/reminders/:reminderId/edit", element: <EditReminderPage /> },
          { path: "/app/expenses", element: <ExpensesPage /> },
          { path: "/app/expenses/new", element: <AddExpensePage /> },
          { path: "/app/expenses/:expenseId/edit", element: <EditExpensePage /> },
          { path: "/app/profile", element: <ProfilePage /> },
          { path: "/app/profile/update", element: <UpdateProfilePage /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}