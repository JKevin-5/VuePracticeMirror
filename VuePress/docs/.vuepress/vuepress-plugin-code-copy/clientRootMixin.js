import CodeCopy from "./components/CodeCopy.vue";
import { defineClientConfig } from "@vuepress/client";
import { createApp, onMounted } from "vue";
import { usePages } from "@temp/pages"
export default defineClientConfig({
    setup() {
        // const page = usePageData()
        // console.log(page.value.git)
        const pages = usePages()
        console.log(pages)
        const mountAnchorRight = () => {
            try {
                const ctx = document.querySelector(".theme-default-content");
                ctx.querySelectorAll('div[class*="language-"] pre').forEach(el => {
                    // 防止重复写入
                    if (el.classList.contains('code-copy-added')) return
                    
                    // 添加新节点
                    const codeCopyEl = document.createElement("div");
                    codeCopyEl.className = "code-copy-added";
                    el.appendChild(codeCopyEl);

                    const app = createApp(CodeCopy);
                    // 传给组件
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
