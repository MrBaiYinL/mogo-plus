
<!--
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-04-07 17:28:25
 * @Description:  
-->
<template>
  <mogo-table
    :data="tableData"
    :options="options"
    elementLoadingText="加载中..."
    :element-loading-svg="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    @confirm="confirm"
    @cancel="cancel"
    editIcon="edit"
    isEditRow
    v-model:editRowIndex="editRowIndex"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :total="total"
  >
    <template #date="{ scope }">
      <el-icon-timer></el-icon-timer>
      <span style="margin-left: 10px">{{ scope.row.date }}</span>
    </template>
    <template #name="{ scope }">
      <el-popover effect="light" trigger="hover" placement="top">
        <template #default>
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
        </template>
        <template #reference>
          <div class="name-wrapper">
            <el-tag size="small">{{ scope.row.name }}</el-tag>
          </div>
        </template>
      </el-popover>
    </template>
    <template #action="scope">
      <el-button type="primary" @click="edit(scope)" size="small"
        >编辑</el-button
      >
      <el-button type="danger" size="small">删除</el-button>
    </template>
    <template #editRow="scope">
      <el-button type="primary" @click="edit(scope)" size="small"
        >确认</el-button
      >
      <el-button type="danger" size="small">取消</el-button>
    </template>
  </mogo-table>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import Mock from "mockjs"; // 引入mockjs
import { TableOptions } from "../../components/table/src/types";

const Random = Mock.Random; // Mock.Random 是一个工具类，用于生成各种随机数据

//
interface TableData {
  date: string;
  name: string;
  address: string;
}
const options: TableOptions[] = [
  {
    prop: "date",
    label: "日期",
    // width: '180',
    align: "center",
    slot: "date",
    editable: true,
  },
  {
    prop: "name",
    label: "姓名",
    // width: '180',
    align: "center",
    slot: "name",
  },
  {
    prop: "address",
    label: "地址",
    align: "center",
    editable: true,
  },
  {
    label: "操作",
    action: true,
    align: "center",
  },
];
const tableData = ref<TableData[]>([]);
const editRowIndex = ref<string>("edit");
const current = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);

const svg = `
    <path class="path" d="
        M 30 15
        L 28 17
        M 25.61 25.61
        A 15 15, 0, 0, 1, 15 30
        A 15 15, 0, 1, 1, 27.99 7.5
        L 15 15
    " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
    `;

onMounted(() => {
  getData();
});
const getData = () => {
  // axios
  //   .post("/api/list", {
  //     current: current.value,
  //     pageSize: pageSize.value,
  //   })
  //   .then((res: any) => {
  //     if (res.data.code === "200") {
  //       tableData.value = res.data.data.rows;
  //       total.value = res.data.data.total;

  //       console.log(res.data.data);
  //     }
  //   });
  interface DataList {
    date: string;
    name: string;
    address: string;
  }

  const dataList: DataList[] = []; // 用于接受生成数据的数组
  for (let i = 0; i < 100; i++) {
    // 可自定义生成的个数
    const template = {
      date: Random.date(), // 生成一个随机日期,可加参数定义日期格式
      name: Random.name(), // 生成姓名
      address: Random.province(), // 生成地址
    };
    dataList.push(template);
  }
  //
  let index = 1,
    size = 10;
  let newDataList = dataList.slice(index * size, (index + 1) * size);
  tableData.value = newDataList;
  total.value = dataList.length;
};
const edit = (scope: any) => {
  //
  editRowIndex.value = "edit";
};
const confirm = (scope: any) => {
  //
};
const cancel = (scope: any) => {
  //
};
let handleSizeChange = (val: number) => {
  pageSize.value = val;
  getData();
};
let handleCurrentChange = (val: number) => {
  current.value = val;
  getData();
};
</script>
    
<style lang="scss" scoped>
svg {
  width: 1em;
  height: 1em;
}
</style>
     