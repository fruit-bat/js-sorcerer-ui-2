<template>
  <div style="width:fit-content">
    <v-card
      class="pa-1 equipment"
    >
      <slot />
      <v-card-actions
        class="pa-0 pr-1"
      >
        <slot name="options" />
        <v-spacer></v-spacer>
        <slot name="actions" />
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>

  export default {
  }

</script>
<style>

.equipment {
  border-radius: 10px;
  width:fit-content;
  background-color: #eee !important;
}

</style>
