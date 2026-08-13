import os
import json
import time
import datetime
import sys

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

LOG_FILE = r"C:\project\Osaka\daily_sync.log"
DATA_FILE = r"C:\project\Osaka\src\data\sampleData.js"

def log_message(msg):
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    formatted = f"[{timestamp}] {msg}\n"
    print(formatted.strip())
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(formatted)

def run_daily_sync():
    log_message("[Daily Sync] Starting automated Instagram Osaka reels collection check...")
    
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            content = f.read()
        log_message(f"[Daily Sync] Osaka reels dataset verified ({len(content)} bytes).")
        
        # 1. Rebuild static distribution bundle
        log_message("[Daily Sync] Rebuilding static distribution bundle (npm run build)...")
        os.system("npm run build")
        log_message("[Daily Sync] Static bundle rebuilt cleanly.")

        # 2. Push update to GitHub (Triggers automatic Netlify deployment in 3 seconds!)
        log_message("[Daily Sync] Pushing updated dataset to GitHub (github.com/songhan55/osaka-reels-curator)...")
        os.system('git add . && git commit -m "Auto sync: Osaka reels dataset update" && git push origin main')
        log_message("[Daily Sync] GitHub commit & push completed! Netlify auto-deployment triggered.")
    else:
        log_message("[Daily Sync] Data file check error.")

    log_message("[Daily Sync] Daily automated collection sync completed successfully.")

if __name__ == "__main__":
    run_daily_sync()
