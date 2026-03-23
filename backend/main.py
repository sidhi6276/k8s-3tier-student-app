from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from pydantic import BaseModel
import os

app = FastAPI(title="K8s 3-Tier App", version="1.0.0")

# CORS — Frontend se API call allow karne ke liye
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Connection
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
client = MongoClient(MONGO_URL)
db = client["studentsdb"]
students_col = db["students"]
users_col = db["users"]

# Startup mein admin user seed karo
@app.on_event("startup")
def seed_admin():
    if not users_col.find_one({"username": "admin"}):
        users_col.insert_one({
            "username": "admin",
            "password": "admin123",
            "role": "admin"
        })

# ── Models ──────────────────────────────
class Student(BaseModel):
    name: str
    age: int
    course: str
    email: str

class LoginRequest(BaseModel):
    username: str
    password: str

# ── Health & Root ────────────────────────
@app.get("/")
def root():
    return {"message": "K8s 3-Tier App Running! 🚀"}

@app.get("/health")
def health():
    return {"status": "healthy"}

# ── Auth Routes ──────────────────────────
@app.post("/api/login")
def login(req: LoginRequest):
    user = users_col.find_one({
        "username": req.username,
        "password": req.password
    })
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {
        "message": "Login successful!",
        "username": user["username"],
        "role": user["role"]
    }

# ── Student Routes ───────────────────────
@app.post("/api/students")
def add_student(student: Student):
    if students_col.find_one({"email": student.email}):
        raise HTTPException(status_code=400, detail="Email already exists!")
    result = students_col.insert_one(student.dict())
    return {"message": "Student added!", "id": str(result.inserted_id)}

@app.get("/api/students")
def get_students():
    students = list(students_col.find({}, {"_id": 0}))
    return {"students": students, "total": len(students)}

@app.delete("/api/students/{email}")
def delete_student(email: str):
    result = students_col.delete_one({"email": email})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Student not found!")
    return {"message": "Student deleted!"}

@app.get("/api/stats")
def get_stats():
    total = students_col.count_documents({})
    courses = students_col.distinct("course")
    return {
        "total_students": total,
        "total_courses": len(courses),
        "courses": courses
    }
