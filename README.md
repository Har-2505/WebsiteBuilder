# GenWeb.ai - AI-Powered Website Builder

An AI-driven full-stack web application that generates production-grade, responsive websites from natural language prompts using DeepSeek via OpenRouter, React, Node.js, Express, and MongoDB.

---

## Features

- **AI-Powered Code Generation**: Generate complete, multi-section responsive websites (HTML, CSS, JS) from a single prompt.
- **Live Code Editor**: In-browser real-time preview and editing of generated websites.
- **Conversational Iterations**: Chat with the AI to modify and refine your site dynamically.
- **Firebase Authentication**: One-click Google sign-in.
- **Credit & Tier System**:
  - 100 free credits upon sign-up.
  - Credit consumption per generation and refinement.
  - Tier upgrade support (Free / Pro / Enterprise) with built-in Demo Sandbox top-up.
- **Public Site Hosting**: Live website preview links for each generated site.

---

## Tech Stack

- **Frontend**: React (Vite), Redux Toolkit, Tailwind CSS, Motion (Framer Motion), Lucide Icons, Axios.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT, Cookie-Parser, CORS.
- **AI**: DeepSeek Chat via OpenRouter API.
- **Auth**: Firebase Authentication (Google OAuth).

---

## Project Structure

```
WebsiteBuilder/
├── client/              # React (Vite) Frontend
│   ├── src/
│   │   ├── components/  # Modal, UI components
│   │   ├── hooks/       # Custom hooks (useGetCurrentUser)
│   │   ├── pages/       # Home, Generate, Editor, LiveSite, Pricing, Dashboard
│   │   ├── redux/       # User & global store
│   │   └── firebase.js  # Firebase client configuration
│   └── package.json
├── server/              # Express / Node.js Backend
│   ├── config/          # DB, OpenRouter, Stripe configs
│   ├── controllers/     # Auth, User, Website, Billing controllers
│   ├── middlewares/     # JWT authentication middleware
│   ├── models/          # User & Website Mongoose models
│   ├── routes/          # Express route definitions
│   ├── utils/           # JSON parser & extractors
│   └── package.json
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas database URI
- OpenRouter API Key
- Firebase Web App configuration

### 1. Clone the repository
```bash
git clone https://github.com/Har-2505/WebsiteBuilder.git
cd WebsiteBuilder
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` folder:
```env
PORT=8000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENROUTER_API_KEY=your_openrouter_api_key
FRONTEND_URL=http://localhost:5173
STRIPE_SECRET_KEY=optional_stripe_key
STRIPE_WEBHOOK_SECRET=optional_webhook_key
```
Start the server:
```bash
npm run dev
# or
nodemon index.js
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```
Create a `.env` file in the `client` folder:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
```
Start the frontend dev server:
```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## License
MIT
