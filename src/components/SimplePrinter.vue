<template>
  <div>
    <v-card
      style="border-radius:10px;"
    >
      <div class="pa-2">
        <div
          class="pa-1 printer-paper"
          ref="paper"
        />
      </div>

      <v-card-actions
        class="pa-0 pr-1 pl-2"
      >
        <v-btn
          class="ma-0"
          icon
          flat
          @click="autoScroll = !autoScroll"
        >
          <v-icon
            :style="{ opacity : autoScroll ? 1.0 : .25 }"
          >
            {{autoScroll ? 'toggle_on' : 'toggle_off'}}
          </v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          class="ma-0"
          icon
          flat
          @click=""
        >
          <v-icon>save_alt</v-icon>
        </v-btn>
        <v-btn
          class="ma-0"
          icon
          flat
          @click="clear"
        >
          <v-icon>eject</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
  import emulator from '../assets/emulator';
  import { ExidyElementPrinter } from 'js-sorcerer';

  export default {
    props: {
    },
    computed: {

    },
    mounted() {
      this._printer = new ExidyElementPrinter(this.$refs.paper);
      emulator.attachPrinter(this._printer);
    },
    data: () => ({
      printer: null,
      autoScroll: true
    }),
    watch: {
      autoScroll() {
        console.log(this.autoScroll);
        this._printer.setAutoScroll(this.autoScroll);
      }
    },
    methods:{
      clear() {
        this._printer.clear();
      }
    }
  }
</script>
<style>

.printer-paper {
  overflow-y: scroll;
  height: 200px;
  width: 850px;
  font-family: monospace;
  font-size:10px;
  text-align: left;
}
.printer-paper .row {
  height: 11px;
  background-color: #fffffb;
}
.printer-paper .hole {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: #eee;
  border-radius: 3px;
  margin-bottom: 2px;
  margin-left: 2px;
}
.printer-paper pre {
  display: inline-block;
  line-height: 11px;
  height: 11px;
  width: 800px;
  overflow: hidden;
  padding-left: 5px;
  padding-right: 5px;
  vertical-align: bottom;
}
.printer-paper .odd {
  background-color: #f0fff0;
}
</style>
