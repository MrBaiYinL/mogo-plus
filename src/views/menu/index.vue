<!--
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-16 17:13:58
 * @Description:  
-->
<template>
    <div style="width: 200px">
        <mogo-menu :data="data1" defaultActive="2" name="a" index="b" icon="c" children="d"></mogo-menu>
    </div>
    <br />
    <br />
    <br />
    <br />
    <div style="width: 200px">
        <mogo-infinite-menu  :data="data2" defaultActive="2" name="a" index="b" icon="c" children="d" ></mogo-infinite-menu>
    </div>
</template>
<script lang="ts" setup>
//
let data1 = [
  {
    a: '导航1',
    b: '1',
    c: 'Document'
  },
  {
    a: '导航2',
    b: '2',
    c: 'Document'
  },
  {
    a: '导航3',
    b: '3',
    c: 'Document',
    d: [
      {
        a: '导航3-1',
        b: '3-1',
        c: 'Document',
      }
    ]
  }
]
let data2 = [
  {
    a: '导航1',
    b: '1',
    c: 'Document'
  },
  {
    a: '导航2',
    b: '2',
    c: 'Document'
  },
  {
    a: '导航3',
    b: '3',
    c: 'Document',
    d: [
      {
        a: '导航3-1',
        b: '3-1',
        c: 'Document',
        d: [
          {
            a: '导航3-1-1',
            b: '3-1-1',
            c: 'Document',
            d: [
              {
                a: '导航3-1-1-1',
                b: '3-1-1-1',
                c: 'Document',
                d: [
                  {
                    a: '导航3-1-1-1-1',
                    b: '3-1-1-1-1',
                    c: 'Document',
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]
</script>
    
<style lang="scss" scoped>
</style>
     