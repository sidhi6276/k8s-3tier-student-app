# 🎓 K8s 3-Tier Student Management App

A full-stack student management application deployed on Kubernetes using a 3-tier architecture. This project demonstrates how to containerize a web application using Docker and deploy it on Kubernetes with Ingress routing.

## 🌐 Live App
```
http://13.233.47.203:8080
```

## 🔑 Default Login
```
Username: admin
Password: admin123
```

## 🏗️ Architecture
```
Internet
   ↓
EC2 Public IP (13.233.47.203:8080)
   ↓
Port Forward
   ↓
Kubernetes Ingress Controller
   ↙                    ↘
/                      /api/
↓                        ↓
Nginx (Frontend)      FastAPI (Backend)
HTML, CSS, JS            ↓
                      MongoDB (Database)
                      Students Data
```
## 📸 Screenshots

### Login Page
![Login Page](images/Screenshot%20(750).png)

### Dashboard
![Dashboard](images/Screenshot%20(751).png)

## 🏗️ Architecture
## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | HTML, CSS, JS | User Interface |
| Web Server | Nginx | Serve Static Files |
| Backend | Python, FastAPI | REST API |
| Database | MongoDB | Store Student Data |
| Container | Docker | Containerization |
| Orchestration | Kubernetes | Container Management |
| Ingress | Nginx Ingress | Traffic Routing |
| Cloud | AWS EC2 | Hosting |

## 📁 Project Structure
```
kubernetes/
├── frontend/
│   ├── index.html          ← Login Page
│   ├── dashboard.html      ← Student Management
│   ├── style.css           ← Styling
│   ├── app.js              ← API Calls
│   ├── nginx.conf          ← Nginx Config
│   └── Dockerfile          ← Frontend Image
├── backend/
│   ├── main.py             ← FastAPI Routes
│   ├── requirements.txt    ← Python Dependencies
│   └── Dockerfile          ← Backend Image
└── k8s/
    ├── mongo-deployment.yml
    ├── mongo-service.yml
    ├── fastapi-deployment.yml
    ├── fastapi-service.yml
    ├── frontend-deployment.yml
    ├── frontend-service.yml
    └── ingress.yml
```

## ✨ Features

- ✅ Login & Authentication System
- ✅ Add New Students
- ✅ View All Students in Table
- ✅ Delete Students
- ✅ Course Statistics Dashboard
- ✅ Real-time Data from MongoDB
- ✅ Kubernetes Ingress Routing
- ✅ Dockerized Frontend & Backend
- ✅ CORS Enabled API
- ✅ Health Check Endpoints

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /health | Health Check |
| POST | /api/login | User Login |
| GET | /api/students | Get All Students |
| POST | /api/students | Add Student |
| DELETE | /api/students/{email} | Delete Student |
| GET | /api/stats | Get Statistics |

## 🚀 How to Run

### Prerequisites
- Docker
- Minikube
- kubectl
- AWS EC2 (Ubuntu)

### 1. Clone Repository
```bash
git clone https://github.com/your-username/k8s-3tier-student-app.git
cd k8s-3tier-student-app
```

### 2. Start Minikube
```bash
minikube start
```

### 3. Build Docker Images
```bash
cd frontend
docker build -t frontend-app:latest .

cd ../backend
docker build -t fastapi-app:latest .
```

### 4. Load Images in Minikube
```bash
minikube image load frontend-app:latest
minikube image load fastapi-app:latest
```

### 5. Enable Ingress
```bash
minikube addons enable ingress
```

### 6. Deploy on Kubernetes
```bash
cd k8s
kubectl apply -f mongo-deployment.yml
kubectl apply -f mongo-service.yml
kubectl apply -f fastapi-deployment.yml
kubectl apply -f fastapi-service.yml
kubectl apply -f frontend-deployment.yml
kubectl apply -f frontend-service.yml
kubectl apply -f ingress.yml
```

### 7. Verify All Pods Running
```bash
kubectl get all
```

Output should show:
```
pod/fastapi-deployment    1/1     Running
pod/frontend-deployment   1/1     Running
pod/mongo-deployment      1/1     Running
```

### 8. Access App
```bash
kubectl port-forward service/frontend-service 8080:80 --address 0.0.0.0
```

Open browser:
```
http://your-ec2-ip:8080
```

## 📊 Kubernetes Resources

| Resource | Name | Type |
|----------|------|------|
| Deployment | mongo-deployment | Database |
| Deployment | fastapi-deployment | Backend |
| Deployment | frontend-deployment | Frontend |
| Service | mongo-service | ClusterIP |
| Service | fastapi-service | ClusterIP |
| Service | frontend-service | ClusterIP |
| Ingress | app-ingress | Nginx |

## 🔍 Useful Commands
```bash
# Check all pods
kubectl get pods

# Check logs
kubectl logs pod/fastapi-deployment-xxx

# Check ingress
kubectl get ingress

# Enter MongoDB
kubectl exec -it pod/mongo-deployment-xxx -- mongosh
use studentsdb
db.students.find().pretty()

# Check services
kubectl get svc
```

## 👩‍💻 Author
Your Name
GitHub: Sidhi goel
