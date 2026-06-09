# CodeAlpha Social Media

A simple social media web app built with Node.js, Express, MongoDB, and EJS. Users can register, log in, create posts, view a public feed, and like/unlike posts.

## 🚀 Features

- User registration and login
- Secure password hashing using bcrypt
- Session-based authentication with `express-session`
- MongoDB storage for users and posts
- Create new posts from the profile page
- Public feed showing all posts with author details
- Like/unlike posts
- Profile page with user posts

## 🧱 Tech Stack

- Node.js
- Express
- MongoDB / Mongoose
- EJS templating
- bcryptjs
- express-session
- connect-mongo
- dotenv

## 📁 Project Structure

- `app.js` — main application entry
- `config/db.js` — MongoDB connection setup
- `controllers/` — route handler logic
- `middleware/` — auth middleware
- `models/` — Mongoose schemas for User and Post
- `routes/` — auth and post routes
- `views/` — EJS templates for pages
- `public/` — static assets like CSS and scripts

## ⚙️ Installation

1. Clone the repository

```bash
git clone https://github.com/hammad308/CodeAlpha_SocialMedia.git
cd CodeAlpha_SocialMedia
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the project root with the following values:

```env
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
PORT=3000
```

4. Start the app

```bash
npm run dev
```

5. Open your browser at:

```text
http://localhost:3000
```

## 🔧 Usage

- Visit `/register` to create a new account.
- Visit `/login` to sign in.
- After login, access the profile page at `/profile` to create posts and view personal posts.
- Visit `/feed` to view the global feed and like/unlike posts.
- Use `/logout` to sign out.

## 🛠️ Available Scripts

- `npm start` — run the app with Node
- `npm run dev` — run the app with nodemon for development

## ✨ Notes

- The app uses session authentication and requires a working MongoDB connection.
- Passwords are hashed using `bcryptjs` before storage.

## 📌 Improvements

Potential next steps:

- Add validation and user-friendly error messages
- Add file uploads for profile pictures
- Add comment support and post editing
- Improve UI/UX with responsive design

## 📄 License

This project is licensed under the ISC License.
