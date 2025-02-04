# Customer Feedback Management  

## Overview  
This project is a **monolithic** web application built using:  
- **Backend:** Node.js with Express.js  
- **Frontend:** Angular  
- **Database:** MongoDB  
- **Containerization:** Docker Compose  
- **API Documentation:** Swagger  

### Why Monolithic Architecture?  
1. **Simplicity & Maintainability** – A single codebase makes it easier to develop and debug.  
2. **Performance** – Suitable for the current project scale without requiring microservices.  
3. **Deployment & Management** – Easier to deploy with **Docker Compose** instead of managing multiple services separately.  
4. **Data Consistency** – Using MongoDB as a single database ensures smooth transactions and integrity.  

---

## Running the Project  

### Prerequisites  
Ensure you have the following installed:  
- [Docker & Docker Compose](https://docs.docker.com/get-docker/)  
- [Angular CLI](https://angular.io/cli)  


### Steps to Run Using Docker Compose  
1. Clone the repository:  
   ```bash
   git clone https://github.com/Mahlomola-Moses/customer_feedback_management_sys.git
   cd customer_feedback_management_sys
   ```  
2. Start all services using Docker Compose:  
   ```bash
   docker-compose build
   ```  
   ```bash
   docker-compose up -d
   ``` 
### Steps to Run Angular   
1. Start Angular

  ```bash
  cd frontend
  ng serve
  ```

 The backend will be available at `http://localhost:35050`  
 The frontend will be accessible at `http://localhost:4200`  
 
### Auto-generated user for the first login
 `Email: superadmin@yopmail.com`
 `Password: string`

### Customer feedback link
  `http://localhost:4200/feedback`

---

## API Documentation (Swagger)  
1. Once the backend is running, open:  
   ```
   http://localhost:35050/api-docs
   ```
2. Here, you can explore all available API endpoints and test them directly.
3. **Use the access-key header to access endpoints in Swagger:**
   - **Header Key:** `access-key`
   - **Header Value:** `e2b8f7a1c3d9e4fAPI7c8d9e0f1a2b3c4d5e6f_` you can always change the key in the .env

### **Authentication & Authorization**  
To access protected endpoints, you need to authenticate and obtain a token:  

#### **Login & Get Token**  
- **Endpoint:** `POST /auth/login`  
- **Body:**  
```json
{
 "email": "superadmin@yopmail.com",
 "password": "string"
}
```
- **Response:**  
```json
{
 "token": "your_jwt_token"
}
```

---

## Testing with Postman  
1. Download the **Postman Collection** and **Environment Variables** from the repo  
   - customer_feedback_management_sys.postman_collection.json 
   - dev.postman_environment.json
2. Open Postman and import the downloaded **API Collection** and **Environment Variables**.  
3. Set the **dev** as you environment 
4. **Authenticate first** by using the `auth.login` endpoint under the **auth** folder in the collection.
5. 
  

