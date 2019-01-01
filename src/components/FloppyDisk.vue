<template>
  <v-layout>
    <img 
      src="../assets/floppy-disk.svg"
      width="70px"
      height="70px"
      :style="{ opacity, cursor: 'pointer' }"
      @click="clicked"
    />
  </v-layout>
</template>

<script>

  export default {
    props: {
      notPresent: {
        default: true,
        type: Boolean
      }
    },
    computed: {
      opacity: function() {
        return this.notPresent ? 0.20 : 1.0; 
      }
    },
    mounted() {
 
    },
    data: () => ({
    }),
    methods:{
      clicked(evt) {
        this.$emit('click', evt);
      }
    }
  }
</script>
<style>

</style>
