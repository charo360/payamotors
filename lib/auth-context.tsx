"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { setAuthCookie, removeAuthCookie } from "./auth-cookies";

export type UserRole = "admin" | "user";

export interface UserData {
  uid: string;
  email: string | null;
  role: UserRole;
  displayName?: string | null;
  photoURL?: string | null;
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string, role?: UserRole) => Promise<UserCredential>;
  logout: () => Promise<void>;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get user data from Firestore
        const userData = await getUserData(firebaseUser);
        setUser(userData);

        // Set auth cookies (token and role)
        await setAuthCookie(firebaseUser);
      } else {
        setUser(null);

        // Remove auth cookies
        removeAuthCookie();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getUserData = async (firebaseUser: User): Promise<UserData> => {
    try {
      const userRef = doc(db, "users", firebaseUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        // User exists in Firestore, return the data
        const userData = userSnap.data() as Omit<UserData, "uid">;
        return {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          ...userData,
        };
      } else {
        // User doesn't exist in Firestore yet, create with default role
        const newUserData: UserData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          role: "user", // Default role
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        };

        // Save to Firestore
        await setDoc(userRef, {
          email: newUserData.email,
          role: newUserData.role,
          displayName: newUserData.displayName,
          photoURL: newUserData.photoURL,
        });

        return newUserData;
      }
    } catch (error) {
      console.error("Error getting user data:", error);
      // Return basic user data if Firestore fetch fails
      return {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        role: "user", // Default role
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
      };
    }
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string, role: UserRole = "user") => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Create user document in Firestore with role
    const userRef = doc(db, "users", userCredential.user.uid);
    await setDoc(userRef, {
      email: userCredential.user.email,
      role: role,
      createdAt: new Date().toISOString(),
    });

    return userCredential;
  };

  const logout = () => {
    return signOut(auth);
  };

  const isAdmin = () => {
    return user?.role === "admin";
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    logout,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
