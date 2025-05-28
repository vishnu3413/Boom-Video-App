# Boom Video App - Backend

## Overview

Boom Video App - Backend is designed to manage  within an ERP system. This API enables seamless handling of multi-tenancy, roles and permissions, subscription management, and organizational hierarchies.

## Features

- **RESTful APIs**: Endpoints for managing various healthcare data.
- **Modular Structure**: Organized into controllers, models, routes, and utils for better maintainability.
- **Environment-Based Configurations**: Supports enivronement configurations.

## Technologies

- **Node.js**: JavaScript runtime for server-side programming.
- **Express**: Web framework for building the API.
- **Swagger**: API documentation tool.
- **Prisma**: ORM for database management.
- **Multer**: JavaScript transpiler for ES6+ support.
- **Logging**: For structured log capturing.

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
   cd backend

2. **Install dependencies:**

   ```bash
   npm install

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the necessary environment variables. Example:

   `PORT=7110`

4. **Ensure DB sync**

   Ensure that the database is in sync with your database. To ensure that type the below command in the terminal
   
   ```bash
   npx prisma db push

## Running the Application

To start the application, run:

`npm run dev`

The server will run on [http://localhost:7110](http://localhost:7110) by default. You can change the port by setting the `PORT` environment variable in the `.env` file.

## API Documentation

The API is documented using Swagger. Once the application is running, you can access the Swagger UI at:

[http://localhost:7110/api-docs](http://localhost:7110/api-docs)

## Prisma Commands

Prisma is used for database schema management and operations. Below are the key Prisma commands you will use in this project:

- **Initialize Prisma in your project:**

  `npx prisma init`

  This command sets up Prisma in your project by creating a `prisma` directory with the necessary configuration files.

- **Run migrations:**

  `npx prisma migrate dev --name <migration-name>`

  This command creates a new migration file based on the changes in your Prisma schema and applies it to the database.

- **Generate Prisma Client:**

  `npx prisma generate`

  This command generates the Prisma Client, which is a type-safe database client for interacting with your database.

- **Reset the database and apply all migrations:**

  `npx prisma migrate reset`

  This command resets the database by dropping all tables and reapplying all migrations. Use this with caution as it will delete all existing data.

- **View the database schema:**

  `npx prisma db pull`

  This command pulls the current database schema into your Prisma project, which can be useful for keeping the schema file up to date with the database.

- **Open Prisma Studio:**

  `npx prisma studio`

  This command opens Prisma Studio, a web-based GUI to view and edit the data in your database.

## Project Structure

- **prisma/schema.prisma**: Defines the Prisma data models and configuration for the database.
- **src/docs**: Stores API documentation and other project-related documentation.
- **src/config**: Configuration files for various environments.
- **src/controllers**: Handles the core application logic and communicates with the services.
- **src/repository**: Abstraction layer for database operations.
- **src/routes**: Defines API endpoints and maps them to controllers.
- **src/utils**: Utility functions that provide reusable code across the project.
- **uploads**: Stores the uploaded files(videos).

## Configuration

- **Prisma**: ORM configured in prisma/schema.prisma.
- **Swagger**: Set up for interactive API documentation.
- **Environment Variables**: Configure in .env file.