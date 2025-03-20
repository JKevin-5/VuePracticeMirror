console.log('my_file loaded');

if(typeof CodeMirror !== 'undefined') {
    debugger;
}

// 监听 DOM 变化
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((node,index) => {
          // 检查新增的节点是否是 dialog 元素
          if (node.className && node.className.includes('window-container')) {
            console.log('发现一个 dialog 元素:', node);
            if (node.childNodes.length > 1) {
              const header = node.childNodes[0];
              const container = node.childNodes[1];
              const newButton = document.createElement('button');
              newButton.textContent = '获取内容';
              newButton.addEventListener('click', () => {
                console.log(document.getElementsByClassName('window-container')[index].childNodes[1].childNodes[0].CodeMirror.getValue());
              });
              header.appendChild(newButton);
              // 发送消息到 background.js
              // chrome.runtime.sendMessage({ action: 'detectCodeMirror' });
            }
          }
        });
      }
    });
});

observer.observe(document, {
    childList: true,
    subtree: true,
    characterData: true
});