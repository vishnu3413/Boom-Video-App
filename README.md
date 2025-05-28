# Boom Video App

## Overview

Boom Video App is a full-stack video platform designed for seamless video publishing, purchasing, and user interaction. It features a modern frontend and a scalable backend architecture, making it suitable for creators and consumers alike.
Backend uses MongoDB – ensure it is running locally or via cloud and ensure 'Cloudinary' credentails for video uploading.

## Features

- Upload and stream videos (file or URL).
- Comment system for user engagement.
- Wallet and purchase flow.
- Authentication and role management.
- Multi-tenancy and organization support.
- Auto-generated API docs with Swagger.

## Technologies

1. **Backend:**
- **Node.js, Express** – RESTful APIs and server-side logic.
- **Prisma ORM** – Database operations.
- **PostgreSQL** – Relational database.
- **Multer** – File uploads.
- **Swagger** – API Documentation.

2. **Frontend:**
- **React.js** – Component-based UI.
- **Tailwind CSS** – Utility-first styling.
- **Axios – HTTP** communication.
- **React Router** – Routing and navigation.

## Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/vishnu3413/Boom-Video-App.git
   cd Boom-Video-App

2. **Install dependencies:**
  
   Install dependencies for backend and frontned by using:
   
   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory for both frontend and backend if required and add the necessary environment variables. Example:

   `PORT=3000`

## Running the Application

Refer to the Readme files for particular service(i.e, backend and frontend) to learn about how to run the application.

## Project Structure

- **/backend**: Express backend with Prisma.
- **/frontned**: React frontend application.