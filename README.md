# Course Review Backend Project

This project is a backend application for managing courses, categories, and reviews. It is built using TypeScript, Express, and Mongoose.

## Live Link

### [Course-review-live-link](https://assignment-3-three-zeta.vercel.app/) : https://assignment-3-three-zeta.vercel.app/

## Technology Stack
1. **TypeScript:**

TypeScript is a superset of JavaScript that adds static typing to the language. It helps catch errors during development and improves code quality. TypeScript is transpiled to JavaScript before execution.

2. **Express:**

Express is a web application framework for Node.js. It simplifies the process of building robust, scalable, and modular web applications by providing a set of features for routing, middleware, and handling HTTP requests and responses.

3. **Mongoose:**

Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straightforward way to define schemas, models, and interact with MongoDB databases using JavaScript or TypeScript.

4. **Zod:**

Zod is a TypeScript-first schema declaration and validation library. It helps define the shape of data structures, validate input, and ensure type safety in runtime. In your project, Zod is used for validating data.

5. **HttpStatus:**

HttpStatus is a library that provides a set of constants for HTTP status codes. It makes it easier to use meaningful status codes in your application for better communication between the server and client.

6. **CORS (Cross-Origin Resource Sharing):**

CORS is a security feature implemented by web browsers that allows or restricts web applications running at one origin to make requests for resources from a different origin. The cors library in your project helps handle CORS headers.

7. **dotenv:**

dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. This is useful for managing configuration settings in development.

8. **ESLint:**

ESLint is a linter for JavaScript and TypeScript that helps identify and fix common coding issues. It enforces code style and consistency across the project.

9. **Prettier:**

Prettier is a code formatter that automatically formats code to follow a consistent style. It works well with ESLint and helps maintain a clean and uniform codebase.

10. **ts-node-dev:**

ts-node-dev is a development server for TypeScript applications. It allows you to run and develop TypeScript applications with automatic restarts on file changes. It's particularly useful during development.

These technologies and libraries together provide a robust foundation for building a backend application. TypeScript brings static typing to JavaScript, Express simplifies web application development, Mongoose interacts with MongoDB, and the additional tools enhance the development experience, ensure code quality, and handle various aspects of the application's functionality.

## Routes

The Course Review Backend project encompasses eight distinct routes, each tailored to specific actions and operations:

1.  **Create Course (POST):**
    
    - Endpoint: `/api/courses`
    - Method: POST
    - Description: Create a new course with essential details.

2.  **Get Courses (GET):**
    
    - Endpoint: `/api/courses`
    - Method: GET
    - Description: Retrieve a list of courses with flexible query parameters for sorting, filtering, and pagination.

3.  **Create Category (POST):**
    
    - Endpoint: `/api/categories`
    - Method: POST
    - Description: Establish new categories for courses, enhancing organization and classification.

4.  **Get Categories (GET):**
    
    - Endpoint: `/api/categories`
    - Method: GET
    - Description: Retrieve a comprehensive list of all available categories.

5.  **Create Review (POST):**
    
    - Endpoint: `/api/reviews`
    - Method: POST
    - Description: Share user experiences by creating reviews for specific courses.

6.  **Update Course (PUT):**
    
    - Endpoint: `/api/courses/:courseId`
    - Method: PUT
    - Description: Modify and update the information associated with a particular course.

7.  **Get Course with Reviews (GET):**
    
    - Endpoint: `/api/courses/:courseId/reviews`
    - Method: GET
    - Description: Retrieve detailed information about a course along with its associated reviews.

8.  **Get Best Course Based on Average Review (GET):**
    
    - Endpoint: `/api/course/best`
    - Method: GET
    - Description: Identify and retrieve the best course based on average review ratings.


## How to Run Locally

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Install Dependencies
Install the project dependencies using npm:
```bash
npm i
```
### 3. Set Environment Variables
Create a .env file in the root of your project and set any necessary environment variables, such as database connection details. Make sure you have the required environment variables according to your project.

### 4. Run the Project
Run the project in development mode using the provided script:
```bash
npm run start:dev

```
This script uses `ts-node-dev` to run the TypeScript code in development mode with automatic restarts on file changes.

### 5. Testing
You can test your API endpoints using tools like Postman, Insomnia, or by making HTTP requests directly using a tool like `curl` or a web browser.

### 6. Linting and Formatting
You can lint your code and fix formatting issues using the provided scripts:
```bash
npm run lint
npm run lint:fix

```
These commands use ESLint for linting and Prettier for code formatting.

### 7. Building for Production
If you want to deploy your application in production, you can build the TypeScript code using:

```bash
npm run build

```
Then start the production server:
```bash
npm run start:prod

```
### Database Setup
Make sure you have a MongoDB instance running if your project uses MongoDB, and that your database connection details are correctly configured in the .env file.


This project not only addresses the fundamental aspects of course management but also prioritizes user experience by incorporating features like reviews and categorization. With a strong technological foundation, it aims to provide a seamless and efficient backend solution for educational platforms and course management systems.

Feel free to explore the various routes and functionalities, and enjoy developing with this feature-rich Course Review Backend!