<template>
  <div>
    <el-card>
      <div slot="header"
        class="clearfix">
        <span>地址信息</span>
        <el-button style="float: right; padding: 3px 0"
          type="text"
          @click="addAddress">添加地址</el-button>
      </div>
      <el-row :gutter="20">
        <el-col :span="12"
          v-for="addressInfo in addressInfos"
          :key="addressInfo.id">
          <h4>
            收件人：
            <span>{{ addressInfo.recipient }}</span>
          </h4>
          <p>
            手机号：
            <span>{{ addressInfo.phoneNum }}</span>
          </p>
          <span>
            收货地址：
            <span>{{ addressInfo.address }}</span>
          </span>
          <el-button type="danger"
            size="small"
            style="float:right;"
            icon="el-icon-delete"
            circle
            @click="deleteAddress(addressInfo.id)"></el-button>
          <el-button type="primary"
            size="small"
            style="float:right; margin-right:10px;"
            icon="el-icon-edit"
            @click="getAddress(addressInfo.id)"
            circle></el-button>
          <el-divider></el-divider>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog title="收货地址"
      :visible.sync="dialogForm">
      <el-form ref="addressInfoFormRef"
        :model="addressInfoForm"
        :rules="addressInfoFormRules">
        <el-form-item label="收件人"
          prop="recipient">
          <el-input v-model="addressInfoForm.recipient"></el-input>
        </el-form-item>
        <el-form-item label="手机号"
          prop="phoneNum">
          <el-input v-model="addressInfoForm.phoneNum"></el-input>
        </el-form-item>
        <el-form-item label="收货地址"
          prop="address">
          <el-input v-model="addressInfoForm.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
        class="dialog-footer">
        <el-button @click="dialogForm = false">取 消</el-button>
        <el-button type="primary"
          @click="changeAddress">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addressInfos: '',
      dialogForm: false,
      addressInfoForm: {
        id: '',
        recipient: '',
        phoneNum: '',
        address: '',
        userId: ''
      },
      addressInfoFormRules: {
        recipient: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' },
          {
            min: 5,
            max: 50,
            message: '长度在 10 到 50 个字符',
            trigger: 'blur'
          }
        ],
        phoneNum: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度在  11 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.$http.get('/address').then(res => {
        if (res.data.code == 10000) {
          this.addressInfos = res.data.data
        } else {
          this.$message.warning(res.data.message)
        }
      })
    },
    getAddress(id) {
      this.$http.get('/address/id/' + id).then(res => {
        if (res.data.code == 10000) {
          this.addressInfoForm = res.data.data
        } else {
          this.$message.warning(res.data.message)
        }
      })
      this.dialogForm = true
    },
    deleteAddress(id) {
      this.$confirm('确定要删除此地址吗？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.post('/address/deleteAddress/' + id).then(res => {
            if (res.data.code == 10000) {
              this.$message.success(res.data.message)
              this.initData()
            } else {
              this.$message.warning(res.data.message)
            }
          })
        })
        .catch(() => {
          this.$message.warning('取消删除')
        })
    },
    changeAddress() {
      this.$refs.addressInfoFormRef.validate((valid, errorObject) => {
        // 验证不通过不提交数据
        if (!valid) return
        // 请求登陆接口
        const qs = require('qs')
        this.$http
          .post('/address/changeAddress', qs.stringify(this.addressInfoForm))
          .then(res => {
            if (res.data.code == 10000) {
              this.dialogForm = false
              this.$message.success(res.data.message)
              this.initData()
            } else {
              this.$message.warning(res.data.message)
            }
          })
      })
    },
    addAddress() {
      this.dialogForm = true
      this.addressInfoForm.id = ''
      this.addressInfoForm.userId = this.$store.state.userInfo.id
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
.el-col {
  p {
    margin-top: 5px;
    margin-bottom: 5px;
  }
}
</style>
