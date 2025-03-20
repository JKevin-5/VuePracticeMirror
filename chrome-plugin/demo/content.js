// content.js
console.log('content is loaded');

function injectScript(file, node) {
  var th = document.getElementsByTagName(node)[0];
  var s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', file);
  th.appendChild(s);
}

// // 移除旧的 CodeMirror 脚本
// const oldScripts = document.querySelectorAll('script[src*="codemirror"]');
// oldScripts.forEach(script => script.remove());

// // 移除旧的 CodeMirror 样式
// const oldStyles = document.querySelectorAll('link[href*="codemirror"]');
// oldStyles.forEach(style => style.remove());

// // 加载新版本的 CodeMirror
// const script = document.createElement('script');
// script.src = chrome.runtime.getURL('codemirror.js');
// document.body.appendChild(script);

// // 加载 Vue 2 的语法提示逻辑（可选）
// const vueSyntaxScript = document.createElement('script');
// vueSyntaxScript.src = chrome.runtime.getURL('vue2-syntax.js');
// document.body.appendChild(vueSyntaxScript);

injectScript( chrome.runtime.getURL('/js/my_file.js'), 'body');