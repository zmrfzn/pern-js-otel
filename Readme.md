This is a basic PERN stack application that is instrumented with OpenTelemetry using the JavaScript SDK.

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/en/) version v14.x or later
- [PostgreSQL](https://www.postgresql.org/) version v12.x or later

### Setting up the project

1. Clone the repository 
2. Install dependencies for the project
   
     run `npm install` in the root directory

3. Setup and initialize the database for backend 
   
     run `cd backend && npm run initialize`

### Running the project 

Run the project in development mode

 `npm run start` in the root directory 

The node backend runs on port **8080** and the react frontend runs on port **8081**.