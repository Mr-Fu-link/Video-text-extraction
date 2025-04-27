from flask import Flask, jsonify
import random

app = Flask(__name__)

# 模拟图标数据
ICONS = [
    {"name": f"icon_{i}.png", "url": f"https://example.com/icons/icon_{i}.png"} for i in range(100)
]

@app.route('/api/icons', methods=['GET'])
def get_icons():
    """返回图标列表"""
    return jsonify(ICONS)

if __name__ == "__main__":
    app.run(port=5000)