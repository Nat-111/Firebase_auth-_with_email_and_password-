import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  updateProfile
} from "firebase/auth";
import { auth } from "../firebase";

const UserContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function createUser(email, password, name) {
    console.log("Starting user creation for:", email);
    return createUserWithEmailAndPassword(auth, email, password)
      .then(
        async (userCredential) => {
          console.log("User created successfully, updating profile...");
          if (name) {
            await updateProfile(userCredential.user, { displayName: name });
          }
          console.log("Sending verification email (simple)...");
          await sendEmailVerification(userCredential.user);
          console.log("Verification email sent!");
          return userCredential;
        })
      .catch((error) => {
        console.error("Error in createUser:", error.code, error.message);
        throw error;
      });
  }

  function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function sendVerification() {
    if (user) {
      console.log("Manually resending verification email (simple)...");
      return sendEmailVerification(user)
        .then(() => {
          console.log("Resend successful!");
        })
        .catch((error) => {
          console.error("Resend failed:", error.code, error.message);
          throw error;
        });
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, createUser, signIn, logout, sendVerification, loading }}>
      {loading ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: '1rem'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '5px solid rgba(255, 255, 255, 0.3)',
            borderTop: '5px solid white',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite'
          }}></div>
          <p style={{ color: 'white', fontSize: '1.2rem', fontWeight: '600' }}>Loading...</p>
        </div>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
}

export function UserAuth() {
  return useContext(UserContext);
}
