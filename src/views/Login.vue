<template>
    <div class="login_container">
      <div class="login_box">

        <div class="logo_box">
            <img src="../assets/logo.png" alt="头像">
        </div>

        <el-form ref="loginFormRef" class="login_form" :model="loginForm" :rules="loginFormRules">
            <el-form-item prop="username">
                <el-input  
                placeholder="请输入账号"
                prefix-icon="el-icon-user" 
                v-model="loginForm.username"/>
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                type="password"
                placeholder="请输入密码"
                prefix-icon="el-icon-lock" 
                v-model="loginForm.password" />
            </el-form-item>
            <el-form-item class="btns">
                <el-button type="primary" @click="sublimtLogin">登录</el-button>
                <el-button type="info" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>

      </div>  
    </div>
</template>

<script>
export default {
    data(){
        return {
            loginForm:{
                username: 'admin',
                password: '123456'
            },
            loginFormRules:{
                username:[
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }

                ]
            }
        }
    },
    methods:{
        sublimtLogin(){
            this.$refs.loginFormRef.validate((valid,errorObject) =>{
                // 验证不通过不提交数据
                if(!valid) return;
                // 请求登陆接口
                this.$http.get('/currentprice.json').then(res =>{
                    if(res.status==200){
                        this.$message.success('请求成功')
                        // 保存token 
                        window.sessionStorage.setItem("token",res.data);
                        // 跳转到/home
                        this.$router.push('/home')
                    }
                })

            })
        },
        reset(){
            //重置表单
            this.$refs.loginFormRef.resetFields();
        }
    }
}
</script>

<style lang="less" scoped>
.login_container{
    width: 100%;
    height: 100%;
    background-color: salmon;
}
.login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);

    .logo_box{
        height: 130px;
        width: 130px;
        background-color: #fff;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #eee inset;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);


        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
}
.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
.btns{
    display: flex;
    justify-content: flex-end;
}
</style>
