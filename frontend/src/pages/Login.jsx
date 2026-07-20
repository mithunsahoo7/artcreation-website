import React from "react";
import { useLocation } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import RevealLines from "../components/RevealLines";
import Reveal from "../components/Reveal";

// REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
export default function Login() {
  const location = useLocation();
  const error = location.state?.error;

  const startGoogleAuth = () => {
    const redirectUrl = window.location.origin + "/admin/enquiries";
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(
      redirectUrl
    )}`;
  };

  return (
    <section className="pt-40 pb-32 min-h-screen bg-white grain relative">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-12 gap-6 md:gap-10">
        <div className="col-span-12 md:col-span-7">
          <p className="overline mb-8">Sign in · Studio Access</p>
          <RevealLines
            as="h1"
            dataTestId="login-title"
            className="font-display font-black leading-[0.9] tracking-tighter text-6xl md:text-8xl lg:text-9xl"
            lines={[
              "Studio",
              <>
                access<span className="text-accent italic font-medium">.</span>
              </>,
            ]}
          />
          <Reveal delay={0.2}>
            <p className="mt-10 text-lg text-black/70 max-w-xl leading-relaxed">
              This area is for the Art Creation team only. Sign in with your
              Google account to view enquiries and manage the studio&apos;s
              inbox.
            </p>
          </Reveal>
        </div>

        <div className="col-span-12 md:col-span-5">
          <Reveal delay={0.15}>
            <div
              data-testid="login-card"
              className="border border-hair p-8 md:p-10 bg-alt"
            >
              <div className="flex items-center gap-3 mb-8">
                <ShieldCheck size={18} className="text-accent" />
                <span className="overline">Secured by Emergent Auth</span>
              </div>
              <h2 className="font-display font-black tracking-tighter text-3xl md:text-4xl leading-tight">
                Sign in to continue.
              </h2>
              <p className="mt-4 text-sm text-black/70">
                We use Google Sign-in to authenticate studio access. No
                passwords stored on our servers.
              </p>

              <button
                data-testid="google-signin-btn"
                onClick={startGoogleAuth}
                className="mt-8 w-full inline-flex items-center justify-center gap-3 bg-black text-white py-4 px-6 rounded-full font-medium hover:bg-accent transition-colors"
              >
                <GoogleGlyph />
                <span>Sign in with Google</span>
                <ArrowRight size={16} />
              </button>

              {error && (
                <p
                  data-testid="login-error"
                  className="mt-6 text-sm text-accent"
                >
                  {error}. Please try again.
                </p>
              )}

              <p className="mt-8 text-[11px] text-black/50 leading-relaxed">
                By continuing you consent to a short-lived session cookie
                (7 days) used only to keep you signed in.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function GoogleGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.4 14.6 2.4 12 2.4 6.9 2.4 2.7 6.6 2.7 12s4.2 9.6 9.3 9.6c5.4 0 9-3.8 9-9.1 0-.6-.1-1.1-.2-1.6H12z"
      />
    </svg>
  );
}
