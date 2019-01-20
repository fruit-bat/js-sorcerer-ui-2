<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline">
        <span>Exidy</span>
        <span
          class="pl-2 font-weight-light""
        >Sorcerer Computer</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>

    <v-content
      style="background-color: darkslategrey;"
    >
      <HelloWorld/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      //
    }
  }
}
</script>
