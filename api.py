import time
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline
import uvicorn

MODEL_DIR = Path(__file__).parent / "hf_model_ready"

print(f"Loading model from {MODEL_DIR} ...")
ner_pipeline = pipeline(
    "ner",
    model=str(MODEL_DIR),
    tokenizer=str(MODEL_DIR),
    aggregation_strategy="simple",
    device=-1,  # CPU; ganti ke 0 jika pakai GPU
)
print("Model loaded.")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class TeksInput(BaseModel):
    teks: str

@app.get("/")
def root():
    return {"status": "ok", "model": str(MODEL_DIR)}

@app.post("/predict")
def predict_ner(data: TeksInput):
    if not data.teks.strip():
        raise HTTPException(status_code=400, detail="Teks input tidak boleh kosong.")

    start_time = time.perf_counter()

    raw_results = ner_pipeline(data.teks)

    entities = []
    for e in raw_results:
        entities.append({
            "word": e.get("word", ""),
            "label": e.get("entity_group", e.get("entity", "")).replace("B-", "").replace("I-", ""),
            "start": e.get("start", 0),
            "end": e.get("end", 0),
            "score": round(float(e.get("score", 0.0)), 4)
        })

    waktu_ms = (time.perf_counter() - start_time) * 1000

    return {
        "teks_input": data.teks,
        "entities": entities,
        "waktu_inference_ms": round(waktu_ms, 2)
    }

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
