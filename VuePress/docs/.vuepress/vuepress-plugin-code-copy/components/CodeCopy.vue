<script setup>
import { ref, onMounted, inject } from "vue";
import { usePageData } from "@vuepress/client";

const buttonText = ref(copybuttonText)
const code = inject('code')
const setText = () => {
    buttonText.value = copiedButtonText
    setTimeout(() => {
        buttonText.value = copybuttonText
    }, 1000)
}

const setClipboard = async (code, cb) => {
    if (navigator.clipboard) {
        await navigator.clipboard.writeText(code).then(
            cb,
            (error) => {
                console.log(error)
            }
        )
    } else {
        let copyelement = document.createElement('textarea')
        document.body.appendChild(copyelement)
        copyelement.value = code
        copyelement.select()
        console.log(document.execCommand('Copy'))
        copyelement.remove()
        cb()
    }
}

const copyToClipboard = (el) => {
    setClipboard(code, setText);
}

</script>

<template>
  <span class="code-copy-btn" @click="copyToClipboard">{{ buttonText }}</span>
</template>

<style scoped>
.code-copy-btn {
    position: absolute;
    bottom: 10px;
    right: 7.5px;
    opacity: 0.75;
    cursor: pointer;
    font-size: 14px;
}

.code-copy-btn:hover {
    opacity: 1;
}
</style>
<style>
.anchor-right{
    z-index: 0;
}
</style>