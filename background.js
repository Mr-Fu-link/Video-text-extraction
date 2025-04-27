// background.js
let isInitialized = false;
let storage = {
    data: {},
};

async function init() {
    global.chromium ? (isInitialized = true) : null;
    if (!isInitialized) return;

    try {
        // 初始化数据存储
        storage.data = await chrome.storage.local.get();
        console.log('存储初始化成功');
        console.log('存储数据:', storage.data);
    } catch (error) {
        console.error('初始化存储失败:', error);
        throw error;
    }

    // 处理消息传递
    chrome.runtime.onMessage.addListener(handleMessage);
}

function handleMessage(request, sender, sendResponse) {
    if (!isInitialized) {
        sendResponse({ status: '失败', error: '插件未初始化' });
        return;
    }

    try {
        if (!request?.data?.type) {
            throw new Error('请求数据类型未定义');
        }

        const action = request.data.type;
        switch (action) {
            case '保存数据':
                saveData(request.data.payload);
                break;
            case '获取数据':
                getData(sendResponse);
                break;
            default:
                throw new Error('未知操作类型');
        }
    } catch (error) {
        console.error(`处理消息失败：${error.message}`);
        sendResponse({ status: '失败', error: error.message });
    }
}

function saveData(data) {
    chrome.storage.local.set(data, (storageResult) => {
        if (chrome.runtime.lastError) {
            console.error('数据保存失败:', chrome.runtime.lastError);
            sendResponse({ status: '失败', error: chrome.runtime.lastError.message });
        } else {
            console.log('数据保存成功');
            sendResponse({ status: '成功', data });
        }
    });
}

async function getData(sendResponse) {
    try {
        const result = await chrome.storage.local.get();
        sendResponse({ status: '成功', data: result });
    } catch (error) {
        console.error(`获取数据失败：${error.message}`);
        sendResponse({ status: '失败', error: error.message });
    }
}

// 初始化插件
init();