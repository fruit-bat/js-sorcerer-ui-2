<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-side-icon
        @click="drawer=!drawer"
      />
      <v-toolbar-title class="headline">
        <span>Exidy</span>
        <span
          class="pl-2 font-weight-light""
        >Sorcerer Computer</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content
      style="background-color: darkslategrey;"
    >
      <HelloWorld
        :centronicsPrinter="centronicsPrinter"
        :memoryViewer="memoryViewer"
        :virtual-keyboard="virtualKeyboard"
      />
    </v-content>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list class="pa-1">
        <v-list-tile>
          <v-icon>settings</v-icon>
          <v-list-tile-content>
            <v-list-tile-title class="pl-2">Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-switch v-model="centronicsPrinter" label="Centronics printer" />
        </v-list-tile>
        <v-list-tile>
          <v-switch v-model="memoryViewer" label="Memory viewer" />
        </v-list-tile>
        <v-list-tile>
          <v-switch v-model="virtualKeyboard" label="Virtual keyboard" />
        </v-list-tile>

        <v-divider />

      </v-list>
    </v-navigation-drawer>
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
      drawer: false,
      centronicsPrinter: false,
      memoryViewer: false,
      virtualKeyboard: true
    }
  }
}
</script>
