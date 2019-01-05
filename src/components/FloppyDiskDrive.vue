<template>
  <v-card
    class="pa-2 diskcard"
  >
    <input
      ref='input' 
      type="file" 
      @change="onFileChange" 
      style="display: none"
    />
    <a
      ref='link'
      style="display: none"
    />
    <v-layout row
      color="grey darken-3"
      dark
    >
     <div>{{driveLetter}}:</div>
     <v-spacer></v-spacer>
     <led-indicator
        :on="driveActive"
        color="green"
      />
      <led-indicator
        :on="driveWriting"
        color="red"
      />
    </v-layout>     
    <drop-zone
      @file-for-upload="fileForUpload"
    >
      <floppy-disk
        :not-present="diskNotPresent"
        @click="diskClicked"
      />
    </drop-zone>
    
    <v-card-actions
      class="pa-0"
    >
      <v-spacer></v-spacer>
      <v-btn
        v-if="diskNotPresent"
        icon
        flat
        @click="newDisk"
        :disabled="!diskNotPresent || driveActive"
      >
        <v-icon>add</v-icon>
      </v-btn> 
      <v-btn
        v-if="!diskNotPresent"
        icon
        flat
        @click="eject"
        :disabled="diskNotPresent || driveActive"
      >
        <v-icon>eject</v-icon>
      </v-btn>
    </v-card-actions>    
  </v-card>
</template>

<script>
  // TODO work out how to use project relative paths
  import emulator from '../assets/emulator';
  import FloppyDisk from './FloppyDisk';
  import DropZone from './DropZone';
  import { ExidyArrayDisk } from 'js-sorcerer';
  import LedIndicator from './LedIndicator';
  import { SECTORS_PER_TRACK, NUMBER_OF_TRACKS, BYTES_PER_SECTOR } from 'js-sorcerer';

  export default {
    props: {
      unit: {
        default: 0,
        type: Number
      }
    },
    computed: {
      driveLetter() {
        return "ABCD".charAt(this.unit);
      },
      diskNotPresent() {
        return this.floppyDisk === null;
      },
      driveWriting() {
        return this.driveWritingTick > 0;
      }
    },
    mounted() {
      // TODO this needs disposing
      this.driveWritingTimer = setInterval(
        () => {
          if (this.driveWritingTick > 0) --this.driveWritingTick;
        },
        1000
      );
    },
    data: () => ({
      floppyDisk: null,
      diskArray: null,
      driveActive: false,
      driveWritingTimer: null,
      driveWritingTick: 0,
      diskRequiresSave: false
    }),
    methods: {
      onFileChange(e) {
        if (this.diskNotPresent) {
          this.handleFiles(e.target.files);
        }
      },
      handleFiles(files) {
        for (let i = 0; i < files.length; i++) {
          this.fileForUpload(files[i]);
        }
      },
      downloadDisk() {
        const blob = new Blob([this.diskArray], {type: "application/binary"});
        const link = this.$refs.link;
        link.href = window.URL.createObjectURL(blob);
        link.download="a.dsk";
        link.click();        
      },      
      diskClicked() {
        if (this.diskNotPresent) {
          this.$el.querySelector('input').click();
        }
        else {
          this.downloadDisk();
        }
      },
      newDisk() {
        const array = new Uint8Array(SECTORS_PER_TRACK * NUMBER_OF_TRACKS * BYTES_PER_SECTOR);
        this.attachDisk(array);
      },
      eject() {
        emulator.getDiskSystem().then(ds => {
          ds.insertDisk(null, this.unit);
          this.floppyDisk = null;
          this.diskRequiresSave = false;
          this.diskArray = null;
        });
      },
      attachDisk(array) {
        const floppyDisk = new ExidyArrayDisk(array);        
        const driveLetter = this.driveLetter;
        const unit = this.unit;
        const that = this;
        const wrappedFloppyDisk = {
          read(track, sector, offset) {
          return floppyDisk.read(track, sector, offset);
          },
          write(track, sector, offset, data) {
            floppyDisk.write(track, sector, offset, data);
            that.driveWritingTick = 5;
            that.diskRequiresSave = true;
          },
          activate() {
            that.driveActive = true;
          },
          deactivate() {
            that.driveActive = false;
          }              
        };
        emulator.getDiskSystem().then(ds => {
          ds.insertDisk(wrappedFloppyDisk, this.unit);
          this.floppyDisk = wrappedFloppyDisk;
          this.diskRequiresSave = false;
          this.diskArray = array;
        });      
      },
      fileForUpload(file) {
        const reader = new FileReader();
        reader.onloadend = evt => {
          if (evt.target.readyState == FileReader.DONE) {
            const blob = evt.target.result;
            const array = new Uint8Array(blob);
            this.attachDisk(array);
          }
        };
        reader.readAsArrayBuffer(file);
      }
    },
    components: {
      FloppyDisk,
      DropZone,
      LedIndicator
    }
  }
</script>
<style>
.diskcard {
    flex:unset;
    border-radius: 10px;
}
</style>
