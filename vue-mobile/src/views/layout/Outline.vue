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

<style>
#outline {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: rgb(236, 234, 234);
}
.content::-webkit-scrollbar {
    display: none;
}
</style>>