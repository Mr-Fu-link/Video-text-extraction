import os
import json
import requests
from concurrent.futures import ThreadPoolExecutor

# 读取配置文件
with open('config.json', 'r') as f:
    config = json.load(f)

API_URL = config['api_url']
OUTPUT_DIR = config['output_dir']

def download_icon(icon_url, output_path):
    """下载单个图标"""
    response = requests.get(icon_url)
    if response.status_code == 200:
        with open(output_path, 'wb') as f:
            f.write(response.content)
        print(f"Downloaded: {output_path}")
    else:
        print(f"Failed to download: {icon_url}")

def main():
    # 创建输出目录
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # 获取图标列表
    response = requests.get(API_URL)
    if response.status_code != 200:
        print("Failed to fetch icon list.")
        return

    icon_list = response.json()

    # 使用多线程下载图标
    with ThreadPoolExecutor(max_workers=10) as executor:
        for icon in icon_list:
            icon_url = icon['url']
            icon_name = icon['name']
            output_path = os.path.join(OUTPUT_DIR, icon_name)
            executor.submit(download_icon, icon_url, output_path)

if __name__ == "__main__":
    main()