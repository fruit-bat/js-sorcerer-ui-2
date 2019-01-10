
<template>
  <div>
    <v-card
      class="pa-1 tapecard"
      style="width:fit-content"
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
      <drop-zone
        @file-for-upload="fileForUpload"
        @url-for-upload="urlForUpload"
      >
        <div
          class="tape-drive"
          @click="tapeClicked"
        >
          <div
            style="background:#222;border-style:solid;border-radius:7px;border-width:4px;"
          >
            <div
            >
            <tape
              :style="{ opacity: tapeNotPresent ? 0 : 1}"
            />
            </div>
          </div>
          <v-layout row>
           <led-indicator
              :on="playing"
              color="green"
            />
            <led-indicator
              :on="recording"
              color="red"
            />
            <v-spacer />
            <div
              class="tape-drive-label"
            >
              tape {{unit}}
            </div>
          </v-layout>
        </div>
      </drop-zone>

      <v-card-actions
        class="pa-0 pr-1"
      >
        <v-spacer></v-spacer>
        <v-btn
          class="ma-0"
          icon
          flat
          @click="newTape"
          :disabled="!tapeNotPresent || playing"
        >
          <v-icon small>create</v-icon>
        </v-btn>
        <v-btn
          class="ma-0"
          icon
          flat
          @click="uploadTape"
          :disabled="!tapeNotPresent || playing"
        >
          <v-icon>add</v-icon>
        </v-btn>
        <v-btn
          class="ma-0"
          icon
          flat
          @click="downloadTape"
          :disabled="tapeNotPresent || playing"
        >
          <v-icon>save_alt</v-icon>
        </v-btn>
        <v-btn
          class="ma-0"
          icon
          flat
          @click="eject"
          :disabled="tapeNotPresent || playing"
        >
          <v-icon>eject</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  import emulator from '../assets/emulator';
  import Tape from './Tape';
  import DropZone from './DropZone';
  import LedIndicator from './LedIndicator';
  import { ExidyArrayTape } from 'js-sorcerer';

  export default {
    props: {
      unit: {
        default: 0,
        type: Number
      }
    },
    computed: {
      tapeNotPresent() {
        return this.tape === null;
      },
      recording() {
        return false;
      }
    },
    beforeDestroy() {
    },
    mounted() {
    },
    data: () => ({
      tape: null,
      tapeArray: null,
      playing: false,
      tapeRequiresSave: false
    }),
    methods: {
      onFileChange(e) {
        if (this.tapeNotPresent) {
          this.handleFiles(e.target.files);
        }
      },
      handleFiles(files) {
        for (let i = 0; i < files.length; i++) {
          this.fileForUpload(files[i]);
        }
      },
      downloadTape() {
        const blob = new Blob([this.tapeArray], {type: "application/binary"});
        const link = this.$refs.link;
        link.href = window.URL.createObjectURL(blob);
        link.download="a.tape";
        link.click();
      },
      uploadTape() {
        if (this.tapeNotPresent) {
          this.$el.querySelector('input').click();
        }
      },
      tapeClicked() {
        if (this.tapeNotPresent) {
          this.uploadTape();
        }
      },
      newTape() {
        const array = new Uint8Array();
        this.attachTape(array);
      },
      eject() {
        emulator.getTapeSystem().then(ts => {
          ts.getUnit(this.unit).tape = null;
          this.tape = null;
          this.tapeRequiresSave = false;
          this.tapeArray = null;
        });
      },
      attachTape(array) {

        const tape = new ExidyArrayTape(array);
        const unit = this.unit;

        emulator.getTapeSystem().then(ts => {
          ts.getUnit(this.unit).tape = tape;
          this.tape = tape;
          this.tapeRequiresSave = false;
          this.tapeArray = array;
        });
      },
      fileForUpload(file) {
        // TODO Check file length
        const reader = new FileReader();
        reader.onloadend = evt => {
          if (evt.target.readyState == FileReader.DONE) {
            const blob = evt.target.result;
            const array = new Uint8Array(blob);
            this.attachTape(array);
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
        console.log('Load tape from URL ' + url);

        fetch(url)
          .then(response => {
            console.log(response);
            return this.checkResponseStatus(response) && response.arrayBuffer();
          })
          .then(buffer => {
            console.log(buffer);
            const array = new Uint8Array(buffer);
            this.attachTape(array);
          })
          .catch(err => console.error(err)); // Never forget the final catch!

      }
    },
    components: {
      DropZone,
      LedIndicator,
      Tape
    }
  }
</script>
<style>
.tapecard {
  border-radius: 10px;
}
.tape-drive-label {
    width: fit-content;
    margin-top: 6px;
    margin-bottom: 6px;
    background-color: #cca;
    padding: 0px 5px 0px 5px;
    border-radius: 3px;
    line-height: 18px;
}

.tape-drive {
   padding: 5px 11px 0px 10px;
   border-radius: 3px;
   background-color: #444;
   position:relative;
   user-select: none;
}

</style>
