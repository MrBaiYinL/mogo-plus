<!--
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-15 11:31:34
 * @Description:  头部
-->
<template>
  <div class="header">
    <span @click="toggle">
      <el-icon-expand v-if="collapse"></el-icon-expand>
      <el-icon-fold v-else></el-icon-fold>
    </span>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{ collapse: boolean }>();
const emits = defineEmits(["updateCollapse"]);
const toggle = () => {
  console.log("toggle", !props.collapse);
  // 修改父组建的数据
  emits("updateCollapse", !props.collapse);
};
</script>
    
<style lang="scss" scoped>
.header {
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
}
</style>
    