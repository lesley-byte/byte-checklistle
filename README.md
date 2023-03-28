# byte-checklistle

Byte-Checklistle is a user-friendly web application that allows users to create, manage, and share customizable checklists. With a sleek interface and intuitive navigation, users can easily add, edit, and delete steps within their checklists while also applying conditional logic for a more personalized experience. Designed for individuals and teams alike, Byte-Checklistle aims to streamline task management and enhance productivity.

## Table of Contents

- [Introduction](#introduction)
- [Technologies](#technologies)
- [System Requirements](#system-requirements)
- [Installation & Setup](#installation--setup)
- [Application Architecture](#application-architecture)
- [Database Design](#database-design)
- [API Documentation](#api-documentation)
- [Frontend Components](#frontend-components)
- [State Management](#state-management)
- [Deployment](#deployment)
- [Deployed Website](#deployed-website)
- [Contributing & Support](#contributing--support)

## Introduction

Byte-Checklistle is a powerful and easy-to-use web application designed to help users create, manage, and share customizable checklists for personal and professional use. With a clean and modern interface built on React, the application offers a seamless user experience and simplifies task management.

The primary goal of Byte-Checklistle is to enhance productivity by enabling users to create checklists that cater to their specific needs. By providing tools to add, edit, and delete steps, as well as the ability to apply conditional logic, the application allows users to create highly personalized checklists. The application's features are ideal for individuals looking to better organize their daily tasks, teams collaborating on projects, or businesses seeking to streamline their workflow.

Built using the MERN stack (MongoDB, Express, React, and Node.js), Byte-Checklistle employs a robust and flexible backend with GraphQL API to support the feature-rich frontend. The application also leverages Material-UI components to maintain a consistent design language and ensure a visually appealing experience across different devices and screen sizes.

Whether you're a student trying to keep track of assignments, a project manager overseeing multiple tasks, or just someone looking to stay organized, Byte-Checklistle has the tools to help you accomplish your goals with ease.

## Technologies

- MongoDB: NoSQL database
- Express: Web application framework for Node.js
- React: JavaScript library for building user interfaces
- Node.js: JavaScript runtime environment
- [List additional libraries and tools used on the client-side, e.g., Redux, Axios]

## System Requirements

- Software requirements:
  - Node.js (version X.X.X or higher)
  - npm (version X.X.X or higher)
  - MongoDB (version X.X.X or higher)
- Hardware requirements:
  - [Specify memory, CPU, and storage requirements, if applicable]

## Installation & Setup

1. Clone the repository
2. Install server-side dependencies by running `cd server && npm install`
3. [Add instructions for setting up the client-side dependencies]
4. [Configuration settings, e.g., environment variables, database connection]

## Application Architecture

### Server-side

The server-side of the application is located in the `/server` directory. It contains the following files and directories:

- `server.js`: The main entry point for the server-side application
- `config/`
  - `connection.js`: Database connection configuration
- `models/`
  - `Checklist.js`: Checklist model
  - `index.js`: Model index file
  - `Step.js`: Step model
  - `User.js`: User model
- `schemas/`
  - `index.js`: Schema index file
  - `resolvers.js`: GraphQL resolvers
  - `typeDefs.js`: GraphQL type definitions
- `seeds/`: Empty directory for seed data (if needed)
- `utils/`
  - `auth.js`: Authentication utility

The server-side dependencies are listed below:

```json
{
  "apollo-server-express": "^3.12.0",
  "bcrypt": "^5.1.0",
  "express": "^4.18.2",
  "graphql": "^16.6.0",
  "jsonwebtoken": "^9.0.0",
  "mongoose": "^7.0.2",
  "nodemon": "^2.0.21"
}
```

## Database Design

The database schema consists of the following collections:

1. `Checklist`: Represents a checklist with a title and a list of steps.
2. `Step`: Represents a step in a checklist, with a text description, position, condition type, and condition value.
3. `User`: Represents a user with a username, email, and a list of checklists.

Each collection has the following fields:

- `Checklist`
  - `_id`: ID
  - `title`: String
  - `steps`: [Step]
- `Step`
  - `text`: String
  - `position`: Int
  - `conditionType`: String
  - `conditionValue`: [String]
- `User`
  - `_id`: ID
  - `username`: String
  - `email`: String
  - `checklists`: [Checklist]

## API Documentation

The API is built using GraphQL and provides the following queries and mutations:

### Queries

- `checklists(userId: ID)`: Fetches a list of checklists for the specified user.
- `checklist(checklistId: ID!)`: Fetches a single checklist by its ID.
- `user(username: String!)`: Fetches a user by their username.
- `me`: Fetches the currently logged-in user.

### Mutations

- addUser(email: String!, username: String!, password: String!): Creates a new user and returns an authentication token.
- login(email: String!, password: String!): Logs in a user and returns an authentication token.
- addChecklist(title: String!, userId: ID!): Adds a new checklist for the specified user.
- updateChecklist(checklistId: ID!, title: String, steps: [StepInput], userId: ID): Updates an existing checklist by its ID.
- deleteChecklist(checklistId: ID!, userId: ID!): Deletes a checklist by its ID and returns the deleted checklist.

### Input Types

- StepInput
- text: String
- position: Int
- conditionType: String
- conditionValue: [String]

### Client-side

The client-side application is organized into the following directories:

- `/public`: Contains the static files served by the application.
- `/src`: Contains the source code of the application, organized into the following subdirectories:
  - `/assets`: Contains the images, styles, and other assets used in the application.
  - `/components`: Contains the reusable React components.
  - `/contexts`: Contains the context providers for managing application state.
  - `/pages`: Contains the individual pages or views of the application.
  - `/utils`: Contains utility functions and constants used throughout the application.

### Client-side Dependencies

The client-side application uses the following dependencies:

- `@apollo/client`: Apollo Client for integrating with the GraphQL API.
- `@emotion/react`: Emotion CSS-in-JS library for styling components.
- `@emotion/styled`: Emotion Styled Components library for creating styled components.
- `@mui/material`: Material-UI library for building React components based on Material Design.
- `intro.js`: A lightweight library for creating step-by-step guided tours.
- `jwt-decode`: A library for decoding JSON Web Tokens (JWTs).
- `react`: JavaScript library for building user interfaces.
- `react-beautiful-dnd`: A library for creating drag-and-drop interfaces in React.
- `react-dom`: React package for working with the DOM.
- `react-router-dom`: A library for handling client-side navigation in React applications.
- `react-scripts`: Scripts and configuration used by Create React App.
- `uuid`: A library for generating unique IDs.
- `web-vitals`: A library for measuring web performance metrics.

## Frontend Components

### Pages

1. `Landing.js`: The landing page of the application that showcases the main features and purpose of Checklistle. It includes a background image, a main heading, a subheading, and a brief description of the application.
2. `ChecklistManagement.js`: The Checklist Management page allows users to create new checklists and manage their existing checklists. It also provides a step-by-step tutorial for first-time users using the `introJs` library.
3. `Editor.js`: The Checklist Editor page enables users to update an existing checklist. It fetches the checklist data using GraphQL and displays a form pre-populated with the current checklist details for modification.
4. `SingleChecklist.js`: The Single Checklist page displays the details of a specific checklist, including the title and steps. It fetches the checklist data using GraphQL and renders the `Checklist` component with the fetched data.
5. `Signup.js`: The Signup page allows users to register for a new account. It contains a form for entering a username, email, and password. After submitting the form, a new user is created using the `ADD_USER` GraphQL mutation and the user is logged in automatically.
6. `Login.js`: The Login page allows users to log in to their accounts. It contains a form for entering an email and password. After submitting the form, the user is authenticated using the `LOGIN_USER` GraphQL mutation and the user is logged in automatically.

### Components

1. `New.js`: The New component allows users to create a new checklist. It includes a form where users can input a title for their new checklist. After submitting the form, the new checklist is created using the `ADD_CHECKLIST` GraphQL mutation. Once the checklist is added, the component navigates back to the Checklist Management page.

2. `ListOfLists.js`: The ListOfLists component displays a list of checklists that belong to the current user. It fetches the checklists using the `QUERY_CHECKLISTS` GraphQL query and maps through the checklists to display each one as a list item with a link to view that specific checklist. The component also provides "Edit" and "Delete" buttons for each checklist, allowing the user to edit or delete them.

3. `ChecklistForm.js`: The ChecklistForm component is responsible for rendering and handling the form for creating or editing checklists. It allows users to update the checklist title, add, edit, or delete steps, and change the conditions (i.e., IF, NOT, XOR, XNOR) associated with each step. The component validates the input provided by users and ensures that the proper values are used for the condition type. Once the form is submitted, it updates the checklist using the `UPDATE_CHECKLIST` GraphQL mutation.

4. `Checklist.js`: The Checklist component is a reusable component that displays a checklist with a given title and steps. Each step has a position, text, and conditional properties (conditionType and conditionValue) that determine if the step should be displayed based on the state of other steps in the list. The component supports multiple conditional logic types (AND, OR, IF, NOT, NOR, NAND, XOR, XNOR) to handle various scenarios. The component also includes a reset button to uncheck all steps and a custom styling for checkboxes using the Material-UI library.

## State Management

This application utilizes React's built-in state management capabilities, primarily using the `useState` and `useReducer` hooks. State is managed locally within components, and when necessary, passed down to child components via props or context providers. This approach ensures that state is kept as close as possible to the components that need it, resulting in a more maintainable codebase.

## Deployment

- [Instructions for deploying the application to a production environment]
- [Maintenance and update procedures]

## Deployed Website

[https://fierce-oasis-40648.herokuapp.com/](https://fierce-oasis-40648.herokuapp.com/)

## License

This project is licensed under the terms of the MIT license. For more information, please refer to the [LICENSE](LICENSE) file in the repository.
