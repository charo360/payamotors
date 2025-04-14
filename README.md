# PayaMotors - Car Selling Website

A modern car selling website built with Next.js, Tailwind CSS, and Firebase.

## Features

- Modern UI with responsive design
- Car listings with detailed information
- Admin dashboard for managing car listings
- Role-based authentication (admin and user roles)
- Image upload and management
- Contact forms for inquiries

## Getting Started

### Prerequisites

- Node.js 18.x or later
- pnpm (recommended) or npm
- Firebase account

### Setup Firebase

1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password provider
3. Create a Firestore database
4. Create a Storage bucket
5. Get your Firebase configuration from Project Settings > General > Your apps > SDK setup and configuration

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Copy `.env.local.example` to `.env.local` and update with your Firebase configuration:
   ```bash
   cp .env.local.example .env.local
   ```
4. Update the `.env.local` file with your Firebase configuration values
5. Set up your first admin user:
   ```bash
   node scripts/setup-first-admin.js
   ```
   Follow the prompts to create your admin account.

6. Run the development server:
   ```bash
   pnpm dev
   ```
7. Open [http://localhost:3000](http://localhost:3000) in your browser
8. Access the admin dashboard at [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

### Firebase Setup

#### Authentication

The application uses Firebase Authentication with Email/Password provider. Make sure to enable this in your Firebase console.

#### Firestore Database

1. Create the following collections in your Firestore database:

   - `users` - Stores user information and roles
     - Fields: `email`, `role`, `createdAt`

   - `cars` - Stores car listings
     - Fields: `title`, `description`, `price`, `year`, `mileage`, `location`, `transmission`, `fuel`, `engine`, `color`, `interiorColor`, `features`, `images`, `seller`, `createdAt`, `updatedAt`

2. Set up Firestore Security Rules:

   - Go to Firebase Console > Firestore Database > Rules
   - Copy and paste the rules from the `firestore.rules` file in this repository
   - Click "Publish"

   **Important**: For the admin user creation script to work, you need to temporarily set your Firestore rules to allow writes:

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

   After creating your admin user, update the rules to the secure version in `firestore.rules`.

#### Storage

Create the following storage structure:

1. `/cars/{carId}/images/` - Stores car images

### Admin Account Management

Admin accounts can only be created and managed by authorized personnel using the provided scripts. These scripts should be run in a secure environment by trusted administrators.

#### Managing Admin Users

Use the admin management script to list, create, or delete admin users:

1. **List all admin users**:
   ```bash
   node scripts/manage-admins.js list
   ```

2. **Create an admin user**:
   ```bash
   node scripts/manage-admins.js create <email> <password>
   ```
   For example:
   ```bash
   node scripts/manage-admins.js create admin@payamotors.co.ke SecurePassword123
   ```

3. **Delete an admin user**:
   ```bash
   node scripts/manage-admins.js delete <uid>
   ```
   Where `<uid>` is the Firebase user ID of the admin user.

4. Login at `/admin/login` with the created admin credentials

## Development

### Project Structure

- `app/` - Next.js app router pages
- `components/` - React components
- `lib/` - Utility functions and Firebase configuration
- `hooks/` - Custom React hooks
- `public/` - Static assets
- `styles/` - Global styles

### Authentication Flow

The application uses Firebase Authentication with custom claims for role-based access control:

1. User registers or logs in with email/password
2. User role is stored in Firestore
3. Authentication state is managed through React Context
4. Protected routes check for authentication and role

## Deployment

1. Build the application:
   ```bash
   pnpm build
   ```

2. Deploy to your preferred hosting platform (Vercel recommended for Next.js):
   ```bash
   vercel
   ```

## License

This project is licensed under the MIT License.
# payamotors
