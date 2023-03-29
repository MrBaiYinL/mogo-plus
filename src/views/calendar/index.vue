<!--
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-24 11:45:58
 * @Description:  
-->
<template>
    <mogo-calendar
        :events="events"
        :eventContent="eventContent"
        @date-click="dateClick"
    ></mogo-calendar>
</template>
<script lang='ts' setup>
import { DateClickArg } from '@fullcalendar/interaction'
import { EventItem } from "../../components/calendar/src/types";
import { ref } from "vue";
import { EventContentArg } from "@fullcalendar/core";

const events = ref<EventItem[]>([
  {
    title: "购物",
    start: "2023-03-24 10:00:00",
    end: "2023-03-24 12:00:00",
    editable: true,
  },
  {
    title: "学习",
    start: "2023-03-25 08:00:00",
    end: "2023-03-25 16:00:00",
  },
]);
const dateClick = (info: DateClickArg) => {
    const event = {
        start: `${info.dateStr} 12:00:00`,
        end: `${info.dateStr} 13:00:00`,
        title: "吃饭",
    };
    // 生成事件
    events.value.push(event);
    console.log(info);
};

const eventContent = (arg: EventContentArg) => {
    const el = document.createElement("div");
    const timeTextArr = arg.timeText.split(" - ");
    const start = timeTextArr[0]
        .replace("上午", "")
        .replace("下午", "")
        .replace("时", "");
    const end = timeTextArr[1]
        .replace("上午", "")
        .replace("下午", "")
        .replace("时", "");
    el.innerHTML = `
            <img src="src/assets/logo.png" style="width:20px;height:20px;">
            <div>开始时间: ${start}</div>
            <div>结束时间: ${end}</div>
            <div>标题: ${arg.event._def.title}</div>
            `;
    return {
        domNodes: [el],
    };
};
</script>

<style lang='scss' scoped>
</style>
     