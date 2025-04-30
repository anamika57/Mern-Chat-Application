## **MERN-CHAT-APPLICATION**

A real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js) and Socket.IO for real-time communication.



## Features

 **User Authentication**:
  - Register new account,
  - Login with existing credentials,
  - Secure authentication with JWT,
  - Protected routes

 **Real-time Messaging**
  - Send and receive messages instantly
  - Message timestamps
  - Online user status indicators
  - Message notifications
    
  **User Management:**
  - Search for users
  - User profile with avatar
  - View online status of users

  **User Interface**
  - Responsive design
  - Clean and intuitive chat interface
  - Navigation sidebar
  - User-friendly interactions

## Tech Stack:

**Frontend**
  -  React.js 
  - React Router for navigation
  - Context API for state management
  - Socket.IO client for real-time communication
  - CSS for styling
    
 **Backend**
  - Node.js with Express.js
  - MongoDB for database
  - Mongoose for data modeling
  - Socket.IO for real-time communication
  - JWT for authentication

## Project Structure

**Frontend**
 frontend/
  Context API for state management
frontend/
├── public/
├── src/
│   ├── assets/
│   │   ├── sound/
│   │   │   └── notification.mp3
│   │   └── user.jpg
│   ├── components/
│   │   ├── Login.jsx
│   │   ├── Navbar.jsx
│   │   └── Register.jsx
│   ├── Context/
│   │   ├── Authcontext.jsx
│   │   └── SocketContext.jsx
│   ├── Home/
│   │   └── Home.jsx
│   ├── utils/
│   │   └── VerifyUser.jsx
│   ├── Zustans/
│   │   └── useConversation.js
│   ├── App.jsx
│   ├── index.css
│   └── index.js

**Backend**
backend/
├── DB/
│   └── dbConnect.js
├── middleware/
│   └── isLogin.js
├── Models/
│   ├── conversationModel.js
│   ├── messageSchema.js
│   └── userModel.js
├── rout/
│   ├── authUser.js
│   ├── messageroute.js
│   └── userroute.js
├── routControllers/
│   ├── messageController.js
│   └── userController.js
├── Socket/
│   └── socket.js
├── utils/
├── .env
└── index.js
## Installation and Setup
**Prerequisites**
  - Node.js and npm installed
  - MongoDB installed and running
 
  ## Backend Setup
    
  **1.Navigate to the backend directory**
   -    cd backend
   
   **2.Install dependencies:**
   -     npm install
     
   **3.Create a .env file in the backend directory with the following variables:**
   PORT=3000
  MONGODB_URI=mongodb://localhost:27017/chat-app
JWT_SECRET=your_jwt_secret
NODE_ENV=development
  
**4.Start the backend server:**
- npm start


## Frontend Setup

1.Navigate to the frontend directory:
cd frontend

2.Install dependencies:
npm install

3.Start the frontend development server:
npm run dev

Open your browser and navigate to http://localhost:3000

## Usage

**Register/Login:**
- Create a new account or login with existing credentials

**Chat:**

- Click on a user from the sidebar to start chatting
- Type your message and press enter or click the send button
- Real-time messages will appear in the chat window

**Search Users:**
-Use the search bar to find specific user

## Development Notes
**Socket.IO Implementation**
The application uses Socket.IO for real-time communication. The main events include:
  - *connection:* When a user connects to the Socket.IO server
  - *getOnlineUsers:* Emits the list of currently online users
  - *newMessage:* Emits when a new message is sent

## Authentication Flow
  - User registers/logs in
  - Server validates credentials and generates JWT
  - JWT is stored in the client side
  - The token is sent with each request to authenticate the user


## Future Enhancements
  - Group chat functionality
  - File sharing capabilities
  - Voice/video call integration
  - Read receipts
  - Message editing and deletion
  - Dark mode theme







