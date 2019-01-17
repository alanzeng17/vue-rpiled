import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Posts from '@/components/Posts'
import Color from '@/components/color/Color'
import FavoriteColors from '@/components/color/Favorite'
import AnimationLayout from '@/components/animations/Layout'
import AnimationTemplates from '@/components/animations/Templates'
import SavedAnimations from '@/components/animations/Saved'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    }, 
    {
      path: '/color',
      name: 'Color',
      component: AnimationLayout,
      children: [
        {
          path: 'picker',
          name: 'Picker',
          component: Color
        },
        {
          path: 'favorites',
          name: 'Favorites',
          component: FavoriteColors
        }
      ]
    },
    {
      path: '/animation',
      name: 'Animation',
      component: AnimationLayout,
      children: [
        {
          path: 'templates',
          name: 'Templates',
          component: AnimationTemplates
        },
        {
          path: 'saved',
          name: 'Saved',
          component: SavedAnimations
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }

    
  ]
})
