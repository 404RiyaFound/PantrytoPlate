# Pantry to Plate - AI Recipe Builder 🍳🤖

## 🎯 Problem Statement
**Who is the user?** Home cooks, students, or working professionals who often find themselves with a random assortment of leftover ingredients in their kitchen and no idea what to make. 
**What problem are we solving?** Reducing food waste and decision fatigue by intelligently generating structured, delicious recipes based *only* on what the user currently has available.
**Why does it matter?** It saves time, saves money on unnecessary grocery runs, and encourages creative cooking while eliminating the daily "what's for dinner?" stress.

## ✨ Core Features
1. **Pantry Management (CRUD):** Users can add, view, and delete ingredients they currently have at home.
2. **AI Recipe Generator:** Uses Google Gemini AI to analyze selected pantry ingredients, cuisine preferences, and time limits to generate a strict, structured recipe.
3. **Recipe Dashboard:** Users can view their generated recipes, save them to their favorites, and delete them.
4. **Authentication:** Secure Email/Password login and signup protecting user-specific data.

## 🛠️ Tech Stack
*   **Frontend:** React (Vite), Tailwind CSS, Framer Motion (animations), Lucide React (icons)
*   **Backend:** Firebase (Authentication, Firestore Database)
*   **AI Integration:** Google Gemini API (gemini-flash-latest)
*   **State Management:** React Context API
*   **Routing:** React Router DOM (with Lazy Loading)

## 🚀 Setup Instructions
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env.local` file in the root directory.
4. Add your Firebase config and Gemini API key:
   ```env
   VITE_FIREBASE_API_KEY=your_key
   VITE_FIREBASE_AUTH_DOMAIN=your_domain
   VITE_FIREBASE_PROJECT_ID=your_id
   VITE_FIREBASE_STORAGE_BUCKET=your_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_GEMINI_API_KEY=your_gemini_key
   ```
5. Run `npm run dev` to start the development server.
