<template>
  <div>
  <v-layout row wrap>
      <a
        href="disks/bootable.dsk"
        style="width:fit-content;height:fit-content"
      >
        <floppy-disk
          class="pa-1"
          label="CP/M boot"
        />
      </a>
      <a
        href="disks/disk1.dsk"
        style="width:fit-content;height:fit-content"
      >
        <floppy-disk
          class="pa-1"
          label="disk1"
        />
      </a>

  </v-layout>
  </div>
</template>

<script>
  import FloppyDisk from './FloppyDisk';

  export default {
    props: {
    },
    components: {
      FloppyDisk
    }
  }
</script>

<style>
</style>
