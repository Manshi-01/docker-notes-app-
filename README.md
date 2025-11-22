# Docker Notes App


A small, production-style Docker project demonstrating Dockerfile best practices, Docker Compose, reverse proxy, persistent volumes, and app healthchecks.


## What you get
- Node.js Notes API (CRUD)
- MongoDB for persistence
- Nginx reverse proxy
- Multi-stage Dockerfile and non-root runtime user
- docker-compose for local orchestration


## Quickstart


1. Build and start services:


docker compose up --build -d


2. Check services:


- App: http://localhost:5000
- Nginx (proxy): http://localhost:80


3. Create a note (curl):


curl -X POST http://localhost:5000/notes -H 'Content-Type: application/json' -d '{"title":"hello","body":"world"}'


4. Run tests (after starting):


bash tests/test_crud.sh


## Production notes
- Replace MongoDB with managed DB for production (Atlas or cloud provider DB).
- Use environment variables for secrets and connection strings.
- Add log forwarding (Fluentd or AWS CloudWatch agent) for production logs.


## Resume bullets (copy to resume)
- "Containerized a Node.js Notes API using a multi-stage Dockerfile and deployed it locally with Docker Compose (app, MongoDB, Nginx); implemented healthchecks, non-root runtime, and persistent storage."
- "Built local observability with optional cAdvisor metrics and prepared the app for CI integration and container registry publishing."


## Next steps (suggested)
1. Add GitHub Actions to build images and push to Doc