<script setup lang="ts">
import * as THREE from "three"
import { ref, watchEffect } from "vue"
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js"
import Stats from "three/addons/libs/stats.module.js"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js"
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js"

const $container = ref<HTMLElement>()

watchEffect((onCleanup) => {
    if (!$container.value) return
    const dispose = init($container.value)
    onCleanup(() => {
        dispose()
    })
})

const colors = [0x0A0A0A, 0x5B5B5B, 0x00CBCA, 0xD0CF29, 0xBD1B1C, 0x01BC28]

function init($container: HTMLElement) {
    // 显示帧率监测
    const stats = new Stats()
    $container.appendChild(stats.dom)

    const width = $container.clientWidth
    const height = $container.clientHeight


    const effectController = {
        running: false,
    }
    const gui = new GUI()

    gui.add(effectController, "running" )

    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 3000)
    camera.position.z = 1000

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf0f0f0)
    scene.fog = new THREE.Fog(0xf0f0f0, 1000, 3000)

    const createGeometry = (height: number) => {
        const radiusTop = 2
        const radiusBottom = 2
        const radialSegments = 32
        const heightSegments = 1
        const openEnded = false

        return new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded)
    }

    let cylinders: THREE.Mesh[] = []
    const numCylinders = 400
    const radius = 90 // 圆环的半径
    const geometries: THREE.CylinderGeometry[] = []
    const numSegments = 10 // 将 z 轴划分为 10 个区段
    const segmentHeight = 4800 / numSegments // 每个区段的高度

    for (let i = 0; i < numCylinders; i++) {
        const randomHeight = Math.random() * 600 + 300
        const geometry = createGeometry(randomHeight)
        geometries.push(geometry)
        const color = new THREE.Color(colors[Math.floor(Math.random() * colors.length)])
        const material = new THREE.MeshStandardMaterial({
            color            : color, // 基本颜色
            emissive         : color, // 自发光颜色
            emissiveIntensity: 1, // 自发光强度
            roughness        : 0.5,
            metalness        : 0.1,
        })
        const object = new THREE.Mesh(
            geometry,
            material
        )

        // 旋转圆柱体，使其顶部朝向摄像头
        object.rotation.x = Math.PI / 2

        // 随机分布在圆环附近
        const angle = Math.random() * Math.PI * 2
        const offset = (Math.random() - 0.5) * 100 // 随机偏移量，增加随机性
        object.position.x = (radius + offset) * Math.cos(angle)
        object.position.y = (radius + offset) * Math.sin(angle)

        // 在每个区段内均匀分配圆柱体
        const segmentIndex = Math.floor(i / (numCylinders / numSegments))
        const segmentStart = -6400 + segmentIndex * segmentHeight
        object.position.z = segmentStart + Math.random() * segmentHeight

        cylinders.push(object)
    }

    // 随机打乱圆柱体的顺序
    cylinders = cylinders.sort(() => Math.random() - 0.5)

    // 添加到场景
    cylinders.forEach(object => scene.add(object))

    // const ambientLight = new THREE.AmbientLight(0xffffff, 1)
    // scene.add(ambientLight)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    $container.appendChild(renderer.domElement)

    const controls = new TrackballControls(camera, renderer.domElement)
    controls.rotateSpeed = 0.3

    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))

    const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        1.5, // 强度
        0.4, // 半径
        0.85 // 阈值
    )
    composer.addPass(bloomPass)



    // 在创建圆柱体时，为每个圆柱体添加一个速度属性
    const cylindersConfig = cylinders.map(cylinder => ({
        ...cylinder,
        speed: 0,
        time : 0,
    }))


    function animate() {
        requestAnimationFrame(animate)

        // 设置目标速度
        const targetSpeed = 30 // 目标速度

        const duration = 1000 // 缓动的持续时间（毫秒）

        cylindersConfig.forEach((cylinder) => {
            // 计算当前时间的比例（0 到 1）
            const t = Math.min(cylinder.time / duration, 1)
            const easingFactor = easeInOutCubic(t)

            // 更新速度，应用缓动函数
            cylinder.speed = targetSpeed * easingFactor

            // 更新圆柱体的位置
            cylinder.position.z += cylinder.speed

            // 如果圆柱体超出视野，则将其重置到更远的地方
            if (cylinder.position.z > camera.position.z + 600) {
                const angle = Math.random() * Math.PI * 2
                const offset = (Math.random() - 0.5) * 100
                cylinder.position.x = (radius + offset) * Math.cos(angle)
                cylinder.position.y = (radius + offset) * Math.sin(angle)
                if (effectController.running) {
                    cylinder.position.z = -2200 // 重置到更远的地方
                    cylinder.speed = 0 // 重置速度
                    cylinder.time = 0 // 重置时间参数
                }

            } else {
                cylinder.time += 16.67
            }
        })

        // 更新时间参数

        controls.update()
        stats.update()
        composer.render()
        renderer.render(scene, camera)
    }

    animate()

    return () => {
        geometries.forEach(geometry => geometry.dispose())
        renderer.dispose()
        controls.dispose()
    }
}

function easeInOutCubic(t: number) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}



</script>

<template>
    <article
        ref="$container"
        class="w-full h-full"
    ></article>
</template>

<style>
html, body, #app {
    height: 100%;
    width: 100%;
    font-family: "roboto", "Pu Hui", -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif;
}
</style>
