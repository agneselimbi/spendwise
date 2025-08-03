import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./AuthContext";
import "./css/App.css";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Account from "./pages/Account";
import Budget from "./pages/Budget";
import Messages from "./pages/Messages";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  // Create a client
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // don’t refetch on window focus
        refetchOnWindowFocus: false,
        // only retry failed fetches twice
        retry: 2,
        // cache data for 5 minutes
        cacheTime: 1000 * 60 * 5,
        // consider data fresh for 1 minute
        staleTime: 1000 * 60 * 1,
      },
      mutations: {
        // retry mutations once on failure
        retry: 1,
        // run onSuccess callbacks even if data unchanged
        throwOnError: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/accounts"
                element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/transactions"
                element={
                  <ProtectedRoute>
                    <Transactions />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/budget"
                element={
                  <ProtectedRoute>
                    <Budget />
                  </ProtectedRoute>
                }
              />
              <Route path="/notifications" element={<Messages />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
