# Job Board App

A full-stack job board application where employers can post jobs and candidates can apply, upload resumes, and track their applications. The app features authentication, role-based access, and a modern React UI.

**Live Demo:** [https://paktalent.vercel.app/](https://paktalent.vercel.app/)

## Features

- User authentication (JWT, HTTP-only cookies)
- Role-based access: candidate, employer, admin
- Employers can post, edit, and delete jobs
- Candidates can apply to jobs, upload resumes (PDF), and track application status
- Admin can view all users and jobs
- Modern UI built with React, Vite, and shadcn/ui
- RESTful API built with Express and MongoDB (Mongoose)

---

## Getting Started (Local Development)

### 1. Clone the repository

```sh
git clone https://github.com/shariq-yousuf/pak-talent
cd pak-talent
```

### 2. Install dependencies

Install both client and server dependencies:

```sh
cd server
npm install
cd ../client
npm install
```

### 3. Setup environment variables

- Copy the provided `.env.example` in `server/` to `.env` and fill in the required values.
- For the server, you must set up MongoDB connection string, JWT secret, and client URL.

Example for `server/.env`:

```
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<db_name>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### 4. Run the backend (server)

```sh
cd server
npm start
```

- The server will start on the port specified in `.env` (default: 3000).

### 5. Run the frontend (client)

```sh
cd client
npm run dev
```

- The frontend will start on [http://localhost:5173](http://localhost:5173) by default.

### 6. Access the app

- Open your browser and go to [http://localhost:5173](http://localhost:5173)
- Register as a candidate or employer and start using the app!

---

## Notes

- Make sure MongoDB is accessible from your local machine (use MongoDB Atlas or a local instance).
- The server uses HTTP-only cookies for authentication.
- The frontend uses Vite and expects the backend to be running for API requests.
- For production deployment, you will need to set up environment variables and hosting for both frontend and backend (see platform docs for details).

---
