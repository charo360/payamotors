"use client";

import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Cookies from "js-cookie";
import { db } from "./firebase";

// Set auth cookies when user logs in
export const setAuthCookie = async (user: User) => {
  // Set the token cookie
  const token = await user.getIdToken();
  Cookies.set("firebase-auth-token", token, {
    expires: 14, // 14 days
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  // Get user role from Firestore and set role cookie
  try {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      Cookies.set("user-role", userData.role || "user", {
        expires: 14, // 14 days
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    }
  } catch (error) {
    console.error("Error getting user role:", error);
    // Set default role cookie if Firestore fetch fails
    Cookies.set("user-role", "user", {
      expires: 14, // 14 days
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  }
};

// Remove auth cookies when user logs out
export const removeAuthCookie = () => {
  Cookies.remove("firebase-auth-token");
  Cookies.remove("user-role");
};
