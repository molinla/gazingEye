<script setup lang="ts">
import * as THREE from "three"
import { ref, watchEffect } from "vue"

const $container = ref<HTMLElement>()

watchEffect((onCleanup) => {
    if (!$container.value) return
    const dispose = init($container.value)
    onCleanup(() => {
        dispose()
    })
})

function init($container: HTMLElement) {

    const width = $container.clientWidth
    const height = $container.clientHeight

    const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10)
    camera.position.z = 1

    const scene = new THREE.Scene()

    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
    const material = new THREE.MeshNormalMaterial()

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    renderer.setAnimationLoop(animate)

    $container.appendChild(renderer.domElement)

    // animation

    function animate(time: number) {
        mesh.rotation.x = time / 2000
        mesh.rotation.y = time / 1000
        renderer.render(scene, camera)
    }

    return () => {
        renderer.dispose()
    }
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
