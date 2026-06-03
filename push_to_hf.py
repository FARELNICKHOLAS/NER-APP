import os
from huggingface_hub import HfApi, login

def push_model():
    print("Mempersiapkan untuk push ke Hugging Face...")
    token = os.environ.get("HF_TOKEN")
    
    if not token:
        print("Error: HF_TOKEN environment variable tidak ditemukan!")
        print("Silakan setel token Anda di terminal sebelum menjalankan script ini.")
        print("Windows (PowerShell): $env:HF_TOKEN=\"hf_xxxx\"")
        print("Windows (CMD): set HF_TOKEN=hf_xxxx")
        return
        
    try:
        login(token=token)
        print("Login berhasil!")
    except Exception as e:
        print(f"Gagal login: {e}")
        return

    repo_id = "farelnickholas/XLM-RoBERTa-NerGRIT-2026"
    api = HfApi()
    
    print(f"Mengecek atau membuat repository {repo_id}...")
    try:
        api.create_repo(repo_id=repo_id, exist_ok=True, repo_type="model")
    except Exception as e:
        print(f"Gagal membuat repository (pastikan akun Anda farelnickholas): {e}")
        return

    folder_path = "./hf_model_ready"
    print(f"Mengunggah file dari {folder_path} ke {repo_id}...")
    
    try:
        api.upload_folder(
            folder_path=folder_path,
            repo_id=repo_id,
            repo_type="model",
            commit_message="Initial model push with Model Card and weights"
        )
        print("✅ Push selesai! Model Anda sudah tersedia di Hugging Face.")
    except Exception as e:
        print(f"Gagal mengunggah file: {e}")

if __name__ == "__main__":
    push_model()
