<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12 class="pa-1">
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
      </v-flex>
      <v-layout row >
      <floppy-disk-drive
        :unit="0"
        class="pa-1"
      />
      <floppy-disk-drive
        :unit="1"
        class="pa-1"
      />
      <floppy-disk-drive
        :unit="2"
        class="pa-1"
      />
      <floppy-disk-drive
        :unit="3"
        class="pa-1"
      />
      </v-layout>


      <a href="disks/bootable.dsk">
        <floppy-disk
          label="CP/M boot"
        />
      </a>
      <a href="disks/disk1.dsk">
        <floppy-disk
          label="disk1"
        />
      </a>

      <v-btn
        icon
        flat
        @click="reset"
      >
        <v-icon>power_settings_new</v-icon>
      </v-btn>

      <simple-printer
        class="pa-1"
      />
    </v-layout>
  </v-container>
</template>

<script>
  // TODO work out how to use project relative paths
  import emulator from '../assets/emulator';
  import SimplePrinter from './SimplePrinter';


  import FloppyDiskDrive from './FloppyDiskDrive';

  import FloppyDisk from './FloppyDisk';

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
      FloppyDiskDrive,
      FloppyDisk,
      SimplePrinter
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
