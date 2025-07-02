# Hotel Booking System

Project Overview

Hotel Booking System is a microservices-based web application that allows users to search for available hotel rooms, make reservations, leave comments, and interact with an AI-powered chatbot. Admins can manage room availability and monitor reservations. The system includes real-time notifications using RabbitMQ and an integrated Gemini-based AI assistant.

---
 Technologies Used

- Node.js & Express.js
- MongoDB Atlas & Mongoose
- JWT Authentication
- Swagger (API Documentation)
- RabbitMQ (Queue-based Notification System)
- Google Gemini AI API (AI Chatbot)
- HTML, CSS, JavaScript (Frontend)
- Firebase Firestore *(optional for AI message logging)*
- CORS, Dotenv, Body-parser, etc.

---
 Live Deployment Links

| Service           | Render Deployment                                              | Localhost URL                                |
|-------------------|----------------------------------------------------------------|-----------------------------------------------|
| **Admin Service**  | [Render](https://hotel-booking-system-2-aay3.onrender.com/api-docs/#/)  | [localhost:3000](http://localhost:3000/api-docs/#/) |
| **Comment Service**| [Render](https://hotel-booking-system-5.onrender.com/api-docs/#/)       | [localhost:3004](http://localhost:3004/api-docs/#/) |
| **Frontend**       | [Vercel](https://hotel-booking-system-ten-jade.vercel.app)             | [127.0.0.1:5500](http://127.0.0.1:5500/index.html)   |

> API Gateway has also been implemented but is internal and does not require a Swagger UI.

---
 Project Structure
 
SİSTEM_MİMARİSİ/
├── admin-service/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ ├── swagger.js
│ └── .env
│
├── comments-service/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ ├── swagger.js
│ └── .env
│
├── gateway_service/
│ ├── routes/
│ ├── middleware/
│ ├── server.js
│ └── .env
│
├── notification-service/
│ ├── controllers/
│ ├── models/
│ ├── queues/
│ ├── routes/
│ ├── services/
│ ├── server.js
│ ├── swagger.js
│ └── .env
│
├── frontend/ (served via Vercel or local)
└── README.md


---
 Authentication

Both users and admins use JWT-based authentication:

- **User Endpoints:**
  - `POST /api/v1/users/register`
  - `POST /api/v1/users/login`
- Admin Endpoint:
  - `POST /api/v1/admin/login`

All protected routes require an `Authorization` header:
Authorization: Bearer <JWT_TOKEN>

---
 API Documentation (Swagger)

- Admin Service: [Swagger UI](https://hotel-booking-system-2-aay3.onrender.com/api-docs/#/)
- Comment Service: [Swagger UI](https://hotel-booking-system-5.onrender.com/api-docs/#/)

---
 Notification Service (RabbitMQ)

- Uses RabbitMQ to manage asynchronous events.
- Sends alerts when:
  - A new reservation is made.
  - Room capacity falls below 20%.
- Folder: `notification-service/queues/`

---
 AI Chatbot (Gemini)

This project integrates a Gemini-powered chatbot for intelligent interaction.

- Model: `gemini-2.0-flash`
- API Endpoint:  
https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent

 Usage Example
```javascript
const response = await fetch(GEMINI_API_URL + '?key=' + GEMINI_API_KEY, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
  contents: [{ parts: [{ text: userInput }] }]
})
});
//.env Variables
GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
GEMINI_API_KEY=your-gemini-api-key

 Sample API Endpoints

Method	Endpoint	Description
POST	/api/v1/rooms	Create a new room (admin only)
GET	/api/v1/search	Search for rooms by date/location
POST	/api/v1/bookings	Make a reservation (user)
POST	/api/v1/comments	Add a comment (user)
GET	/api/v1/comments/:roomId	Get comments for a specific room

 Test Accounts
Admin Login:
{
  "email": "admin@hotel.com",
  "password": "admin123"
}

User Login:
{
  "email": "test@user.com",
  "password": "user123"
}
 .env Example
PORT=3000
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/db
JWT_SECRET=supersecretkey
CORS_ORIGIN=http://127.0.0.1:5500
RABBITMQ_URL=amqp://localhost
GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
GEMINI_API_KEY=your-gemini-api-key

//Setup Instructions
1-Clone the repository:
git clone https://github.com/your-username/hotel-booking-system.git
2-Install dependencies for each service:
cd admin-service
npm install
3-Create .env files in each service directory with the required variables.
4-Start each service:
npm start
5-Open the frontend locally or visit the deployed Vercel link.

//Demo Video (YouTube)
You can watch the full demo of the project here:
https://youtu.be/cqXY2ybW2Us 
 Design Assumptions & Challenges

- We assumed each room has fixed capacity and is not shared across bookings.
- We designed the system to be microservice-based to simulate real-world large-scale applications.
- Faced deployment delays with Render cold starts; mitigated via retry logic in frontend.

 Data Model (ER Diagram)

The following Entity-Relationship (ER) diagram illustrates the core data structure of the Hotel Booking System:

![Hotel Booking System ER Diagram](https://chat.openai.com/mnt/data/hotel_booking_full_er_diagram.png)

 Explanation

- User: Registers, logs in, makes bookings, and writes comments.
- Admin: Manages rooms and receives system notifications.
- Room: Created by admins, linked to availability, bookings, and comments.
- Availability: Specifies available dates and capacity for each room.
- Booking: Connects users and rooms for a specified date range.
- Comment: Submitted by users and linked to a room.

- Notification: Sent to admins when capacity drops or a booking is made.

> To embed this diagram in your GitHub project, download the image and place it inside an `assets/` folder in your repo. Then use:

```markdown
![ER Diagram](./assets/hotel_booking_full_er_diagram.png)
![image](https://github.com/user-attachments/assets/a4d06360-a8b3-423b-a3ef-6c01b68e5fc8)
