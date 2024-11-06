<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import DefaultTheme from 'vitepress/theme'
import { darkTheme,NConfigProvider } from 'naive-ui'
const { Layout } = DefaultTheme
import { useData } from 'vitepress'

const { isDark } = useData()

</script>

<template>
    <n-config-provider :theme="isDark?darkTheme:''">
        <Layout></Layout>
    </n-config-provider>
</template>