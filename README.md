# 🌍 SafarStay

SafarStay is a modern travel listings web app built with Node.js, Express, MongoDB, and EJS. It lets travellers explore property listings, upload photos, share reviews, and manage listings through a polished user experience.

## ✨ Features

- ✅ User authentication with Passport.js and Passport-Local
- 🏠 Create, edit, and delete travel listings
- 🖼️ Upload listing images to Cloudinary
- ⭐ Add and remove reviews for stays
- 🧠 Session storage in MongoDB using `connect-mongo`
- 🔔 Flash notifications for success and error feedback
- 🌐 Geocoding via OpenStreetMap/Nominatim for listing coordinates
- 🧩 Modular EJS views with `ejs-mate` layout support

## 📁 Project Structure

- `app.js` — main Express application entry point
- `cloudConfig.js` — Cloudinary upload and storage config
- `controllers/` — business logic for listings, reviews, and users
- `models/` — Mongoose schemas for `Listing`, `Review`, and `User`
- `routes/` — HTTP route definitions
- `views/` — EJS templates for UI rendering
- `public/` — CSS, client-side JavaScript, and static assets
- `utils/` — custom error handling and async helpers
- `middleware.js` — auth, validation, and authorization middleware

## ⚙️ Requirements

- Node.js 22.x (recommended)
- MongoDB Atlas or a local MongoDB server
- Cloudinary account for image uploads

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following values:

```env
NODE_ENV=development
ATLAS_URL=<your-mongodb-connection-string>
SECRET=<your-session-secret>
CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUD_API_KEY=<your-cloudinary-api-key>
CLOUD_API_SECRET=<your-cloudinary-api-secret>
```

## 🚀 Setup

```bash
git clone <repo-url>
cd MajorProject
npm install
node app.js
```

Then open:

```text
http://localhost:8080
```

## 🧭 How to Use

- 🔐 Visit `/signup` to create a new account
- 🔑 Visit `/login` to sign in
- 🏘️ Browse all stays at `/listings`
- ✍️ Create and manage your own listings when signed in
- 💬 Add reviews to listings and delete your own reviews

## 💡 Notes

- Sessions are stored in MongoDB with `connect-mongo`
- Images upload to Cloudinary under the `safarstay_DEV` folder
- Location data is converted to latitude/longitude with OpenStreetMap Nominatim

## 📦 Dependencies

- `express`
- `ejs`
- `ejs-mate`
- `mongoose`
- `passport`
- `passport-local`
- `passport-local-mongoose`
- `express-session`
- `connect-mongo`
- `cloudinary`
- `multer`
- `multer-storage-cloudinary`
- `connect-flash`
- `dotenv`
- `joi`
- `method-override`

## 🌱 What’s Next

- Add unit and integration tests for key user flows
- Improve responsive design and mobile experience
- Add search, filter, and favorites features for listings
- Add user profiles and review history
- Prepare deployment configuration for production
