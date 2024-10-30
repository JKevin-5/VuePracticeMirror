<template>
    <Layout>
        <template #doc-after>
        <div style="margin-top: 24px">
            <Giscus
            :key="page.filePath"
            repo="JKevin-5/JKevin-5.github.io"
            repo-id="R_kgDOG7zIVA"
            category="Announcements"
            category-id="DIC_kwDOG7zIVM4CjJ9q"
            mapping="pathname"
            strict="0"
            reactions-enabled="1"
            emit-metadata="0"
            input-position="top"
            :theme="isDark ? 'dark' : 'light'"
            lang="zh-CN"
            />
        </div>
        </template>
    </Layout>
</template>

<script setup>
import Giscus from '@giscus/vue'
import DefaultTheme from "vitepress/theme";
const { Layout } = DefaultTheme;
import { useData } from "vitepress";
const { isDark,page } = useData();
</script>
