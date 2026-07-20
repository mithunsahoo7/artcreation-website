import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading || user === null) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
