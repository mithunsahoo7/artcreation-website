import React, { useEffect, useState } from "react";
import axios from "axios";
import { LogOut } from "lucide-react";
import Reveal from "../components/Reveal";
import { useAuth } from "../lib/AuthContext";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Admin() {
  const { user, logout } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await axios.get(`${API}/enquiries`, {
          withCredentials: true,
        });
        if (mounted) setItems(res.data || []);
      } catch (e) {
        if (mounted) setError("Failed to load enquiries.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="pt-40 pb-32 min-h-screen bg-white">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="flex items-start justify-between flex-wrap gap-6">
          <div>
            <p className="overline mb-6">Admin · Enquiries</p>
            <h1 className="font-display font-black tracking-tighter text-5xl md:text-7xl leading-[0.9]">
              Enquiries<span className="text-accent">.</span>
            </h1>
          </div>
          {user && (
            <div
              data-testid="admin-user-card"
              className="flex items-center gap-3 border border-hair px-4 py-3 bg-alt"
            >
              {user.picture ? (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-display font-black">
                  {(user.name || "?").charAt(0)}
                </div>
              )}
              <div className="text-sm">
                <p className="font-display font-black leading-tight">
                  {user.name}
                </p>
                <p className="text-xs text-black/60">{user.email}</p>
              </div>
              <button
                data-testid="logout-btn"
                onClick={logout}
                className="ml-3 inline-flex items-center gap-2 text-xs uppercase tracking-widest font-mono-tag text-black/70 hover:text-accent"
                aria-label="Sign out"
              >
                <LogOut size={14} /> Sign out
              </button>
            </div>
          )}
        </div>

        <div
          className="mt-10 border border-hair overflow-hidden"
          data-testid="admin-enquiries"
        >
          <div className="grid grid-cols-12 gap-4 px-4 md:px-6 py-4 bg-alt border-b border-hair text-[11px] font-mono-tag uppercase tracking-widest text-black/60">
            <span className="col-span-3">Name / Company</span>
            <span className="col-span-3">Email / Phone</span>
            <span className="col-span-2">Service</span>
            <span className="col-span-3">Message</span>
            <span className="col-span-1 text-right">Date</span>
          </div>

          {loading ? (
            <p className="p-6 text-black/60">Loading enquiries…</p>
          ) : error ? (
            <p className="p-6 text-accent">{error}</p>
          ) : items.length === 0 ? (
            <p data-testid="no-enquiries" className="p-6 text-black/60">
              No enquiries yet. Submissions from the Contact form will appear
              here.
            </p>
          ) : (
            items.map((it, i) => (
              <Reveal key={it.id} delay={0.02 * i}>
                <div
                  data-testid={`enquiry-row-${i}`}
                  className="grid grid-cols-12 gap-4 px-4 md:px-6 py-5 border-b border-hair items-start"
                >
                  <div className="col-span-3">
                    <p className="font-display font-black text-base">
                      {it.name}
                    </p>
                    <p className="text-xs text-black/60">{it.company || "—"}</p>
                  </div>
                  <div className="col-span-3 text-sm text-black/70 break-words">
                    <p>{it.email}</p>
                    <p className="text-xs text-black/50">{it.phone || "—"}</p>
                  </div>
                  <div className="col-span-2 text-sm">{it.service || "—"}</div>
                  <div className="col-span-3 text-sm text-black/70">
                    {it.message}
                  </div>
                  <div className="col-span-1 text-xs text-black/50 text-right font-mono-tag">
                    {new Date(it.created_at).toLocaleDateString("en-IN")}
                  </div>
                </div>
              </Reveal>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
