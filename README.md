# 💬 Chattyply

> **Real-time chat — beautifully crafted.**

Chattyply is a full-stack real-time messaging application built with the MERN stack and Socket.IO. It features a modern, glassmorphism-inspired UI with 30+ theme options, image sharing, online presence indicators, and seamless Docker deployment.

---

## ✨ Features

- ⚡ **Real-time messaging** powered by Socket.IO
- 🟢 **Live online/offline presence** indicators
- 🖼️ **Image sharing** in conversations
- 🎨 **30+ themes** (dark, light, synthwave, dracula & more via DaisyUI)
- 🔐 **JWT authentication** with secure HTTP-only cookies
- 👤 **Profile management** with avatar upload (Cloudinary)
- 🔍 **Contact search** in the sidebar
- 📱 **Fully responsive** — works on mobile, tablet, and desktop
- 🐳 **Docker-ready** — one command to run everything

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, TailwindCSS, DaisyUI |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (with Mongoose) |
| **Real-time** | Socket.IO |
| **Auth** | JWT + bcrypt |
| **Storage** | Cloudinary (profile images) |
| **Deployment** | Docker, Docker Compose, Nginx |

---

## 🚀 Quick Start (Docker)

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) installed and running
- [Docker Compose plugin](https://docs.docker.com/compose/install/) (v2)

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/chattyply.git
cd chattyply
```

### 2. Create the environment file
```bash
cp .env.example .env
```
Edit `.env` with your values:
```env
# Database
MONGODB_URI=mongodb://root:admin@mongo:27017/chatApp?authSource=admin

# Auth
JWT_SECRET=your_strong_secret_key_here

# Server
PORT=5001
NODE_ENV=production

# Cloudinary (for profile picture uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Build and run
```bash
docker compose up -d --build
```

### 4. Open in browser
```
http://localhost:8080
```

---

## 🗂️ Project Structure

```
chattyply/
├── frontend/               # React + Vite app
│   ├── src/
│   │   ├── components/     # Navbar, Sidebar, ChatContainer, etc.
│   │   ├── pages/          # Login, Signup, Home, Profile, Settings
│   │   ├── store/          # Zustand state management
│   │   └── lib/            # Axios instance, utilities
│   ├── nginx.conf          # Nginx reverse proxy config
│   └── Dockerfile
│
├── backend/                # Express.js API + Socket.IO server
│   ├── src/
│   │   ├── controllers/    # Auth, Message controllers
│   │   ├── models/         # User, Message schemas
│   │   ├── routes/         # API routes
│   │   ├── middleware/      # JWT auth middleware
│   │   └── lib/            # DB, Socket, Cloudinary, Utils
│   └── Dockerfile
│
├── docker-compose.yml      # Orchestrates frontend + backend + mongo
└── .env                    # Environment variables (not committed)
```

---

## 🐳 Docker Services

| Service | Port | Description |
|---------|------|-------------|
| `frontend` | `8080` | React app served via Nginx |
| `backend` | `5001` | Express API + Socket.IO |
| `mongo` | `27017` | MongoDB database |

### Useful Docker commands

```bash
# Start all services
docker compose up -d

# Rebuild after code changes
docker compose up -d --build

# View live logs
docker compose logs -f

# Stop everything
docker compose down

# Stop and remove volumes (wipes DB)
docker compose down -v
```

---

## 💻 Local Development (without Docker)

### Backend
```bash
cd backend
npm install
# Update MONGODB_URI in .env to: mongodb://localhost:27017/chatApp
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`, backend on `http://localhost:5001`.

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/signup` | Register new user |
| `POST` | `/api/auth/login` | Login |
| `POST` | `/api/auth/logout` | Logout |
| `GET` | `/api/auth/check` | Check auth status |
| `PUT` | `/api/auth/update-profile` | Update profile picture |

### Messages
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/messages/users` | Get all users (contacts) |
| `GET` | `/api/messages/:id` | Get messages with a user |
| `POST` | `/api/messages/send/:id` | Send a message |

---

## 🎨 Themes

Chattyply supports **30+ themes** via DaisyUI — switch them in **Settings**:

`light` · `dark` · `cupcake` · `synthwave` · `cyberpunk` · `dracula` · `night` · `luxury` · `forest` · `aqua` · and many more!

---

## 📄 License

MIT © [Anonyious](https://github.com/anonyious)
