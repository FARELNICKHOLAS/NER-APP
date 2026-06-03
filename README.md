# NER App — Indonesian Named Entity Recognition

Aplikasi analisis Named Entity Recognition (NER) untuk teks Bahasa Indonesia, menggunakan model **XLM-RoBERTa** yang di-fine-tune pada dataset NerGRIT.

## Model

Model tersedia di HuggingFace:

**[farelnickholas/XLM-RoBERTa-NerGRIT-2026](https://huggingface.co/farelnickholas/XLM-RoBERTa-NerGRIT-2026)**

Unduh dan letakkan isinya ke folder `hf_model_ready/` sebelum menjalankan backend.

## Entity yang Dikenali

| Label | Keterangan |
|-------|-----------|
| PER | Person — nama orang |
| ORG | Organization — nama organisasi |
| LOC | Location — nama tempat/lokasi |
| GPE | Geopolitical Entity |
| DAT | Date — tanggal/waktu |
| EVT | Event — nama acara/kejadian |
| PRD | Product — nama produk |

## Stack

- **Backend**: FastAPI + Transformers (local inference)
- **Frontend**: React 19 + Vite + TailwindCSS + Framer Motion
- **Model**: XLM-RoBERTa fine-tuned on NerGRIT

## Cara Menjalankan

### 1. Backend

```bash
pip install fastapi uvicorn transformers torch
python api.py
```

Backend berjalan di `http://127.0.0.1:8000`.

### 2. Frontend

```bash
npm install
npm run dev
```

Frontend berjalan di `http://localhost:5173`.
