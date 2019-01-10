<template>
  <div>
    <v-card
      class="pa-2"
      style="flex:unset;border-radius:10px;width:fit-content;"
    >
    <div
      class="exidy-screen-container"
      @keyup="keyupHandler"
      @keydown="keydownHandler"
      ref="screen"
      tabindex="0"
    />
    </v-card>
  </div>
</template>

<script>

  import emulator from '../assets/emulator';

  export default {
    mounted() {
      const screenContainer = this.$refs.screen;
      screenContainer.appendChild(emulator.getCanvas());
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
      }
    },
    components: {
    }
  }
</script>
<style>
  .exidy-screen-container {
    background-color: #000;
    border:5px solid #000;
    border-radius: 5px !important;
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
