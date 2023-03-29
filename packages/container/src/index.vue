<!--
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-15 13:43:12
 * @Description:  骨架 
-->
<template>
  <el-container>
    <el-aside width="auto">
      <nav-side :collapse="isCollapse"></nav-side>
    </el-aside>
    <el-container>
      <el-header>
        <nav-header
          v-model:collapse="isCollapse"
          @updateCollapse="updateCollapse"
        ></nav-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import NavHeader from "./navHeader/index.vue";
import NavSide from "./navSide/index.vue";

const isCollapse = ref(false);
const updateCollapse = (val: boolean) => {
  isCollapse.value = val;
};
</script> 
  
<style lang="scss" scoped>
.el-header {
  padding: 0;
  border-bottom: 1px solid #eee;
}
</style>
   