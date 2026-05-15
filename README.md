# Vibe Thought

A minimal, elegant, and modern social media application built with a focus on luxury aesthetics and seamless user experience. Share your thoughts, upload images, and interact with a community of vibes.

## ✨ Features

- **Modern UI/UX**: Designed with Tailwind CSS 4, featuring glassmorphism, smooth transitions, and a premium "zinc" dark theme.
- **Image Sharing**: Upload and store images securely using ImageKit integration.
- **Dynamic Feeds**: View posts in a responsive, beautifully formatted feed.
- **Interactive Likes**: Like posts with persistent state (stored in MongoDB and localized for the user).
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop screens.
- **Anonymous Posting**: Share anonymously or use a custom username.

## 🚀 Tech Stack

### Frontend
- **React 19**
- **Vite**
- **Tailwind CSS 4**
- **Lucide React** (Icons)
- **Axios** (API Client)
- **React Router 7**

### Backend
- **Node.js & Express**
- **MongoDB & Mongoose**
- **ImageKit SDK** (Cloud Storage)
- **Multer** (File Handling)

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB instance
- ImageKit.io account for image storage

### 1. Clone the repository
```bash
git clone https://github.com/Subhadipjana95/simple_posts.git
cd simple_posts
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.sample.env`:
   ```env
   # Database
   MONGO_URI=your_mongodb_connection_string
   
   # ImageKit Credentials
   IMAGEKIT_PRIVATE_KEY=your_private_key
   ```
4. Start the server:
   ```bash
   npm start
   ```

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```env
   VITE_BACKEND_URL=http://localhost:3000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 📄 License
This project is licensed under the ISC License.

---
Built with ❤️ by [Subhadip Jana](https://github.com/Subhadipjana95)