# Crea Assignment

## Overview

This repository contains a React application for **Crea**, designed to showcase best practices and advanced concepts in web development. This application includes authentication, viewing a product list, and viewing product details.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)

## Features

- Implements JWT Authentication.
- Displays a product list.
- Shows product details, including comments and reviews.
- Allows updating product ratings by giving star ratings.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Next**: A Comprehensive React framework.
- **React Query**: For data fetching and state management.
- **SCSS**: For component styling.
- **Jest**: For testing the application.
- **Tailwind CSS**: A utility-first CSS framework for fast UI development.
- **Dummy JSON**: For providing dummy data via API.
- **Next Auth**: For session management.

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm (Node Package Manager)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/AlperErkol/crea-assignment.git
   ```

2. Navigate to the project directory

   ```bash
   cd crea-assignment
   ```

3. Get your AUTH_SECRET token

   ```bash
   openssl rand -base64 32
   ```

4. Copy and paste your token to .env.local as AUTH_SECRET value

   ```bash
   AUTH_SECRET=<YOUR_TOKEN_HERE>
   ```

5. Copy .env.local contents to .env file

   ```bash
   cp .env.local .env
   ```

6. Install depedencies
   ```bash
   npm run install
   ```

### Running the Application

To start the development server, execute the following command:

```bash
npm run dev
```

### Running the tests

To run all test cases, execute the following command:

```bash
npm run test
```

## API Endpoints

This application uses the following API endpoints from [Dummy JSON](https://dummyjson.com/):

- `GET /products`: Retrieves the list of products.
- `GET /products/:id`: Retrieves details for a specific product.
