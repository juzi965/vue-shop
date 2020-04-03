<template>

  <el-container>
    <!-- 导航菜单栏 -->
    <el-header :class="{'header':true,'isFixed':isFixed}"
      height="80px">
      <Navigation></Navigation>
    </el-header>
    <el-main class="main">
      <router-view />
      <el-drawer :visible.sync="menuDrawer"
        size="40%"
        direction="ltr"
        :with-header="false"
        :before-close="handleClose">
        <el-menu :default-active="this.$route.path"
          router
          background-color="#FFFFFF"
          text-color="#000000"
          active-text-color="#FF1232">
          <el-menu-item index="/welcome">首页</el-menu-item>
          <el-submenu index="/shop/全部">
            <template slot="title">商城</template>
            <el-menu-item index="/shop/全部">全部</el-menu-item>
            <el-menu-item index="/shop/男士">男士</el-menu-item>
            <el-menu-item index="/shop/女士">女士</el-menu-item>
            <el-menu-item index="/shop/儿童">儿童</el-menu-item>
            <el-menu-item index="/shop/上衣">上衣</el-menu-item>
            <el-menu-item index="/shop/裤子">裤子</el-menu-item>
            <el-menu-item index="/shop/内衣">内衣</el-menu-item>
            <el-menu-item index="/shop/帽子">帽子</el-menu-item>
          </el-submenu>
          <!-- <el-menu-item index="/fitting-room">试衣间</el-menu-item> -->
        </el-menu>

      </el-drawer>
    </el-main>
    <el-footer class="footer">
      <Footer></Footer>
    </el-footer>

  </el-container>

</template>

<script>
export default {
  data() {
    return {
      scroll: 0,
      isFixed: true
    }
  },
  computed: {
    menuDrawer() {
      return this.$store.state.menuDrawer
    }
  },
  methods: {
    handleClose() {
      this.$store.commit('setMenuDrawer', false)
    },
    Scroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      if (scrollTop > this.scroll) {
        this.isFixed = false
      } else {
        this.isFixed = true
      }
      this.scroll = scrollTop
    },
    initWebSocket() {
      // 连接错误
      this.websocket.onerror = this.setErrorMessage

      // 连接成功
      this.websocket.onopen = this.setOnopenMessage

      // 收到消息的回调
      this.websocket.onmessage = this.setOnmessageMessage

      // 连接关闭的回调
      this.websocket.onclose = this.setOncloseMessage

      // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = this.onbeforeunload
    },
    setErrorMessage() {
      console.log(
        'WebSocket连接发生错误   状态码：' + this.websocket.readyState
      )
    },
    setOnopenMessage() {
      console.log('WebSocket连接成功    状态码：' + this.websocket.readyState)
    },
    setOnmessageMessage(event) {
      this.$notify.warning({
        title: '收到一条通知',
        message: event.data,
        duration: 0
      })
      console.log('服务端返回：' + event.data)
    },
    setOncloseMessage() {
      console.log('WebSocket连接关闭    状态码：' + this.websocket.readyState)
    },
    onbeforeunload() {
      this.closeWebSocket()
    },
    closeWebSocket() {
      this.websocket.close()
    }
  },
  mounted() {
    window.addEventListener('scroll', this.Scroll) // 监听滚动事件，然后用handleScroll这个方法进行相应的处理
    // WebSocket
    if (this.$store.state.userInfo !== null) {
      if ('WebSocket' in window) {
        this.websocket = new WebSocket(
          // 'ws://127.0.0.1:8888/websocket/' + this.$store.state.userInfo.id
          'ws://121.36.7.244:8888/websocket/' + this.$store.state.userInfo.id
        )
        this.initWebSocket()
      } else {
        this.$message.warning('当前浏览器不支持 WebSocket')
      }
    }
  },
  destroyed() {
    document.removeEventListener('scroll', this.Scroll)
  },
  beforeDestroy() {
    if (this.$store.state.userInfo !== null) {
      this.onbeforeunload()
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  position: fixed;
  top: 00px;
  z-index: 999;
  width: 100%;
  background: #ffffff;
  border-bottom: #eee solid 1px;
  transition: all 0.5s ease-in-out;
  transform: translateY(-80px);
}
.isFixed {
  transition: all 0.5s ease-in-out;
  transform: translateY(0px);
}
.main {
  padding-top: 100px;
}
</style>