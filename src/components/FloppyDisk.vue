<template>
  <div
    :style="{ opacity, cursor: 'pointer', position: 'relative' }"
  >
    <div
      class="disk-label"
    >{{label}}</div>
    <img
      src="../assets/floppy-disk.svg"
      width="70px"
      height="70px"
      @click="clicked"
    />
  </div>
</template>

<script>

  export default {
    props: {
      notPresent: {
        default: true,
        type: Boolean
      },
      label: {
        default: '',
        type: String
      }
    },
    computed: {
      opacity: function() {
        return this.notPresent ? 0.15 : 1.0;
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
.disk-label {
    position: absolute;
    top: 3px;
    font-size: 10px;
    left: 6px;
}
</style>
