import { createRouter, createWebHistory } from "vue-router";
import { ElMessage } from 'element-plus'
import store from '../store'
const routes = [
  {
    path: '/index',
    name: 'Index',
    components: {
      app: () => import('../views/Index.vue')
    },
    meta: {
      isAuthRequried: true
    },
    children: [
      {
        path: 'statistics',
        name: '首页统计',
        components: {
          index: () => import('../components/Home/Statistics.vue')
        }
      },
      {
        path: 'classify',
        name: '分类管理',
        components: {
          index: () => import('../components/Home/Category.vue')
        }
      },
      {
        path: 'comment',
        name: '评论管理',
        components: {
          index: () => import('../components/Home/Comment.vue')
        }
      },
      {
        path: 'goods',
        name: '商品管理',
        components: {
          index: () => import('../components/Home/Goods.vue')
        }
      },
      {
        path: 'order',
        name: '订单管理',
        components: {
          index: () => import('../components/Home/Order.vue')
        }
      },
      {
        path: 'slideshow',
        name: '轮播管理',
        components: {
          index: () => import('../components/Home/Slideshow.vue')
        }
      },
      {
        path: 'user',
        name: '用户管理',
        components: {
          index: () => import('../components/Home/User.vue')
        }
      }
    ],
  },
  {
    path: '/login',
    name: 'Login',
    components: {
      app: () => import('../views/Login.vue')
    }
  },
  {
    path: '/',
    components: {
      app: () => import('../views/Login.vue')
    }
  },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  //如果没有登录去登录
  if (to.meta.isAuthRequried && store.state.isLogin == false) {
    ElMessage.error('你还没有登录,请先登录!');
    setTimeout(() => {
      next('/login');
    }, 500)
  } else {
    next();
  }
})
export default router;
