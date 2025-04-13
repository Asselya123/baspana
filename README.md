# Baspana Project

This project is a web application that includes a server and a client. The server is built using Django, a popular web framework for Python, and the client is built using Typescript, React and Vite. The whole application is packaged using Docker, which makes it easy to set up and run on any machine.

## Project Structure

- **server/**: This folder contains all the code for the server, which handles the backend logic and data storage.
- **client/**: This folder contains all the code for the client, which is the part of the application that users interact with in their web browsers.

## Prerequisites

- **Git**: You need to have Git installed to clone the repository.
- **Docker**: You need to have Docker installed on your computer. Docker is a tool that allows you to run applications in containers, which are like small, lightweight virtual machines.

## How to Launch

1. **Clone the Repository**: First, download the project to your computer.

   ```bash
   git clone https://github.com/Asselya123/baspana.git
   cd baspana
   ```

2. **Build and Run with Docker**: Use Docker Compose to build and start the application.

   ```bash
   docker-compose up --build
   ```

   This command will create Docker containers for both the server and client, and start them.

3. **Access the Application**:

   - **Server**: Open your web browser and go to [http://localhost:8765/admin](http://localhost:8765/admin) to access the server.
   - **Client**: Open your web browser and go to [http://localhost:3456](http://localhost:3456) to access the client.

## Tech Stack

### Client

- **React**: A library for building user interfaces. It helps create interactive web pages by allowing developers to build reusable components.
- **Tailwind CSS**: A tool for styling web pages. It provides ready-to-use styles that make designing easier.
- **RTK Query**: A tool for fetching and managing data from the server.
- **Ant Design (Antd)**: A library of pre-made UI components like buttons and forms.

#### Important Files

- `client/package.json`: This file lists all the JavaScript dependencies needed for the client to run. It includes libraries like React, Tailwind CSS, and Ant Design. It also contains scripts for building and running the client application.
- `client/Dockerfile`: Contains instructions for building the client's Docker image.

### Server

- **Django**: A framework for building web applications in Python. It helps manage the backend logic and data.
- **Django REST Framework (DRF)**: An extension of Django that makes it easy to build APIs, which are used to communicate between the server and client.
- **Django Admin**: A built-in feature of Django that provides a simple interface to manage the application's data.
- **SQLite**: A simple database that stores data in a single file. It's easy to set up and use.

#### Important Files

- `server/Dockerfile`: Contains instructions for building the server's Docker image.
- `server/requirements.txt`: Lists all the Python packages the server needs to run.
