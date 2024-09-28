import { URL, fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "node:path"

// 获取当前目录名称
const currentDirName = path.basename(process.cwd())

// https://vitejs.dev/config/
export default defineConfig({
    base   : `/${currentDirName}/`, // 使用当前目录名称作为 base 路径
    plugins: [vue()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "#": fileURLToPath(new URL("./src/components", import.meta.url)),
        },
    },
})
