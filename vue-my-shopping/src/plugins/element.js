import Vue from 'vue'
// 引入element-UI
import {Button,Message,Input,Form, FormItem} from 'element-ui'

Vue.use(Loading.directive);
Vue.use(Button);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);

Vue.prototype.$message = Message
