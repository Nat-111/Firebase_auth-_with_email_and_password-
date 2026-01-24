import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/authContext";
import { useState, useEffect } from "react";
import { auth } from "../firebase";

export default function VerifyEmail() {
  const { user, logout, sendVerification } = UserAuth();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();

  // Timer for resend button to prevent spamming
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResend = async () => {
    if (countdown > 0) return;
    try {
      await sendVerification();
      setMessage("A fresh verification link has been sent to your inbox!");
      setError("");
      setCountdown(60); // 60 second cooldown
    } catch (err) {
      setError(`Failed to send: ${err.code || err.message}.`);
      setMessage("");
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      // Force reload the user to catch the emailVerified change
      if (auth.currentUser) {
        await auth.currentUser.reload();
        // The context will update automatically because onAuthStateChanged triggers
        if (auth.currentUser.emailVerified) {
          navigate("/accountpage");
        } else {
          setError("Email not verified yet. Please check your inbox and click the link.");
        }
      }
    } catch (err) {
      setError("Something went wrong while refreshing. Please try again.");
    } finally {
      setRefreshing(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="verify-page-wrapper">
      <div className="verify-card shadow-lg">
        <div className="verify-icon-container">
          <div className="icon-circle">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-indigo-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
        </div>

        <h2 className="verify-title">Verify Your Email</h2>

        <div className="verify-body">
          <p className="instruction-text">
            We've sent a verification link to your email address:
          </p>
          <div className="user-email-badge">
            {user?.email}
          </div>
          <p className="subtext">
            Click the link in the email to confirm your account. If you don't see it, <b>please check your spam folder</b>.
          </p>
        </div>

        {message && <div className="feedback-alert success">{message}</div>}
        {error && <div className="feedback-alert error-box">{error}</div>}

        <div className="verify-actions">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className={`btn-primary ${refreshing ? 'loading' : ''}`}
          >
            {refreshing ? 'Checking...' : 'I\'ve Verified My Email'}
          </button>

          <button
            onClick={handleResend}
            disabled={countdown > 0}
            className="btn-secondary"
          >
            {countdown > 0 ? `Resend in ${countdown}s` : 'Resend Email'}
          </button>

          <button onClick={handleLogout} className="btn-link">
            Use a different email address
          </button>
        </div>
      </div>

      <div className="help-footer">
        Need help? <a href="mailto:support@example.com">Contact Support</a>
      </div>
    </div>
  );
}
