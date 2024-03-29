# Trello clone (Kanban Board)
Web app to manage tasks and projects.

## Image Sample
![Sample image of project](https://i.imgur.com/q1Ur2kC.png)

## Features Built
- Register User
- Login User
- Home page
    - Display all user's boards
    - Feature to create new board
- Individual Board page
    - Display all user's lists and cards
    - Feature to edit board name on click of the board name
    - Feature to create new list and card
    - Feature to edit list or card name on click of list or card name
    - Feature to drag and drop cards within lists and between two lists
    - Modal feature to edit card name or add description to the card on click of edit icon in the card
- Navbar
    - Option to go to home page on click of the trello text
    - Option to logout

## Technology Stack
- HTML
- CSS
- Javascript
- React JS
- Node JS
- Express JS
- MongoDB

## Additional libraries used for frontend
- react-router-dom
- axios
- react-beautiful-dnd
- react-modal
- react-simple-snackbar
- react-icons

## Additional libraries used for backend
- dotenv
- cors
- jsonwebtoken
- bcryptjs
- decimal.js

## Steps to install the project
### 1. Basic Software Installations
- Git
- VS code
- Node js
- MongoDB
- Nodemon (optional)

### 2. Clone the repository into local machine
- In terminal, navigate to folder in which you need the clone and run `git clone https://github.com/SaravanakumarJN/Trello.git`

### 3. NPM package installations
- Open the clonned repository,
    - Navigate to frontend folder and run `npm install` in terminal
    - Navigate to backend folder and run `npm install` in terminal
 
### 4. Run application
- Before running the application, 
    - Kill the applications currently running on port 3000 (for frontend) and port 8000 (for backend)
    - Clear the localStorage of the browser (http://localhost:3000)
    - Add the required env file
- Open the clonned repository,
    - Navigate to backend folder and 
        - if nodemon is installed run `npm run devStart`in terminal
        - else run `npm start`in terminal
    - Navigate to frontend folder and run `npm start` in terminal
- Your application is now running on `http://localhost:3000/`
- **Note : Secret keys has not been pushed to the repository, .env.example file is added for reference. Keys need to be added for proper working of the application.**
