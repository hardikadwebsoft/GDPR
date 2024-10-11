# GDPR TEST PROJECT


## Overview

This ASP.NET project provides a user authentication system that allows users to sign up, sign in, and update their profiles while ensuring compliance with the General Data Protection Regulation (GDPR).

This project aims to provide a seamless user experience while prioritizing data privacy and security, making it an ideal solution for applications that require user registration and management under GDPR regulations.



## Key Features

- **User Registration**: Users can create accounts with secure password management.
- **Sign-In Functionality**: Users can easily log into their accounts using their registered email and password.
- **Profile Management**: Users can update their personal information, ensuring that all changes are made with explicit consent as per GDPR guidelines.

## Project Prerequisites

### Front-End: Angular

1. **Node.js and npm**
   - **Node.js**: Install the latest LTS version of Node.js, which includes npm (Node Package Manager).
   - Download Node.js: [nodejs.org](https://nodejs.org/)
   - Verify Installation: Run the following commands in your terminal to ensure Node.js and npm are installed correctly:
     ```bash
     node -v
     npm -v
     ```

2. **Angular CLI**
   - Install the Angular CLI globally using npm to create and manage Angular applications:
     ```bash
     npm install -g @angular/cli
     ```
   - Verify Installation: Check the version of Angular CLI installed:
     ```bash
     ng version
     ```

3. **Redux Toolkit**
   - Install Redux Toolkit and React-Redux for state management in your Angular application:
     ```bash
     npm install @ngrx/store @ngrx/effects @ngrx/store-devtools
     ```
   - Ensure you are familiar with NgRx, the Angular-specific implementation of Redux, for state management in your application.

4. **Development Environment**
   - An IDE or code editor such as Visual Studio Code or WebStorm for editing and managing your Angular application.

### Back-End: ASP.NET Web API

1. **.NET SDK**
   - Install the latest version of the .NET SDK (version 6.0 or later is recommended) to create and run ASP.NET applications.
   - Download .NET SDK: [dotnet.microsoft.com](https://dotnet.microsoft.com/download)
   - Verify Installation: Run the following command to check the installed version:
     ```bash
     dotnet --version
     ```

2. **Visual Studio or Visual Studio Code**
   - **Visual Studio**: Recommended for a robust development experience, especially for ASP.NET projects.
   - Download Visual Studio: [visualstudio.microsoft.com](https://visualstudio.microsoft.com/)
   - **Visual Studio Code**: A lightweight code editor with support for C# development through extensions.
     - Install the C# extension from the Extensions Marketplace in Visual Studio Code.

3. **ASP.NET Web API Framework**
   - Familiarize yourself with the ASP.NET Core Web API framework, which allows you to build RESTful services.
   - Install any necessary packages via NuGet Package Manager as required by your project.

### Database: MongoDB

1. **MongoDB Server**
   - Install MongoDB on your machine or set up a cloud-based MongoDB service such as MongoDB Atlas.
   - Download MongoDB Community Server: [mongodb.com](https://www.mongodb.com/try/download/community)

2. **MongoDB Compass (Optional)**
   - Install MongoDB Compass, a graphical user interface for MongoDB, to visualize and interact with your data.
   - Download MongoDB Compass: [mongodb.com](https://www.mongodb.com/try/download/compass)

3. **MongoDB Driver for .NET**
   - Include the MongoDB Driver for .NET in your ASP.NET project to interact with the MongoDB database:
     ```bash
     dotnet add package MongoDB.Driver
     ```

4. **Database Knowledge**
   - Familiarize yourself with basic MongoDB concepts, such as collections, documents, and CRUD operations.

## Additional Considerations

1. **Git**
   - Install Git for version control, which is crucial for managing your project and collaborating with others.
   - Download Git: [git-scm.com](https://git-scm.com/)

2. **Postman (Optional)**
   - Install Postman for testing your API endpoints.
   - Download Postman: [postman.com](https://www.postman.com/downloads/)



## Usage

### Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/hardikadwebsoft/GDPR.git
   cd your-repo
   ```

2. **Install dependencies**:
   For the back-end:
   ```bash
   dotnet restore
   ```

   For the front-end:
   ```bash
   npm install
   ```

3. **Run the back-end server**:
   ```bash
   dotnet run
   ```

4. **Run the front-end application**:
   In a new terminal window:
   ```bash
   ng serve
   ```

### Accessing the Application

- Open your web browser and navigate to:
  ```
  http://localhost:4200
  ```

### Example Usage

- **To sign up**:
    - Click on "Sign Up" in the top navigation.
    - Enter your information and submit the form.

- **To update your profile**:
    - Log in with your credentials.
    - Navigate to the "Profile" section to make updates.



## Project Working

This project is divided into five major components, each responsible for handling different aspects of the system. Below is a detailed explanation of each component:


### 1) GDPRTestProject.Client (Front-End - Angular)

This is the front-end part of the application built using Angular. It serves as the user interface where users interact with the application.

Key Responsibilities:
- User Interface: Displays the web application, allowing users to sign up, sign in, and manage their profile.
- Routing: Angular’s routing module handles the navigation between different pages (e.g., login, registration, profile management).
- Redux for State Management (NgRx): Manages the global state of the application using Redux (NgRx) for efficient state handling.
- API Communication: Sends requests to the back-end server (GDPRTestProject.Server) to fetch or update user data, such as profile information.
- GDPR Consent Handling: Implements GDPR-compliant pop-ups and consent forms for user data processing.

Important Files:
- app.module.ts: Root module where Angular modules and services are declared.
- components/: Contains reusable components such as login, signup, and user.

Working:
1. User signs up and submits data via a form.
2. The data is sent to the back-end via HTTP requests (handled by Angular services).
3. The user is notified of GDPR consent.
4. Upon sign-in, the user can update their profile, which triggers further back-end requests.


### 2) GDPRTestProject.Data

This module handles the data context of the project. It serves as the data access layer.

Key Responsibilities:
- Database Context: Manages the connection to the MongoDB instance.

Important Files:
- MongoDbSettings.cs: Contains mongoDB Fields.
- User.cs: Contains User Data Fields.

Working:
When the user submits information (like during sign-up), this layer interacts with MongoDB to store the user’s details.


### 3) GDPRTestProject.Model

This module contains the models or entities that represent the data structure of the project.

Key Responsibilities:
- Data Models: Defines the data structure of the entities used in the application, such as User, Consent, and Profile.

Important Files:
- LoginFormModel.cs: Defines the properties of the user entity, such as UserId, Email, Password, and IsConsent.

Working:
1. Data models are used across the project to represent the entities stored in MongoDB.
2. They serve as the structure for creating or updating records in the database.


### 4) GDPRTestProject.Server (Back-End - ASP.NET Web API)

This is the core back-end server built using ASP.NET Core Web API. It acts as the intermediary between the front-end and the database.

Key Responsibilities:
- API Endpoints: Exposes RESTful API endpoints that handle user authentication, profile management, and GDPR consent.
- Authentication and Authorization: Manages user authentication ensuring that only authorized users can access protected routes.
- Business Logic: Handles the logic for user registration, login, and profile updates.
- GDPR Compliance: Manages the acceptance and storage of GDPR consent data, and ensures users can request data deletion as per GDPR guidelines.

Important Files:
- UserController.cs: Contains API endpoints like POST /register, POST /login, and PUT /profile to handle user authentication and profile management.
- AccountController.cs: Handles endpoints related to Login of the user.
- Program.cs: Configures services, such as database connections and middleware.

Working:
1. Front-end requests (for example, user sign-up or sign-in) are received and processed by this layer.
2. Upon successful authentication, User redirected to their profile page.
3. Manages GDPR consent requests, ensuring all legal obligations are fulfilled.


### 5) GDPRTestProject.Services

The Services module handles the core business logic and service-oriented tasks in the application. It acts as a middle layer between the controllers (API) and the data layer.

Key Responsibilities:
- User Service: Contains the logic for user-related operations, such as creating, authenticating, and updating user data.
- Profile Service: Manages user profile operations, such as retrieving and updating profile information.
- GDPR Consent Service: Ensures that all GDPR requirements are handled, such as tracking consent status and storing consent data.

Important Files:
- IUserRepository.cs: Contains methods for handling user creation, authentication, and updates.
- IAccountRepository.cs: Manages the logic for Login the user.

Working:
1. When a request is made (e.g., user registration or GDPR consent), this layer processes the data and interacts with the data layer.
2. The business logic for user authentication, GDPR compliance, and profile updates resides here, ensuring the controllers focus purely on request handling.
"""



##Future Improvement
-Email Verification
-Enhanced GDPR Features : Implement a Data Request Portal where users can request to see all the data that the system has collected about them.



## Author

- **Name**: Hardik Gohil
- **Role**: Software Engineer specializing in microservices and scalable solutions
- **Email**: [hardik.gohil@live.co.uk](mailto:hardik.gohil@live.co.uk)

## License

This project is licensed under the MIT License.
