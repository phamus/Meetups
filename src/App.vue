<template>
  <v-app>
    <v-navigation-drawer absolute v-model="sideNav">
      <v-list>
        <v-list-item v-for="item in menuItems" :key="item.title">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dense dark class="primary" max-height="48px">
      <v-app-bar-nav-icon
        @click.native.stop="sideNav = !sideNav"
        class="hidden-sm-and-up"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn text v-for="item in menuItems" :key="item.title">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    sideNav: false,
    menuItems: [
      { icon: "supervisor_account", title: "View Meetups" },
      { icon: "room", title: "Organise Meetups" },
      { icon: "person", title: "Profile" },
      { icon: "face", title: "Signup" },
      { icon: "lock_open", title: "Sign in" },
    ],
  }),
};
</script>
