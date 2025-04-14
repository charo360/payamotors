/**
 * This script helps manage admin users in Firebase Authentication and Firestore.
 * Run this script locally with Node.js to list, create, or delete admin users.
 *
 * Usage:
 * - List all admin users:   node scripts/manage-admins.js list
 * - Create an admin user:   node scripts/manage-admins.js create <email> <password>
 * - Delete an admin user:   node scripts/manage-admins.js delete <uid>
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const { initializeApp } = require('firebase/app');
const {
  getAuth,
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword
} = require('firebase/auth');
const {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc
} = require('firebase/firestore');

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

// List all admin users
async function listAdminUsers() {
  try {
    // Query Firestore for users with role 'admin'
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('role', '==', 'admin'));
    const querySnapshot = await getDocs(q);

    console.log('\nAdmin Users:');
    console.log('===========');

    if (querySnapshot.empty) {
      console.log('No admin users found.');
    } else {
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        console.log(`UID: ${doc.id}`);
        console.log(`Email: ${userData.email}`);
        console.log(`Created: ${userData.createdAt}`);
        console.log('-------------------');
      });
    }

    process.exit(0);
  } catch (error) {
    console.error('Error listing admin users:', error.message);

    if (error.message.includes('PERMISSION_DENIED')) {
      console.error('\nFirestore permission denied. Please check your Firestore security rules.');
      console.error('See FIREBASE_SETUP.md for detailed instructions.');
    }

    process.exit(1);
  }
}

// Create an admin user
async function createAdminUser(email, password) {
  try {
    // Create user in Firebase Authentication
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
    console.log('Admin user created successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error.message);

    // Provide helpful guidance based on the error
    if (error.message.includes('PERMISSION_DENIED')) {
      console.error('\nFirestore permission denied. Please check your Firestore security rules.');
      console.error('See FIREBASE_SETUP.md for detailed instructions.');
    } else if (error.message.includes('auth/email-already-in-use')) {
      console.error('\nThis email is already registered.');
    } else if (error.message.includes('auth/weak-password')) {
      console.error('\nThe password is too weak. Please use a stronger password (at least 6 characters).');
    } else if (error.message.includes('auth/invalid-email')) {
      console.error('\nThe email address is invalid. Please provide a valid email address.');
    }

    process.exit(1);
  }
}

// Delete an admin user
async function deleteAdminUser(uid) {
  try {
    // First, check if the user exists and is an admin
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      console.error(`User with UID ${uid} not found.`);
      process.exit(1);
    }

    const userData = userDoc.data();
    if (userData.role !== 'admin') {
      console.error(`User with UID ${uid} is not an admin.`);
      process.exit(1);
    }

    // Delete the user from Firestore
    await deleteDoc(userRef);
    console.log(`User document deleted from Firestore.`);

    // Delete the user from Firebase Authentication
    // Note: This requires the user to be signed in, which is not possible in this script
    // You would need to use Firebase Admin SDK to delete users without signing in
    console.log(`To delete the user from Firebase Authentication, please use the Firebase Console.`);
    console.log(`https://console.firebase.google.com/project/${firebaseConfig.projectId}/authentication/users`);

    process.exit(0);
  } catch (error) {
    console.error('Error deleting admin user:', error.message);

    if (error.message.includes('PERMISSION_DENIED')) {
      console.error('\nFirestore permission denied. Please check your Firestore security rules.');
      console.error('See FIREBASE_SETUP.md for detailed instructions.');
    }

    process.exit(1);
  }
}

// Parse command line arguments
const command = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];

// Execute the appropriate command
switch (command) {
  case 'list':
    listAdminUsers();
    break;
  case 'create':
    if (!arg1 || !arg2) {
      console.error('Usage: node scripts/manage-admins.js create <email> <password>');
      process.exit(1);
    }
    createAdminUser(arg1, arg2);
    break;
  case 'delete':
    if (!arg1) {
      console.error('Usage: node scripts/manage-admins.js delete <uid>');
      process.exit(1);
    }
    deleteAdminUser(arg1);
    break;
  default:
    console.error('Usage:');
    console.error('  List all admin users:   node scripts/manage-admins.js list');
    console.error('  Create an admin user:   node scripts/manage-admins.js create <email> <password>');
    console.error('  Delete an admin user:   node scripts/manage-admins.js delete <uid>');
    process.exit(1);
}
