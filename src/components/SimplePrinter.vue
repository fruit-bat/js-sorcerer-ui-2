<template>
  <div>
    <v-card
      class="pa-2"
      style="border-radius:10px;"
    >
      <div
        class="pa-2 printer-paper"
        ref="paper"
      />
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
      emulator.attachPrinter(new ExidyElementPrinter(this.$refs.paper));
    },
    data: () => ({
    }),
    methods:{

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
