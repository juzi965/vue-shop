<template>
  <el-container class="login_container">
    <el-main>
      <el-row type="flex"
              justify="center"
              align="middle"
              class="login_row">
        <el-col :span="8">
          <el-card>
            <div class="avatar_box">
              <el-avatar :size="80"
                         src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            </div>
            <el-form ref="loginFormRef"
                     class="login_form"
                     :model="loginForm"
                     :rules="loginFormRules">
              <el-form-item prop="username">
                <el-input placeholder="请输入账号"
                          prefix-icon="el-icon-user"
                          v-model="loginForm.username" />
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password"
                          placeholder="请输入密码"
                          prefix-icon="el-icon-lock"
                          v-model="loginForm.password" />
              </el-form-item>
              <el-form-item class="btns">
                <el-button type="primary"
                           @click="sublimtLogin">登录</el-button>
                <el-button type="info"
                           @click="reset">重置</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    sublimtLogin () {
      this.$refs.loginFormRef.validate((valid, errorObject) => {
        // 验证不通过不提交数据
        if (!valid) return
        // 请求登陆接口
        this.$http.get('/currentprice.json').then(res => {
          if (res.status == 200) {
            this.$message.success('请求成功')
            // 保存token
            window.sessionStorage.setItem('token', res.data)
            // 跳转到/home
            this.$router.push('/home')
          }
        })
      })
    },
    reset () {
      //重置表单
      this.$refs.loginFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  width: 100%;
  height: 100%;
  background-color: salmon;
}
.login_row {
  width: 100%;
  height: 100%;
  .avatar_box {
    text-align: center;
    padding-bottom: 20px;
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
