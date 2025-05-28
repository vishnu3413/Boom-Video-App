# Boom Video App - Frontend

## Overview

Boom Video App - frontned is a React-based front-end application for displaying and purchasing short-form and long-form videos, along with adding comments and purchasing videos.

## Features

- Fetches all videos from an API and displays them in pages.
- Handles paid and free video logic.
- Supports purchasing of videos.
- Auto-detects and renders short-form (video preview) and long-form (static thumbnail) videos.
- Cloudinary and YouTube thumbnail support.
- Paginated video list with "Load More" functionality.

## Technologies

- **React.js**: JavaScript library for building user interfaces.
- **TailwindCSS**: Utility-first CSS framework for custom design with minimal effort.
- **React Router DOM**: Enables dynamic routing in React applications.
- **Axios**: Promise-based HTTP client for making API requests.
- **React Toastify**: Provides elegant notifications and alerts.

## Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd Boom-Video-App
   cd frontend

2. **Install dependencies:**

   ```bash
   npm install

## Running the Application

To start the application, run:

`npm start`

The server will run on [http://localhost:3000](http://localhost:3000) by default. You can change the port by setting the `PORT` environment variable using an `.env` file.

## Project Structure

- **src/assests**: Contains static assets such as images, icons, and styles.
- **src/services**: Handles API calls and service-related logic using tools like Axios.
- **src/componenets**: Contains reusable UI components used across different parts of the application.