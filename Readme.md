# XenonStack Task


## Description

This project is a clone of Zomato, a popular online food delivery and restaurant discovery platform. Zomato allows users to explore restaurants, read reviews, and order food online. The goal of this clone is to replicate some of the core features of Zomato, providing users with a similar experience.

## Features

- **User Authentication:** Sign up and log in to the platform to access personalized features.
- **Contact Us:** Reach out to the platform through the Contact Us page for any queries or feedback.

## Technologies Used

- **Frontend:**
  - HTML
  - CSS
  - JavaScript
  - [SweetAlert2](https://sweetalert2.github.io/) for user-friendly notifications

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB for data storage
  - Mongoose as the MongoDB ODM

## Project Structure

- `models/`: Defines the data schema using Mongoose for MongoDB.
- `public/`: Contains static files like HTML, CSS, and client-side JavaScript.
- `routes/`: Handles different routes for user authentication, restaurant management, and contact form submission.
- `.env/`: To keep confidential data secure.
- `.gitignore/`: To prevent to push unnecessary files.
- `app.js`: Main application file containing server setup and route configurations.


    
## Installation

Clone the repository:


Copy code
git clone https://github.com/mr-kbRKD/Web_APP.git
Navigate to the project directory:




Copy code
cd zomato-clone
Install dependencies:
in app.js 
do npm install
-express
-mongoose
-body-parser
-dotenv
-path
-nodemon


Create a .env file in the root directory and add the following:

env
Copy code
MONGO_URL=your-mongodb-connection-string
PORT=3000

Create account on mongoDB and create database and access your url provide it to the server through env to keep it safe.


Run the application:

using node app.js
or nodemon app.js


Copy code
npm start
Open your browser and go to http://localhost:3000 to access the application.



Usage
Sign Up:

Navigate to the Sign-Up page and provide a unique username and password.
Click the "Submit" button to create a new account.
Log In:

Visit the Log-In page and enter your credentials.
Click the "Submit" button to log in.
Contact Us:

Visit the Contact Us page.
Fill in the details in the form, including your name, email, and message.
Click the "Submit" button to send your message.
Receive a confirmation notification and get redirected to the homepage after successful submission.
