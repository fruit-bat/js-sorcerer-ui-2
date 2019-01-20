
<template>
  <equipment>
    <v-layout row>
      <Key key-id="1" top="!" bottom="1" @pressed="keypress" :keystate="keystate"/>
      <Key key-id="2" top='"' bottom="2" @pressed="keypress" :keystate="keystate"/>
    </v-layout>
  </equipment>
</template>

<script>
  import emulator from '@/assets/emulator';
  import Equipment from './Equipment';
  import Key from './Key';

  export default {
    computed: {

    },
    mounted() {
      emulator.getKeyboard().listener = (keyId, pressed) => {
        this.$set(this.keystate, keyId, pressed);
      };
    },
    data: () => ({
      keystate: {}
    }),
    methods:{
      keypress({ keyId, pressed }) {
        if (pressed) {
          emulator.getKeyboard().pressKey(keyId);
        }
        else {
          emulator.getKeyboard().releaseKey(keyId);
        }
      }
    },
    components: {
      Equipment,
      Key
    }
  }
</script>
<style>

</style>
