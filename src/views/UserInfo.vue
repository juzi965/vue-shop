<template>
  <div>
    <el-card>
      <div slot="header"
        class="clearfix">
        <span>个人信息</span>
      </div>
      <el-form label-position="top"
        ref="userInfoFormRef"
        :model="userInfo"
        :rules="userInfoFormRules">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="姓名"
              prop="userName">
              <el-input v-model="userInfo.userName"></el-input>
            </el-form-item>
            <el-form-item label="生日">
              <el-date-picker type="date"
                placeholder="选择日期"
                v-model="userInfo.birthday"
                value-format="yyyy-MM-dd"
                style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="邮箱"
              prop="email">
              <el-input v-model="userInfo.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别">
              <el-select v-model="userInfo.gender"
                style="width: 100%;">
                <el-option value="男"></el-option>
                <el-option value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="手机号"
              prop="phoneNum">
              <el-input v-model="userInfo.phoneNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex"
          justify="center">
          <el-col :span="12">
            <el-button type="primary"
              style="width: 100%;"
              @click="saveUserInfo">保存信息</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
const qs = require('qs')

export default {
  data() {
    let validateUserName = (rule, value, callback) => {
      this.$http
        .post(
          '/user/validateUserName',
          qs.stringify({ id: this.userInfo.id, userName: value })
        )
        .then(res => {
          if (res.data.code !== 10000) {
            callback(new Error(res.data.message))
          } else callback()
        })
    }
    let validateEmail = (rvarule, value, callback) => {
      this.$http
        .post(
          '/user/validateEmail',
          qs.stringify({ id: this.userInfo.id, email: value })
        )
        .then(res => {
          if (res.data.code !== 10000) {
            callback(new Error(res.data.message))
          } else callback()
        })
    }
    let validatePhone = (rule, value, callback) => {
      this.$http
        .post(
          '/user/validatePhone',
          qs.stringify({ id: this.userInfo.id, phoneNum: value })
        )
        .then(res => {
          if (res.data.code !== 10000) {
            callback(new Error(res.data.message))
          } else callback()
        })
    }
    return {
      userInfo: {},
      userInfoFormRules: {
        userName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { validator: validateUserName, trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        phoneNum: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' },
          {
            pattern: /^0{0,1}(13|15||16|18|19)[0-9]{9}$/,
            message: '手机号格式不对',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      this.$http.get('/user').then(res => {
        if (res.data.code == 10000) {
          this.userInfo = res.data.data
        }
      })
    },
    saveUserInfo() {
      this.$refs.userInfoFormRef.validate((valid, errorObject) => {
        // 验证不通过不提交数据
        if (!valid) return
        // 请求登陆接口
        this.$http
          .post('/user/saveUserInfo', qs.stringify(this.userInfo))
          .then(res => {
            if (res.data.code == 10000) {
              this.$message.success(res.data.message)
              //保存用户信息
            } 
          })
      })
    }
  },
  components: {}
}
</script>

<style lang="less" scoped></style>
