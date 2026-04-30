<template>
  <image
    v-bind="attrs"
    class="island-icon"
    :lazy-load="props.lazyLoad"
    :mode="props.mode"
    :src="src"
    :style="mainStyle"
  />
</template>

<script lang="ts" setup>
import { computed, useAttrs } from 'vue'
import { islandIconMap } from './icons'
import { islandIconProps } from './types'

defineOptions({
  name: 'IslandIcon'
})

const props = defineProps(islandIconProps)
const attrs = useAttrs()

const src = computed(() => (props.name ? islandIconMap[props.name] : ''))

const mainStyle = computed(() => {
  const size = addUnit(props.size)
  const width = addUnit(props.width) || size
  const height = addUnit(props.height) || size

  return {
    '--island-icon-width': width,
    '--island-icon-height': height,
    '--island-icon-radius': addUnit(props.radius)
  }
})

function addUnit(value: string | number | undefined) {
  if (value === undefined) return undefined

  return typeof value === 'number' ? `${value}rpx` : value
}
</script>

<style lang="scss">
@import './index.scss';
</style>
