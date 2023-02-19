<!-- 登录页面 -->
<template>
  <div class="main">
    <div class="login_form">
      <van-form ref="loginForm" @submit="onSubmit">
        <van-field
          v-model="userName"
          name="userName"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import {login} from '@/api/login';
export default {
  data () {
    return {
      userName: 'admin',
      userPassword: '123456'
    }
  },
  created () {},
  methods: {
    onSubmit(values) {
      this.$refs.loginForm.validate().then(()=>{
        login(values).then((res)=>{
            this.$Tools.setToken(res.data);
            this.$router.push('/home');
          })
      }).catch((err)=>{
        console.log(err);
        // 验证失败
        this.$toast.fail("账号密码内容错误")
      })
    }
  }
}
</script>

<style lang='less' scoped type='text/css'>
.main {
  display: flex;
  min-height: 100vh;
}
.login_form{
  margin: auto;
}

</style>
