# React + TypeScript + Vite

# Doctors Appointment Booking Frontend

This project is the frontend for the doctors appointment booking application.

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- firebase auth

## Setup

1. **Clone the repository:**

    ```sh
    git clone https://github.com/Emmybritt/doctors-appointment-booking-frontend.git
    cd appointment-booking-frontend
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

    or if you are using yarn:

    ```sh
    yarn install
    ```

3. **Create a `.env` file at the root of the project and add your environment variables:**

    ```plaintext
    VITE_FIREBASE_API_KEY=AIzaSyA8ZNeubslYSSgu_2VeZuLWgN3mKxPQAwM
    VITE_FIREBASE_AUTH_DOMAIN=fir-auth-311de.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=fir-auth-311de
    VITE_FIREBASE_STORAGE_BUCKET=fir-auth-311de.appspot.com
    VITE_FIREBASE_MESSAGING_SENDER_ID=185349758929
    VITE_FIREBASE_APP_ID=1:185349758929:web:ecbd1eb36813dfb2544af0p
    ```

4. **Run the application:**

    ```sh
    npm run dev
    ```

    or if you are using yarn:

    ```sh
    yarn dev
    ```

    The application will start on `http://localhost:3000`.

## Directory Structure

```plaintext
appointment-booking-frontend/
├── public/
│   ├── images/
│   └── favicon.ico
├── src/
│   ├── components/
│   ├── pages/
│   │   ├── _app.js
│   │   ├── _document.js
│   │   ├── index.js
│   │   ├── login.js
│   │   ├── register.js
│   │   ├── dashboard/
│   │   │   ├── index.js
│   │   │   └── [doctorId].js
│   │   ├── appointments/
│   │   │   └── index.js
│   ├── styles/
│   ├── utils/
│   ├── hooks/
│   ├── contexts/
│   ├── services/
│   └── infrastructure/
│       ├── firebase.js
│       ├── store.js
│       └── slice/
│           └── userSlice.js
├── .gitignore
├── .env
├── package-lock.json
├── package.json
└── README.md
