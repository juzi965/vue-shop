<template>
  <div>
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>个人信息</span>
      </div>
      <el-form label-position="top"
               ref="passwordFormRef"
               :rules="passwordFormRules"
               :model="passwordForm">
        <el-row type="flex"
                justify="center">
          <el-col :span="12">
            <el-form-item label="原密码"
                          prop="oldPassword">
              <el-input v-model="passwordForm.oldPassword"></el-input>
            </el-form-item>
            <el-form-item label="新密码"
                          prop="newPassword">
              <el-input v-model="passwordForm.newPassword"
                        type="password"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码"
                          prop="checkPassword">
              <el-input v-model="passwordForm.checkPassword"
                        type="password"
                        autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex"
                justify="center">
          <el-col :span="6">
            <el-button type="primary"
                       style="width: 100%;"
                       @click="changePassword">确认修改</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

  </div>

</template>

<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.passwordForm.checkPassword !== '') {
          this.$refs.passwordFormRef.validateField('checkPassword');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.passwordForm.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      passwordForm: {
        oldPassword: '',
        newPassword: '',
        checkPassword: ''
      },
      passwordFormRules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        newPassword: [
          { validator: validatePass, trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        checkPassword: [
          { validator: validatePass2, trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    changePassword () {
      this.$refs.passwordFormRef.validate((valid, errorObject) => {
        // 验证不通过不提交数据
        if (!valid) return
        // 请求登陆接口
        const qs = require('qs');
        this.$http.post('/user/changePassword', qs.stringify(this.passwordForm)).then(res => {
          if (res.data.code == 10000) {
            this.$message.success(res.data.message)
            this.$router.push('/login')
          } 
        })
      })
    }
  },
  components: {

  }
}
</script>

<style lang="less" scoped>
</style>
