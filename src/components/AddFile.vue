<template>
  <div class="addfile">
    <input type="file" @change="onFileChange"/>

    <v-tooltip
      left
    >
      <span slot="activator">
        <v-btn
          icon
          @click="onClick"
          :disabled="disabled"
        >
          <v-icon color="secondary">fa-plus</v-icon>
        </v-btn>
      </span>
      <span>{{label}}</span>
    </v-tooltip>
  </div>
</template>

<script>
import { VTooltip } from 'vuetify';

export default {
  props :  {
    disabled: {
      default: false,
      type: Boolean
    },
    label: {
      default: 'Add document',
      type: String
    }
  },
  methods: {

    onFileChange(e) {
      if (this.isEnabled()) {
        this.handleFiles(e.target.files);
      }
    },

    isEnabled() {
      return !this.disabled;
    },

    onClick(e) {
      if (this.isEnabled()) {
        this.$el.querySelector('input').click();
      }
    },

    handleFiles(files) {
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        this.$emit('file-for-upload', file);
      }
    },
  },
  components: {
    VTooltip
  }
};

</script>

<style scoped>

.addfile input {
  display: none;
}

</style>
