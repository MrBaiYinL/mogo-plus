<template>
    <div>
      <el-divider>正常趋势</el-divider>
      <div class="flex">
        <div>
          <mogo-trend text="营业额"></mogo-trend>
        </div>
        <div>
          <mogo-trend text="销售额" type="down"></mogo-trend>
        </div>
      </div>
          <br />
      <el-divider>颜色翻转</el-divider>
      <div class="flex">
      <div><mogo-trend text="销售额" reverseColor></mogo-trend></div>
      <div><mogo-trend text="营业额" type="down" reverseColor></mogo-trend></div>
      </div>
      <br />
      <el-divider>自定义图标颜色</el-divider>
      <div class="flex">
        <div>
          <mogo-trend text="营业额" upIconColor="blue"></mogo-trend>
        </div>
        <div>
          <mogo-trend text="销售额" type="down" downIconColor="#123456"></mogo-trend>
        </div>
      </div>
  
      <br />
      <el-divider>自定义文字颜色</el-divider>
      <div class="flex">
      <div><mogo-trend text="营业额" upTextColor="blue"></mogo-trend></div>
      <div><mogo-trend text="销售额" type="down" downTextColor="yellow"></mogo-trend></div>
      </div>
      <br />
      <el-divider>自定义图标</el-divider>
      <div class="flex">
      <div><mogo-trend upIcon="CaretTop">营业额</mogo-trend></div>
      <div><mogo-trend type="down" downIcon="CaretBottom">销售额</mogo-trend></div>
    </div>
     </div>
  </template>
  
  <script lang='ts' setup>
  </script>
  
  <style lang='scss' scoped>
  .flex {
    display: flex;
    div {
      margin-right: 10px;
    }
  }
  </style>