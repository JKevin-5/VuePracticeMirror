<template>
    <div class="login">登录画面</div>
</template>
<script>
    export default {
      name: "Index",
      data() {
        return {
          // 版本号
          version: "3.8.1",
        };
      },
      methods: {
        goTarget(href) {
          window.open(href, "_blank");
        },
      },
    };
</script>