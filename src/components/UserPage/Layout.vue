<template>
  <v-app>
    <v-container fluid class="background">
      <v-app-bar app flat height="70">
        <v-spacer></v-spacer>
        <v-menu
            open-on-hover
            top
            offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                dark
                v-bind="attrs"
                v-on="on"
            >
              {{ username }}
            </v-btn>
          </template>

          <v-list>
            <v-list-item
                v-for="(item, index) in menuItems"
                :key="index"
                :href="item.url"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
      <v-navigation-drawer
          app
          permanent
          color="#D0D3D4"
      >
        <v-list-item>
          <v-icon x-large>mdi-map</v-icon>
          Journey List
        </v-list-item>
        <v-list>
          <v-list-item
              v-for="([icon, text, uri], i) in items"
              :key="i"
              @click="changeRoute(uri)"
          >
            <v-list-item-icon>
              <v-icon>{{ icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <router-view></router-view>
      </v-main>
    </v-container>
  </v-app>
</template>

<script>

export default {
  name: "Layout",
  data() {
    return {
      username: "",
      items: [
        ['mdi-home', 'Home', this.$route.path],
        ['mdi-grease-pencil', 'Write', this.$route.path + '/write'],
      ],
      menuItems: [
        {title: "Account", url: this.$route.path + "/account"},
        {title: "Logout", url: this.$route.path + "/logout"}
      ]
    }
  },
  created() {
    this.username = this.$route.path.replace("/user/", "");
    this.username = this.username.replace("%20", " ");
  },
  methods: {
    changeRoute(uri){
      this.$store.dispatch("auth", {userName: this.username})
      this.$router.push(uri);
    }
  },
}
</script>

<style scoped>
.background {
  background-color: aliceblue;
}
</style>