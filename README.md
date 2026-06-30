# 🌍 Wanderlust

Wanderlust is a travel-inspired web application built with **Node.js**, **Express**, **MongoDB**, and **Passport.js**.  
It allows users to sign up, log in, create listings, and leave reviews — all with a clean UI powered by **EJS templates** and **Bootstrap**.

---

## 🚀 Features
- User authentication (signup, login, logout) with Passport.js
- Flash messages for success/error feedback
- Listings management (CRUD operations)
- Review system linked to listings
- Session handling with `express-session`
- Error handling with custom `ExpressError`
- Organized routing (`listings`, `reviews`, `users`)

---

## 📂 Project Structure

Project/ │── app.js              # Main server file │── models/             # Mongoose models (User, Listing, Review) │── routes/             # Express routers │── utils/              # Custom error handling │── views/              # EJS templates │── public/             # Static assets (CSS, JS, images) │── package.json        # Dependencies and scripts │── README.md           # Documentation


---

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rakesh-200s/Project.git
   cd Project

Install dependencies

npm install

Set up environment variablesCreate a .env file in the root directory:

MONGO_URL=mongodb://127.0.0.1:27017/wanderlust
SESSION_SECRET=mysupersecretcode
PORT=8080

Run the server

npm start

Visit: http://localhost:8080

📝 Usage

Navigate to /signup to create a new account.

Log in with your credentials.

Create, edit, and delete listings.

Add reviews to listings.

Flash messages will guide you through actions.

🔧 Technologies Used

Node.js / Express.js

MongoDB / Mongoose

Passport.js (Local Strategy)

EJS / EJS-Mate

Bootstrap 5

connect-flash

method-override

📌 Future Improvements

Deploy to Heroku/Render with MongoDB Atlas

Add image upload for listings

Implement authorization (only owners can edit/delete)

Enhance UI with responsive design

👨‍💻 Author

Rakesh KumarGitHub: Rakesh-200s (github.com in Bing)


