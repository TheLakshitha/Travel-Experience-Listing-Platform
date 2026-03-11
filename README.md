I developed this fullstack web application called Travel Experience, which lets travelers, travel guides and activity hosters explore and share travel listings. On the frontend, I used React with React Router for navigation, and I built custom hooks for handling authentication (useLogin, useSignup, useAuthContext). The UI is responsive and structured with reusable components like ListingCard and Navbar, and forms include controlled components for adding and managing listings. On the backend, I used Node.js with Express to build RESTful APIs, MongoDB with Mongoose for database modeling, and JWT based authentication to secure routes. Users can perform full CRUD operations creating, reading, updating, and deleting listings and the backend ensures only the creator can delete a listing. File uploads for listing images are handled via Multer. While the project is fully functional locally, I haven’t hosted it online yet due to deployment constraints.


How to Run the Project Locally

Clone the repository to your machine:


Install backend dependencies:

cd backend
npm install

Start the backend server:

npm run dev

This will start your backend on http://localhost:4000.

Install frontend dependencies in a new terminal:

cd frontend
npm install

Start the frontend server:

npm start

This will open the React app in your browser on http://localhost:3000.

Use the app:

Sign up or log in.

Add new travel listings, view existing listings, and delete listings if you are the creator.
