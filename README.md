# Tie Pie Restaurant Website

A premium Egyptian restaurant website built with Next.js, Firebase, and Tailwind CSS.

## Features

### Customer-Facing Website
- **Homepage**: Hero section, featured dishes, experience section, testimonials
- **Story Page**: Restaurant history and philosophy
- **Menu Page**: Complete menu with category filtering
- **Online Ordering**: Shopping cart and checkout system
- **Table Booking**: Reservation system with date/time selection

### Admin Dashboard
- **Dashboard**: Statistics and recent orders/bookings overview
- **Orders Management**: View and update order statuses
- **Bookings Management**: Manage table reservations
- **Menu Management**: Full CRUD operations for menu items

## Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom Arabic design system
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **Forms**: React Hook Form
- **Icons**: Lucide React

## Setup Instructions

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable the following services:
   - **Authentication**: Enable Email/Password provider
   - **Firestore Database**: Create in production mode
   - **Storage**: Enable for menu images

### 2. Firebase Configuration

1. In your Firebase project, go to Project Settings
2. Add a web app and copy the configuration
3. Create a `.env.local` file in the root directory:

\`\`\`env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
\`\`\`

### 3. Firestore Security Rules

Set up the following Firestore rules:

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access for menu items and testimonials
    match /menuItems/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /testimonials/{document} {
      allow read: if resource.data.isVisible == true;
      allow write: if request.auth != null;
    }
    
    // Public write for orders and bookings, admin read
    match /orders/{document} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    
    match /bookings/{document} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
\`\`\`

### 4. Firebase Storage Rules

\`\`\`javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /menu_images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
\`\`\`

### 5. Create Admin User

1. Go to Firebase Authentication
2. Add a user manually with email and password
3. Use these credentials to access the admin dashboard

### 6. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 7. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000` to see the website.

## Database Structure

### Collections

#### menuItems
- `nameAR` (string): Arabic name
- `descriptionAR` (string): Arabic description
- `price` (number): Price in Egyptian pounds
- `category` (string): One of the predefined categories
- `imageUrl` (string): Firebase Storage URL
- `isAvailable` (boolean): Availability status
- `featured` (boolean): Featured on homepage

#### bookings
- `customerName` (string): Customer name
- `phone` (string): Phone number
- `numberOfGuests` (number): Number of guests
- `bookingDate` (timestamp): Booking date and time
- `status` (string): pending, confirmed, cancelled
- `createdAt` (timestamp): Creation timestamp

#### orders
- `customerDetails` (map): name, phone, address
- `items` (array): Array of order items
- `totalPrice` (number): Total order price
- `status` (string): pending, confirmed, out_for_delivery, completed
- `createdAt` (timestamp): Creation timestamp

#### testimonials
- `author` (string): Customer name
- `quoteAR` (string): Arabic testimonial
- `isVisible` (boolean): Display status

## Deployment

### Firebase Hosting

1. Install Firebase CLI:
\`\`\`bash
npm install -g firebase-tools
\`\`\`

2. Login to Firebase:
\`\`\`bash
firebase login
\`\`\`

3. Initialize Firebase in your project:
\`\`\`bash
firebase init hosting
\`\`\`

4. Build the project:
\`\`\`bash
npm run build
\`\`\`

5. Deploy:
\`\`\`bash
firebase deploy
\`\`\`

## Design System

### Colors
- **Primary Burgundy**: #5D1A23 (buttons, accents)
- **Primary Green**: #4A572C (alternate backgrounds)
- **Accent Beige**: #E1D8CF (light backgrounds)
- **Text Light**: #F5F5F5 (text on dark backgrounds)
- **Text Dark**: #1A1A1A (text on light backgrounds)

### Typography
- **Font**: Amiri (Arabic serif font)
- **Titles**: Bold weight
- **Body**: Normal weight

## Features Overview

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface

### Performance
- Next.js App Router for optimal performance
- Image optimization with Next.js Image component
- Server-side rendering for SEO

### Security
- Firebase Authentication for admin access
- Firestore security rules
- Input validation with React Hook Form

### User Experience
- Arabic RTL layout
- Smooth animations and transitions
- Loading states and error handling
- Shopping cart with persistent state

## Admin Access

Default admin route: `/admin/login`

Use the email and password you created in Firebase Authentication to access the admin dashboard.

## Support

For technical support or questions about the implementation, please refer to the documentation or create an issue in the project repository.
# tie-pie
