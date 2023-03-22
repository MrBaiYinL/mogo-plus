<!--
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-20 10:14:08
 * @Description:  
-->
<template>
    <el-popover v-model:visible="visible" placement="bottom-start" :width="430" trigger="click">
        <template #reference>
            <div class="result">
            <div>{{ result }}</div>
            <div >
                <el-icon-arrowdown :class="{'rotate': visible}"></el-icon-arrowdown>
            </div>
            </div>
        </template>
        <div class="container">
            <el-row>
                <el-col :span="8">
                    <el-radio-group v-model="radioValue" size="small">
                        <el-radio-button label="按城市"></el-radio-button>
                        <el-radio-button label="按省份"></el-radio-button>
                    </el-radio-group>
                </el-col>
                <el-col :offset="1" :span="14">
                    <el-select v-model="selectValue" size="small" style="margin-top: 2px;" @change="changeSelect" placeholder="请搜索城市" filterable :filter-method="filterMethod">
                        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <template v-if="radioValue === '按城市'">
                <div class="city">
                    <!-- 字母区域 -->
                    <!-- 两种一样 <div v-for="(value, key) in cities" :key="key">{{ key }}</div> -->
                    <div class="city-item" @click="clickChat(item)"  v-for="(item, index) in Object.keys(cities)" :key="index">{{ item }}</div>
                </div>
                <el-scrollbar max-height="300px">
                    <template v-for="(value, key) in cities" :key="key">
                        <el-row style="margin-bottom: 10px" :id="key">
                            <el-col :span="2">{{ key }}:</el-col>
                            <el-col :span="22" class="city-name">
                                <div @click="clickItem(item)" class="city-name-item" v-for="(item, index) in value" :key="item.id">
                                    <div>{{ item.name }}</div>
                                </div>
                            </el-col>
                        </el-row>
                    </template>
                </el-scrollbar>
            </template>
            <template v-else>
                <div class="province">
                    <div class="province-item" @click="clickChat(item)" v-for="(item, index) in Object.keys(provinces)" :key="index">
                        {{ item }}
                    </div>
                </div>
                <el-scrollbar max-height="300px">
                    <template v-for="(item, index) in Object.values(provinces)" :key="index">
                        <template v-for="(item1, index1) in item" :key="index1">
                            <el-row style="margin-bottom: 10px" :id="item1.id">
                                <el-col :span="4">{{ item1.name }}:</el-col>
                                <el-col :span="20" class="province-name" >
                                    <div class="province-name-item" v-for="(item2, index2) in item1.data" :key="index2">
                                        <div @click="clickProvince(item2)">{{ item2 }}</div>
                                    </div>
                                </el-col>
                            </el-row>
                        </template>
                    </template>
                </el-scrollbar>
            </template>
        </div>
    </el-popover>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import city from '../lib/city'
import province from '../lib/province.json'
import { City } from './type'

// 给父组件分发事件
const emits = defineEmits(['changeCity', 'changeProvince'])
const result = ref<string | undefined>('请选择')
const visible = ref<boolean>(false)
const radioValue = ref<string>('按城市')
const selectValue = ref<string>('')
const cities = ref(city.cities)
const provinces = ref(province)
const options = ref<any>([])
const allCity = ref<City[] | any[]>([])
//

const clickItem = (item:City) =>{
    // change city
    result.value = item.name
    visible.value = false
    emits('changeCity', item)
}
const clickProvince = (item:string) => {
    // change Province
    result.value = item
    visible.value = false
    emits('changeProvince', item)
}
const clickChat = (item: string) =>{
    // change abc
    /**
     * 1、设置每一个字母的区域id 为对应的字母
     * 2、使用 document.getElementById(item) 调用点击事件clickChat，跳转到对应的区域
     */
    let el = document.getElementById(item)
    if (el) {
        //TODO： 了解scrollIntoView
        el.scrollIntoView()
         /**
         * scrollIntoView()是 HTML 元素的一个方法，假如我们有一个元素容器出现了滚动条，有滚动条必然就有一些元素是不可见的，
         * 为了让隐藏的元素可见，我们可以手动滚动滚动条，让元素出现，
         * 另一种方法就是调用隐藏元素的 scrollIntoView 方法，让它自动滚动到可视区内。
         */
    }
    /**
     * 另一种实现方法是使用锚点
     * 1、字母被 a 标签包裹，且 :herf=`#${item}` 
     * 2、设置每一个字母的区域id 为对应的字母
     * 3、点击也会跳转到字母对应的区域
     * 
     * vue使用锚点的缺点：
     * 1、点击锚点的时候 会改变url地址，跳转到对应的路由，但是我们没有配置这样的路由，就会跳转空白页或者404页面
     */
}
// 自定义搜索方法
const filterMethod = (val: string) => {
    let values = Object.values(cities.value).flat(Infinity)
    if (val === '') {
        options.value = values
    } else {
        if (radioValue.value === '按城市') {
            // 中文、拼音一起过滤
            options.value = values.filter((item: any) =>{
                return item.name.includes(val) || item.spell.includes(val)
            })
        } else {
            // 中文过滤
            options.value = values.filter((item: any) =>{
                return item.name.includes(val)
            })
        }
    }
}
const changeSelect = (val: number) => {
    let city = allCity.value.find(item => item.id === val)
    result.value = city?.name
    if (radioValue.value === '按城市') {
        emits('changeCity', city)
    } else {
        emits('changeProvince', city?.name)
    }
}
onMounted(()=>{
    // 下拉框的城市数据,flat数组扁平化
    let values = Object.values(cities.value).flat(Infinity)
    allCity.value = values
    options.value = values
})
 
</script>
    
<style lang="scss" scoped>
    .result {
        display: flex;
        align-items: center;
        width: fit-content;
        cursor: pointer;
    }
    .rotate {
        transform: rotate(180deg);
    }
    svg{
        width: 1em;
        height: 1em;
        position: relative;
        top: 2px;
        margin-left: 4px;
        transition: all 0.25s linear;
    }
    .container{
        padding: 6px;
    }
    .city, .province {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 10px;
        margin-bottom: 10px;
        .city-item, .province-item{
            padding: 3px 6px;
            margin-right: 8px;
            border: 1px solid #eee;
            margin-bottom: 8px;
            cursor: pointer;
        }
    }
    .city-name, .province-name {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .city-name-item, .province-name-item{
            margin-right: 6px;
            margin-bottom: 6px;
            cursor: pointer;
        }
    }
</style>
