import CodeCopy from "./components/CodeCopy.vue";
import { defineClientConfig } from "@vuepress/client";
import { createApp, onMounted ,watch } from "vue";
// import { usePages } from "@temp/pages"
import { useRoute } from "vue-router";
export default defineClientConfig({
    setup() {
        // console.log(page.value.git)
        // const pages = usePages()
        // console.log(pages)
        const mountCodeCopy = () => {
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
            }
        };
        const route = useRoute();
        onMounted(() => {
            setTimeout(() => {
                mountCodeCopy();
            }, 300);
        });

        watch(
            () => route.path,
            (oldVal, newVal) => {
              if (oldVal !== newVal) {
                setTimeout(() => {
                  // 路由切换加动画了 导致不能及时获取最新page的code-copy-added元素 故而加一个定时器
                  mountCodeCopy();
                }, 300);
              }
            },
            {
              immediate: true,
            }
        );
    }
})
