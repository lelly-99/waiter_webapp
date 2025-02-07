# # Waiter Availability App
[![Node.js CI](https://github.com/lelly-99/waiter_webapp/actions/workflows/node.js.yml/badge.svg)](https://github.com/lelly-99/waiter_webapp/actions/workflows/node.js.yml)


## Overview
The Waiter Availability app is designed to help waiters manage their work schedules efficiently. Waiters can register, log in, and select the days they are available to work. Additionally, the app provides an admin interface where administrators can view the number of waiters scheduled for specific days, reschedule waiters, and clear or reset the schedule.

## Features
- **Waiter Registration and Login**: Waiters can create an account and log in to the system.
- **Availability Selection**: Waiters can choose the days they are available to work.
- **Admin Dashboard**: Admins can access a dedicated dashboard to manage waiter schedules.
  - **View Waiter Count**: Admins can see the number of waiters available for each day.
  - **Reschedule Waiters**: Admins can reschedule waiters for different days.
  - **Clear/Reset Schedule**: Admins can clear or reset the entire schedule if needed.

## Technologies Used
- [PostgreSQL](https://www.postgresql.org/) - Database for storing user and schedule data
- [Express](https://expressjs.com/) - Web framework for Node.js
- [Handlebars (hbs)](https://handlebarsjs.com/) - Templating engine for rendering HTML
- [CSS](https://www.w3schools.com/css/) - Styling for the application
- [JavaScript](https://www.javascript.com/) - Client-side scripting
- [Nodemon](https://nodemon.io/) - Tool for automatically restarting the application during development

## Installation

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (local or cloud instance)

### Steps
1. **Clone the Repository**
   ```bash
   git clone https://github.com/lelly-99/waiter_webapp.git
   cd waiter_webapp
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Database**
   - Create a PostgreSQL database and configure it according to your needs.
   - Update the database connection settings in your application.

4. **Run the Application**
   ```bash
   nodemon app.js
   ```
   The app will be running on `http://localhost:3000`.

## Usage

### For Waiters
1. **Register**: Navigate to the registration page and fill out the form to create an account.
2. **Log In**: After registration, log in using your credentials.
3. **Select Availability**: Once logged in, you can select the days you are available to work.

### For Admins
1. **Access Admin Dashboard**: Navigate to the `/days` route to access the admin dashboard.
2. **View Waiter Count**: The dashboard will display the number of waiters available for each day.
3. **Reschedule Waiters**: You can select a waiter and choose a new day for their schedule.
4. **Clear/Reset Schedule**: Use the provided option to clear or reset the entire schedule if necessary.


