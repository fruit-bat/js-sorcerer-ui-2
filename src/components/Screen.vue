<template>
  <equipment>
    <div
      class="exidy-screen-container"
      @keyup="keyupHandler"
      @keydown="keydownHandler"
      ref="screen"
      tabindex="0"
    />
    <toggle
      class="ma-0"
      slot="options"
      v-model="govern"
    />
    <v-btn
      slot="actions"
      icon
      flat
      @click="reset"
    >
      <v-icon>power_settings_new</v-icon>
    </v-btn>
  </equipment>
</template>

<script>

  import emulator from '../assets/emulator';
  import Equipment from './Equipment';
  import Toggle from './Toggle';

  export default {
    mounted() {
      const screenContainer = this.$refs.screen;
      screenContainer.appendChild(emulator.getCanvas());
    },
    data: () => ({
      govern: true
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
    watch: {
      govern() {
        emulator.govern(this.govern);
      }
    },
    components: {
      Equipment,
      Toggle
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
