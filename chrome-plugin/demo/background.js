// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('a message from content script:', message);
    if (message.action === 'detectCodeMirror') {
      const tabId = sender.tab.id;
  
      // 注入 detectCodeMirror 函数到目标标签页
      chrome.scripting.executeScript({
        target: { tabId },
        function: detectCodeMirror,
      }, (results) => {
          console.log('CodeMirror 检测结果:', results);
      });
    }
  });
  
  // 检测 CodeMirror 实例的函数
  function detectCodeMirror() {
    console.log('check codemirror');
    if (typeof CodeMirror !== 'undefined') {
        // 移除旧的 CodeMirror 脚本
        const oldScripts = document.querySelectorAll('script[src*="codemirror"]');
        oldScripts.forEach(script => script.remove());
    
        // 移除旧的 CodeMirror 样式
        const oldStyles = document.querySelectorAll('link[href*="codemirror"]');
        oldStyles.forEach(style => style.remove());
    
        // 加载新版本的 CodeMirror
        const script = document.createElement('script');
        script.src = chrome.runtime.getURL('codemirror.js');
        document.body.appendChild(script);
    
        // 加载 Vue 2 的语法提示逻辑（可选）
        const vueSyntaxScript = document.createElement('script');
        vueSyntaxScript.src = chrome.runtime.getURL('vue2-syntax.js');
        document.body.appendChild(vueSyntaxScript);
    
        // 初始化新版本的 CodeMirror
        script.onload = () => {
        const editor = CodeMirror.fromTextArea(document.querySelector('textarea'), {
            mode: 'javascript',
            lint: Vue2SyntaxValidator, // 使用 Vue 2 的语法提示
            lineNumbers: true
        });
        console.log('CodeMirror replaced successfully!');
        };
    }
  }
  