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


<img width="1456" height="795" alt="Screenshot 2026-04-20 at 2 34 28 AM" src="https://github.com/user-attachments/assets/5ad89db2-0e40-4770-ab3b-b1961acf897a" />




<img width="1465" height="781" alt="Screenshot 2026-04-20 at 2 34 39 AM" src="https://github.com/user-attachments/assets/8cf1dce6-d51c-4be2-8a30-ef7edaa93ab7" />



<img width="1469" height="799" alt="Screenshot 2026-04-20 at 2 35 28 AM" src="https://github.com/user-attachments/assets/d4796e62-6855-4ac3-83a4-ab1f2bb48405" />




<img width="778" height="731" alt="Screenshot 2026-04-20 at 2 34 58 AM" src="https://github.com/user-attachments/assets/9ef837ea-0098-4c8c-8963-5dc2e6acea3a" />


<img width="775" height="737" alt="Screenshot 2026-04-20 at 2 35 13 AM" src="https://github.com/user-attachments/assets/b270832e-a68a-4655-90e0-028515335c17" />



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
