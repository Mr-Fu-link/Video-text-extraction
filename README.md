# 视频文案提取插件

## 概述

随着网络视频平台的不断发展，人们对于优质视频内容的需求也越来越大。然而，在观看视频时，我们往往无法将其中的文字信息保存下来，这对我们的学习和创作工作带来了很大的不便。为了满足这一需求，我们可以制作一个谷歌浏览器插件来提取视频中的文案。

## 插件功能

1. 自动检测视频中是否有文字信息
2. 提取文字信息并进行保存或复制到剪贴板
3. 支持多种视频平台（如YouTube、爱奇艺、腾讯视频等）

## 实现步骤

### 1. 环境准备

- 安装 Node.js 和 npm
- 创建一个新的谷歌浏览器插件项目

### 2. 插件结构

一个基本的谷歌浏览器插件通常包含以下文件：

- `manifest.json`：定义插件的基本信息和权限
- `background.js`：后台脚本，负责处理插件的主要逻辑
- `popup.html`：弹出窗口，用于用户交互
- `popup.js`：处理弹出窗口中的事件
- `icons/`：存放图标文件

#### 图标文件

图标文件用于在浏览器工具栏和扩展管理页面中显示插件的图标。通常需要提供不同尺寸的图标以适应不同的显示需求。建议提供的图标尺寸包括：

- `icon16.png`：16x16 像素
- `icon48.png`：48x48 像素
- `icon128.png`：128x128 像素

这些图标文件应放置在 `icons` 文件夹中，并在 `manifest.json` 中正确引用。

### 3. 编写代码

#### manifest.json

```json
{
  "manifest_version": 2,
  "name": "视频文案提取插件",
  "version": "1.0",
  "description": "自动提取网络视频中的文字信息",
  "permissions": [
    "activeTab",
    "storage"
  ],
  "background": {
    "scripts": ["background.js"],
    "persistent": false
  },
  "browser_action": {
    "default_icon": {
      "16": "icons/icon_16.png",
      "48": "icons/icon_48.png",
      "128": "icons/icon_128.png"
    },
    "default_popup": "popup.html"
  }
}

安装步骤
克隆仓库

bash
git clone https://github.com/yourusername/video-caption-extractor.git
cd video-caption-extractor
加载插件

打开浏览器（如 Chrome）。
进入扩展管理页面（Chrome 中是 chrome://extensions/）。
打开右上角的“开发者模式”。
点击“加载已解压的扩展程序”，选择项目目录。
使用说明
启动扩展

当你点击浏览器工具栏上的图标时，会弹出一个简单的 HTML 页面。
该页面展示了扩展的基本功能。
功能介绍

自动检测视频中是否有文字信息。
提取文字信息并进行保存或复制到剪贴板。
支持多种视频平台（如 YouTube、爱奇艺、腾讯视频等）。
示例代码
以下是一个简单的 Python 脚本示例，展示了如何与扩展进行交互：

python
import requests

def fetch_data():
    response = requests.get('https://api.example.com/data')
    return response.json()

if __name__ == "__main__":
    data = fetch_data()
    print(data)
依赖项
requests: 用于发送 HTTP 请求。
beautifulsoup4: 用于解析 HTML 内容。
贡献
欢迎贡献代码！请遵循以下步骤：

Fork 本仓库。
创建你的特性分支 (git checkout -b feature/AmazingFeature)。
提交你的更改 (git commit -m 'Add some AmazingFeature')。
推送到分支 (git push origin feature/AmazingFeature)。
打开一个 Pull Request。
许可证
本项目采用 MIT 许可证。
