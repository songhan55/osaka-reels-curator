import zipfile
import json
import sys

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

def fix_encoding(text):
    if not isinstance(text, str):
        return text
    try:
        return text.encode('latin1').decode('utf-8')
    except:
        return text

zip_path = r"c:\project\Osaka\instagram-sshan__gg-2026-08-14-pc8n0q4C.zip"

with zipfile.ZipFile(zip_path, 'r') as z:
    with z.open('your_instagram_activity/saved/saved_collections.json') as f:
        colls = json.loads(f.read().decode('utf-8'))
        print(f"=== Total collections: {len(colls)} ===")
        for i, c in enumerate(colls):
            print(f"\n--- Collection #{i+1} ---")
            labels = {fix_encoding(lv.get('label', '')): fix_encoding(lv.get('value', '')) for lv in c.get('label_values', [])}
            print("Labels:", labels)
            print("Media count:", len(c.get('media', [])))
            if c.get('media'):
                print("First 3 media:", c.get('media')[:3])
            if 'string_list_data' in c:
                print("string_list_data:", c['string_list_data'])

    with z.open('your_instagram_activity/saved/saved_posts.json') as f:
        posts = json.loads(f.read().decode('utf-8'))
        print(f"\n=== Total saved_posts: {len(posts)} ===")
        for i, p in enumerate(posts[:5]):
            print(f"\n--- Post #{i+1} ---")
            labels = {fix_encoding(lv.get('label', '')): fix_encoding(lv.get('value', '')) for lv in p.get('label_values', [])}
            print("Labels:", labels)
