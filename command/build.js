/*
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-29 16:53:10
 * @Description:  
 */
import path from 'path'
import fsExtra from 'fs-extra'
import fs from 'fs'
import { defineConfig, build } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 打包入口文件夹
const entryDir = path.resolve(__dirname, '../packages')
// 打包出口文件夹
const outputDir = path.resolve(__dirname, '../dist')

// vite基础配置
const baseConfig = defineConfig({
    configFile: false,
    publicDir: false,
    plugins: [vue(), vueJsx()]
})

// rollup
const rollupOptions = {
    extends: ['vue', 'vue-router'],
    output: {
        globals: {
            vue: 'Vue'
        },
    },
    external: [
        "element-plus", 'vue'
    ],
}

// 全量打包构建
const buildAll = async() => {
    await build({
        ...baseConfig,
        build: {
            rollupOptions,
            lib: {
                entry: path.resolve(entryDir, 'index.ts'),
                name: 'mogo_components',
                fileName: (format) => `index.${format}.js`,
                formats: ['es', 'umd'] // , 'cjs', 'umd', 'iife', "amd"
            },
        },
        outDir: outputDir
    })
}

// 单独组件打包 name: 组件名称
const buildSingle = async(name) => {
    await build({
        ...baseConfig,
        build: {
            rollupOptions,
            lib: {
                entry: path.resolve(entryDir, 'index.ts'),
                name: 'index',
                fileName: (format) => `index.${format}.js`,
                formats: ['es', 'umd'] // es umd iife
            },
            outDir: path.resolve(outputDir, name),
        },
    })
}
// 生成组件的 package.json 文件
const createPackageJson = (name) => {
    const fileStr = `{
        "name": "${name}",
        "version": "0.0.0",
        "main": "index.umd.js",
        "module": "index.es.js",
        "style": "style.css"
    }`
  
    fsExtra.outputFile(
        path.resolve(outputDir, `${name}/package.json`),
        fileStr,
        'utf-8'
    )
}

// 打包出库
const buildLib = async() => {
    await buildAll()

    // 获取组件名称组成的数组
    const components = fs.readdirSync(entryDir).filter(name => {
        const componentDir = path.resolve(entryDir, name)
        const isDir = fs.lstatSync(componentDir).isDirectory()
        return isDir && fs.readdirSync(componentDir).includes('index.ts')
    })

    // 循环一个一个组件构建
    for (const name of components) {
        // 构建单组件
        await buildSingle(name)

        // 生成组件的 package.json 文件
        createPackageJson(name)
    }
}

buildLib()
