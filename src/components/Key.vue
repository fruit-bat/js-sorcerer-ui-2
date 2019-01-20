
<template>
  <div
    class="exidy-key"
    icon
    @mousedown="pressed=true"
    @mouseup="pressed=false"
    :style="{ backgroundColor: active ? 'green' : '#cdc294'}"

  >
    <div
      style="color:white;"
    >
      <div
        style="height:17px;width:36px;"
      >
        <slot name="top">{{top}}</slot>
      </div>
      <div
        style="height:18px;width:36px;"
      >
        <slot name="bottom" >{{bottom}}</slot>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    props: {
      keyId: {
        type: String,
        default: null
      },
      top: {
        type: String,
        default: null
      },
      bottom: {
        type: String,
        default: null
      },
      keystate: {
        type: Object,
        default: () => { return {}; }
      }
    },
    computed: {
      active() {
        return this.pressed || this.keystate[this.keyId];
      }
    },
    mounted() {
    },
    data: () => ({
      pressed: false
    }),
    watch: {
      pressed() {
        this.$emit('pressed', { keyId: this.keyId, pressed: this.pressed });
      }
    },
    methods:{

    },
    components: {
    }
  }
</script>
<style>
.exidy-key {
  color: white;
  font-weight:500;
  background-color:#cdc294;
  border-style: solid;
  border-radius: 10px;
  text-align:center;
  height:fit-content;
  margin:1px;
  padding:0px;
  border-width:0px;
  user-select: none;
}
</style>
