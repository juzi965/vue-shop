<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>个人信息</span>
      </div>
      <el-form
        label-position="top"
        ref="userInfoFormRef"
        :model="userInfo"
        :rules="userInfoFormRules"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="姓名" prop="userName">
              <el-input v-model="userInfo.userName"></el-input>
            </el-form-item>
            <el-form-item label="生日">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="userInfo.birthday"
                value-format="yyyy-MM-dd"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="userInfo.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别">
              <el-select v-model="userInfo.gender" style="width: 100%;">
                <el-option value="男"></el-option>
                <el-option value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="手机号" prop="phoneNum">
              <el-input v-model="userInfo.phoneNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-button type="primary" style="width: 100%;" @click="saveUserInfo"
              >保存信息</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      userInfoFormRules: {
        userName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        phoneNum: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度在  11 个字符', trigger: 'blur' }
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
        } else {
          this.$message.warning(res.data.message)
        }
      })
    },
    saveUserInfo() {
      this.$refs.userInfoFormRef.validate((valid, errorObject) => {
        // 验证不通过不提交数据
        if (!valid) return
        // 请求登陆接口
        const qs = require('qs')
        this.$http
          .post('/user/saveUserInfo', qs.stringify(this.userInfo))
          .then(res => {
            if (res.data.code == 10000) {
              this.$message.success(res.data.message)
              //保存用户信息
              this.$store.commit('setUserInfo', this.userInfo)
            } else {
              this.$message.warning(res.data.message)
            }
          })
      })
    }
  },
  components: {}
}
</script>

<style lang="less" scoped></style>
