<template>
  <v-app dark>
    <v-toolbar app>
      <v-btn icon @click.stop="drawer = !drawer">
        <v-icon>menu</v-icon>
      </v-btn>
      <v-toolbar-title class="headline text-uppercase">
        <span>RPI</span>
        <span class="font-weight-light">LED</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-flex xs5>
        <v-text-field prepend-icon='search' :clearable=true placeholder='Search..' v-if="currentTab==='Animations'">
        </v-text-field>
      </v-flex>
    </v-toolbar>
    
    <!-- <AppSidebar :visible="drawer"/> -->
    <v-navigation-drawer
    v-model="drawer"
    :mini-variant="mini"
    absolute
    dark
    temporary
    app
    clipped
    :width="220"
    :mobile-break-point="960"
    enable-resize-watcher
    >
      <v-list class="pa-1">

        <v-list-tile v-if="!mini">
          <v-list-tile-content>
            <v-list-tile-title>Menu</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider light></v-divider>
        <template v-for="item in items">
          <v-list-group
            v-if="item.children"
            no-action
            :key="item.title"
          >
            <v-list-tile slot="activator">
              <v-list-tile-action>
                <v-icon medium>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
            
            <v-list-tile v-show="!mini" v-for="child in item.children" :key="child.title" :to="child.route" @click="currentTab=item.title">
              <v-list-tile-title>{{ child.title }}</v-list-tile-title>
              <v-list-tile-action>
                <v-icon small>{{ child.icon }}</v-icon>
              </v-list-tile-action> 
            </v-list-tile>
          </v-list-group>

          <v-list-tile
            v-else
            :key="item.title"
            :to="item.route"
            @click="currentTab=item.title"
          >
            <v-list-tile-action>
              <v-icon medium>{{ item.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
const LINKS = [
  { title: 'Home', 
    icon: 'home', 
    route: '/' 
  },
  { title: 'Single Color', 
    icon: 'color_lens',
    route: '/color' 
  },
  { title: 'Animations', 
    icon: 'cached',
    route: '/animation',
    children: [
      { title: 'Templates', icon: 'mdi-file-document-box-multiple', route: '/animation/templates'},
      { title: 'Saved', icon: 'bookmark', route: '/animation/saved'},
      { title: 'Favorites', icon: 'mdi-heart', route: '/animation/favorites'}
    ]
  },
  { title: 'Patterns', 
    icon: 'texture', 
    route: '/patterns'
  }
]

export default {
  name: 'App',
  components: {
      // AppSidebar
  },
  data () {
    return {
      drawer: null,
      items: LINKS,
      mini: false,
      right: null,
      currentTab: 'Home'
    }
  }
}
</script>
