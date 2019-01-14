<template>
  <equipment>
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
    <drop-zone
      @file-for-upload="fileForUpload"
      @url-for-upload="urlForUpload"
    >
      <div
        class="floppy-disk-drive"
        @click="diskClicked"
      >
        <div
          style="position:absolute;top:10px;background-color:#cca;padding:0px 5px 0px 5px;border-radius:3px"
        >
          {{driveLetter}}:
        </div>
        <img
          v-if="diskNotPresent"
          src="../assets/sa-400-open.svg"
          width="140px"
          height="90px"
          draggable="false"
        />
        <img
          v-if="!diskNotPresent"
          src="../assets/sa-400-closed.svg"
          width="140px"
          height="90px"
          draggable="false"
        />
        <div
          style="position:absolute;bottom:12px;"
        >
         <led-indicator
            :on="driveActive"
            color="green"
          />
          <led-indicator
            :on="driveWriting"
            color="red"
          />
        </div>
      </div>
    </drop-zone>

    <v-btn
      slot="actions"
      class="ma-0"
      icon
      flat
      @click="newDisk"
      :disabled="!diskNotPresent || driveActive"
    >
      <v-icon small>create</v-icon>
    </v-btn>
    <v-btn
      slot="actions"
      class="ma-0"
      icon
      flat
      @click="uploadDisk"
      :disabled="!diskNotPresent || driveActive"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-btn
      slot="actions"
      class="ma-0"
      icon
      flat
      @click="downloadDisk"
      :disabled="diskNotPresent || driveActive"
    >
      <v-icon>save_alt</v-icon>
    </v-btn>
    <v-btn
      slot="actions"
      class="ma-0"
      icon
      flat
      @click="eject"
      :disabled="diskNotPresent || driveActive"
    >
      <v-icon>eject</v-icon>
    </v-btn>

  </equipment>
</template>

<script>
  import Equipment from './Equipment';
  import emulator from '@/assets/emulator';
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
    beforeDestroy() {
      clearInterval(this.driveWritingTimer);
    },
    mounted() {
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
      uploadDisk() {
        if (this.diskNotPresent) {
          this.$el.querySelector('input').click();
        }
      },
      diskClicked() {
        if (this.diskNotPresent) {
          this.uploadDisk();
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
        if (array.length != 332640) {
          console.log('Wrong length for disk: ' + array.length);
        }

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
        // TODO Check file length
        const reader = new FileReader();
        reader.onloadend = evt => {
          if (evt.target.readyState == FileReader.DONE) {
            const blob = evt.target.result;
            const array = new Uint8Array(blob);
            this.attachDisk(array);
          }
        };
        reader.readAsArrayBuffer(file);
      },
      checkResponseStatus(response) {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} - ${response.statusText}`);
        }
        return response;
      },
      urlForUpload(url) {
        console.log('Load disk from URL ' + url);
        // TODO limit read length
        fetch(url)
          .then(response => {
            console.log(response);
            return this.checkResponseStatus(response) && response.arrayBuffer();
          })
          .then(buffer => {
            console.log(buffer);
            const array = new Uint8Array(buffer);
            this.attachDisk(array);
          })
          .catch(err => console.error(err)); // Never forget the final catch!

      }
    },
    components: {
      DropZone,
      LedIndicator,
      Equipment
    }
  }
</script>
<style>
.diskcard {
  border-radius: 10px;
}

.floppy-disk-drive {
   padding-left: 10px;
   padding-right: 10px;
   border-radius: 3px;
   background-color: #444;
   position:relative;
   user-select: none;
}

</style>
