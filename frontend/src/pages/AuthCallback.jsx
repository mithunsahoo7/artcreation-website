import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../lib/AuthContext";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
export default function AuthCallback() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const hash = window.location.hash || "";
    const m = hash.match(/session_id=([^&]+)/);
    const session_id = m ? decodeURIComponent(m[1]) : null;

    if (!session_id) {
      navigate("/login", { replace: true });
      return;
    }

    (async () => {
      try {
        const res = await axios.post(
          `${API}/auth/session`,
          { session_id },
          { withCredentials: true }
        );
        setUser(res.data);
        // Strip fragment and land on admin
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search
        );
        navigate("/admin/enquiries", { replace: true });
      } catch (e) {
        navigate("/login", { replace: true, state: { error: "Auth failed" } });
      }
    })();
  }, [navigate, setUser]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="mt-6 overline">Signing you in…</p>
      </div>
    </section>
  );
}
