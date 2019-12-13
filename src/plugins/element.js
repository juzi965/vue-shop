import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/base.css';
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
  Image,
  Divider,
  ButtonGroup,
  Badge
} from 'element-ui'

import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
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
Vue.use(Divider)
Vue.use(ButtonGroup)
Vue.use(Badge)

Vue.component(CollapseTransition.name, CollapseTransition)



//挂载消息弹框属性
Vue.prototype.$message = Message

//挂载confirm属性
Vue.prototype.$confirm = MessageBox.confirm