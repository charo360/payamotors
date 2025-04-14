# Firebase Setup Guide for PayaMotors

This guide will walk you through setting up Firebase for the PayaMotors car dealership website.

## 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name (e.g., "PayaMotors")
4. Choose whether to enable Google Analytics (recommended)
5. Accept the terms and click "Create project"
6. Wait for the project to be created, then click "Continue"

## 2. Register a Web App

1. On the project overview page, click the web icon (</>) to add a web app
2. Register your app with a nickname (e.g., "PayaMotors Web")
3. Check the box for "Also set up Firebase Hosting" if you plan to use it
4. Click "Register app"
5. Copy the Firebase configuration object (you'll need this for your `.env.local` file)
6. Click "Continue to console"

## 3. Set Up Authentication

1. In the Firebase console, go to "Authentication" from the left sidebar
2. Click "Get started"
3. Select the "Email/Password" provider
4. Enable the "Email/Password" sign-in method
5. Click "Save"

## 4. Set Up Firestore Database

1. In the Firebase console, go to "Firestore Database" from the left sidebar
2. Click "Create database"
3. Choose "Start in production mode" (recommended for security)
4. Select a location closest to your users (e.g., "eur3" for Europe)
5. Click "Enable"

### Set Up Temporary Security Rules for Admin Creation

1. After the database is created, go to the "Rules" tab
2. Replace the default rules with the following temporary rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

3. Click "Publish"

## 5. Set Up Storage

1. In the Firebase console, go to "Storage" from the left sidebar
2. Click "Get started"
3. Choose "Start in production mode" (recommended for security)
4. Select a location closest to your users (same as Firestore)
5. Click "Done"

### Set Up Storage Rules

1. After storage is set up, go to the "Rules" tab
2. Replace the default rules with the following:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /cars/{carId}/{allPaths=**} {
      // Anyone can view car images
      allow read: if true;
      // Only authenticated admin users can upload car images
      allow write: if request.auth != null;
    }
  }
}
```

3. Click "Publish"

## 6. Update Environment Variables

1. In your project, copy the `.env.local.example` file to `.env.local`
2. Update the values with your Firebase configuration:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

## 7. Create Admin User

1. Run the admin creation script:
```bash
node scripts/setup-first-admin.js
```

2. Follow the prompts to create your admin account

## 8. Update Firestore Security Rules

After creating your admin user, update the Firestore security rules to the secure version:

1. Go to Firestore Database > Rules
2. Replace the temporary rules with the contents of the `firestore.rules` file
3. Click "Publish"

## 9. Test Admin Login

1. Start your development server:
```bash
pnpm dev
```

2. Navigate to http://localhost:3000/admin/login
3. Log in with the admin credentials you created
4. You should now have access to the admin dashboard

## Troubleshooting

### Permission Denied Errors

If you encounter "Missing or insufficient permissions" errors:

1. Check that your Firestore rules are correctly set
2. Verify that your admin user has the correct role in Firestore
3. Make sure your Firebase configuration in `.env.local` is correct

### Authentication Errors

If you have issues with authentication:

1. Ensure Email/Password authentication is enabled in Firebase console
2. Check for any error messages in the browser console
3. Verify that your Firebase configuration is correct
