import CodeCopy from "./components/CodeCopy.vue";
import { defineClientConfig } from "@vuepress/client";
import { createApp, onMounted } from "vue";
export default defineClientConfig({
    setup() {
        const mountAnchorRight = () => {
            try {
                const ctx = document.querySelector(".theme-default-content");
                ctx.querySelectorAll('div[class*="language-"] pre').forEach(el => {
                    // 防止重复写入
                    if (el.classList.contains('code-copy-added')) return
                    
                    // 添加新节点
                    const codeCopyEl = document.createElement("div");
                    codeCopyEl.className = "code-copy-added";
                    el.appendChild(anchorRight);

                    const app = createApp(CodeCopy);
                    app.provide("code", el.innerText);
                    app.mount(codeCopyEl);
                })
            }catch(error){
                console.log(error)
            }
        };
        
        onMounted(() => {
            setTimeout(() => {
                mountAnchorRight();
            }, 300);
        });
    }
})
