from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import face_recognition
import cv2
import numpy as np
from PIL import Image
import io

app = FastAPI(title="ML Detection Service")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "service": "ML Detection Service",
        "version": "1.0",
        "endpoints": ["/detect-face", "/detect-uniform"]
    }

@app.post("/detect-face")
async def detect_face(file: UploadFile = File(...)):
    """Extract face encoding from uploaded image"""
    try:
        contents = await file.read()
        image = face_recognition.load_image_file(io.BytesIO(contents))
        
        face_encodings = face_recognition.face_encodings(image)
        
        if len(face_encodings) == 0:
            return {"success": False, "message": "No face detected"}
        
        encoding = face_encodings[0].tolist()
        
        return {
            "success": True,
            "encoding": encoding,
            "faces_detected": len(face_encodings)
        }
    except Exception as e:
        return {"success": False, "error": str(e)}

@app.post("/compare-faces")
async def compare_faces(file: UploadFile = File(...), known_encoding: list = None):
    """Compare uploaded face with known encoding"""
    try:
        contents = await file.read()
        image = face_recognition.load_image_file(io.BytesIO(contents))
        
        face_encodings = face_recognition.face_encodings(image)
        
        if len(face_encodings) == 0:
            return {"success": False, "message": "No face detected"}
        
        unknown_encoding = face_encodings[0]
        known = np.array(known_encoding)
        
        matches = face_recognition.compare_faces([known], unknown_encoding)
        distance = face_recognition.face_distance([known], unknown_encoding)[0]
        
        return {
            "success": True,
            "match": bool(matches[0]),
            "distance": float(distance),
            "confidence": float(1 - distance)
        }
    except Exception as e:
        return {"success": False, "error": str(e)}

@app.post("/detect-uniform")
async def detect_uniform(file: UploadFile = File(...)):
    """Detect uniform in uploaded image (placeholder)"""
    try:
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        # TODO: Implement actual uniform detection with YOLO
        # For now, return mock response
        
        return {
            "success": True,
            "uniform_detected": True,
            "confidence": 0.85
        }
    except Exception as e:
        return {"success": False, "error": str(e)}

if __name__ == "__main__":
    import uvicorn
    print("🧠 Starting ML Service on http://localhost:5000")
    uvicorn.run(app, host="0.0.0.0", port=5000)