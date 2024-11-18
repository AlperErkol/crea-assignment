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

4. Copy and paste your token to .env file as AUTH_SECRET value

   ```bash
   AUTH_SECRET=<YOUR_TOKEN_HERE>
   ```

5. Install depedencies
   ```bash
   npm install
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

## Live Demo

You can visit this [page](https://crea-assignment.vercel.app/) for live demo.

## Assumptions

- There is no database or storage. Adding a review with a rating updates the total comment count and the average rating, but the updates are lost when the page is refreshed.
- Each product is assumed to have been rated by 100 users.
- Initially, the code coverage threshold was set to around 80% when I started the project. However, I lowered it to 70% due to time constraints and a busy workload.
