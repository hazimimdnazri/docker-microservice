# Docker Microservice

## What is this?

Docker container or containerization is an alternative for virtualization. You can setup an ideal environment for an application and it will run without any hassel on any machine. This will avoid the it-work-on-my-machine situation. This is the initialization code for running a NodeJs application with a docker container. This setup will create a single docker containers (NodeJs v21).

## How do I use it?

- Make sure you already install `docker` and `docker-compose`.
- Create another copy of the `.env.example` file and rename it to `.env`.  
- Run: 
    ```
    docker-compose up --build
    ```
    or
    ```
    docker-compose up -d
    ```
    for detached mode.

- The application will be serving on your port 3000.
