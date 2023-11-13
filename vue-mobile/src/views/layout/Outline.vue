<template>
    <div id="outline">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:'outline'
}
</script>

<style scoped>
#outline {
    color: rgba(69, 90, 100, 0.6);
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>>