<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <div
          class="exidy-screen-container"
          @keyup="keyupHandler"
          @keydown="keydownHandler"
          ref="screen"
          tabindex="0"
        />
      </v-flex>
      <floppy-disk-drive
        :unit="0"
      />
      <floppy-disk-drive
        :unit="1"
      />
      <v-btn
        icon
        flat
        @click="reset"
      >
        <v-icon>power_settings_new</v-icon>
      </v-btn>
    </v-layout>
  </v-container>
</template>

<script>
  // TODO work out how to use project relative paths
  import emulator from '../assets/emulator';
  import FloppyDiskDrive from './FloppyDiskDrive';
  
  export default {
    mounted() {
      const screenContainer = this.$refs.screen;
      screenContainer.appendChild(emulator.getCanvas());
      emulator.run();      
    },
    data: () => ({
    }),
    methods:{
      keydownHandler(key) {
        emulator.getKeyboard().browserKeyDown(key.keyCode);
        key.stopPropagation();
        key.preventDefault();
      },
      keyupHandler(key) {
        emulator.getKeyboard().browserKeyUp(key.keyCode);
        key.stopPropagation();
        key.preventDefault();
      },
      reset() {
        emulator.reset();
      }
    },
    components: {
      FloppyDiskDrive
    }
  }
</script>
<style>
  .exidy-screen-container {
    background-color: #000;
    border:5px solid #000;
    border-radius: 5px;
    width: 512px;
    height: 480px;
    box-sizing: content-box;
  }
  .exidy-screen-container canvas {
    image-rendering: optimizeSpeed;
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: optimize-contrast;
    image-rendering: pixelated;
    -ms-interpolation-mode: nearest-neighbor;
    width: 512px; height: 480px;
  }
</style>
