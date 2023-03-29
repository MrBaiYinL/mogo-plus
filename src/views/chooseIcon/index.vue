<!--
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-15 16:57:41
 * @Description:  
-->
<template>
  <div>
    <mogo-choose-icon
      title="选择图标"
      v-model:visible="visible"
      @handleDialog="handleDialog"
    >
      选择图标
    </mogo-choose-icon>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const visible = ref<boolean>(false);
//
const handleDialog = (val: boolean) => {
  visible.value = val;
};
</script>
    
<style lang="scss" scoped>
</style>
