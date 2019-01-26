<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-layout row>

        <div>
          <screen
            style="margin-left:auto;margin-right:auto"
            class="pa-1"
          />
          <keyboard
            v-if="virtualKeyboard"
            style="margin-left:auto;margin-right:auto"
            class="pa-1"
          />
        </div>

        <v-layout column>
          <v-layout row>
            <div>
              <v-layout row>
                <floppy-disk-drive
                  :unit="0"
                  class="pa-1"
                />
                <floppy-disk-drive
                  :unit="1"
                  class="pa-1"
                />
              </v-layout>
              <v-layout row>
                <floppy-disk-drive
                  :unit="2"
                  class="pa-1"
                />
                <floppy-disk-drive
                  :unit="3"
                  class="pa-1"
                />
              </v-layout>
              <v-layout row>
                <tape-drive
                  :unit="0"
                  class="pa-1"
                />
                <tape-drive
                  :unit="1"
                  class="pa-1"
                />
              </v-layout>
            </div>
            <floppy-disk-box
              class="pa-1"
            />
          </v-layout>
        </v-layout>

      </v-layout>



      <tape-box
        class="pa-1"
      />

      <rom-slot
        class="pa-1"
      />

      <a
        href="rom-packs/Exidy Standard Basic Ver 1.0 (1978).ROM"
        style="width:fit-content;height:fit-content;"
      >
        <rom
          label="Exidy Standard Basic Ver 1.0 (1978)"
        />
      </a>


      <simple-printer
        v-if="centronicsPrinter"
        class="pa-1"
      />
      <mem-viewer
        v-if="memoryViewer"
      />
    </v-layout>
  </v-container>
</template>

<script>
  import emulator from '@/assets/emulator';
  import SimplePrinter from './SimplePrinter';


  import FloppyDiskDrive from './FloppyDiskDrive';

  import FloppyDisk from './FloppyDisk';
  import FloppyDiskBox from './FloppyDiskBox';
  import Rom from './Rom';
  import RomSlot from './RomSlot';
  import Screen from './Screen';
  import TapeBox from './TapeBox';
  import TapeDrive from './TapeDrive';
  import MemViewer from './MemViewer';
  import Keyboard from './Keyboard';

  export default {
    props: {
      centronicsPrinter: {
        default: false,
        type: Boolean
      },
      memoryViewer: {
        default: false,
        type: Boolean
      },
      virtualKeyboard: {
        default: false,
        type: Boolean
      }
    },
    mounted() {
      emulator.run();
    },
    data: () => ({
    }),
    methods:{
    },
    components: {
      FloppyDiskDrive,
      FloppyDisk,
      SimplePrinter,
      Rom,
      RomSlot,
      Screen,
      FloppyDiskBox,
      TapeBox,
      TapeDrive,
      MemViewer,
      Keyboard
    }
  }
</script>
<style>
</style>
