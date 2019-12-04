import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  MessageBox,
  Card,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Row,
  Col,
  Avatar,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Popconfirm,
  Carousel,
  CarouselItem,
  Image
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Card)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Row)
Vue.use(Col)
Vue.use(Container)
Vue.use(Avatar)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Popconfirm)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Image)



//挂载消息弹框属性
Vue.prototype.$message = Message

//挂载confirm属性
Vue.prototype.$confirm = MessageBox.confirm