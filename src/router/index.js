import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: () => import('../views/home.vue'),

    children: [{
      path: '',
      name: 'Overview',
      component: () => import('../views/overview.vue')
    }, {
      path: 'upload',
      name: 'Upload',
      component: () => import('../views/upload.vue')
    }, {
      path: 'edit_gallery',
      name: "Edit_gallery",
      component: () => import('../views/edit_gallery.vue')
    }, {
      path: 'post_blog',
      name: "Post_blog",
      component: () => import('../views/post_blog.vue')
    }, {
      path: 'blog',
      name: "Blog",
      component: () => import('../views/blog.vue')
    }, {
      path: 'post_story',
      name: "Post_story",
      component: () => import('../views/post_story.vue')
    }, {
      path: 'story',
      name: "Story",
      component: () => import('../views/story.vue')
    }]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/about.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router