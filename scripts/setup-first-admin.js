/**
 * This script creates the first admin user for your dealership.
 * Run this script once to set up the initial admin account.
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, setDoc } = require('firebase/firestore');
const readline = require('readline');

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt for admin email and password
rl.question('Enter admin email: ', (email) => {
  rl.question('Enter admin password (min 6 characters): ', async (password) => {
    try {
      // Validate input
      if (!email || !email.includes('@')) {
        console.error('Please provide a valid email address.');
        rl.close();
        process.exit(1);
      }

      if (!password || password.length < 6) {
        console.error('Password must be at least 6 characters long.');
        rl.close();
        process.exit(1);
      }

      // Create user in Firebase Authentication
      console.log(`Creating admin user: ${email}...`);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log(`User created with UID: ${user.uid}`);

      // Add admin role to user in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: 'admin',
        createdAt: new Date().toISOString(),
      });

      console.log(`Admin role assigned to user: ${email}`);
      console.log('\nAdmin user created successfully!');
      console.log('\nYou can now log in at: http://localhost:3000/admin/login');

      rl.close();
      process.exit(0);
    } catch (error) {
      console.error('Error creating admin user:', error.message);

      // Provide helpful guidance based on the error
      if (error.message.includes('PERMISSION_DENIED')) {
        console.error('\nFirestore permission denied. Please check your Firestore security rules:');
        console.error('1. Go to Firebase Console > Firestore Database > Rules');
        console.error('2. Temporarily set rules to allow all reads and writes:');
        console.error(`
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /{document=**} {
        allow read, write: if true;
      }
    }
  }
`);
        console.error('3. Click "Publish" and try running this script again');
        console.error('4. After creating the admin user, update the rules to the secure version in firestore.rules');
      } else if (error.message.includes('auth/email-already-in-use')) {
        console.error('\nThis email is already registered. You can:');
        console.error('1. Use a different email address');
        console.error('2. If this is your account, try logging in at http://localhost:3000/admin/login');
        console.error('3. If you need to reset the password, use the Firebase Console Authentication section');
      } else if (error.message.includes('auth/weak-password')) {
        console.error('\nThe password is too weak. Please use a stronger password (at least 6 characters).');
      } else if (error.message.includes('auth/invalid-email')) {
        console.error('\nThe email address is invalid. Please provide a valid email address.');
      } else if (error.message.includes('auth/network-request-failed')) {
        console.error('\nNetwork request failed. Please check your internet connection and Firebase configuration in .env.local');
      }

      console.error('\nFor detailed setup instructions, see FIREBASE_SETUP.md');

      rl.close();
      process.exit(1);
    }
  });
});
