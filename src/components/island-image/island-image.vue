<template>
  <view class="island-image" :style="rootStyle">
    <view v-if="shouldShowSkeleton" class="island-image__skeleton"></view>

    <image
      class="island-image__inner"
      :lazy-load="props.lazyLoad"
      :mode="props.mode"
      :src="props.src || ''"
      @load="handleImageLoad"
      @error="handleError"
      @tap="handlePreview"
    />
  </view>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { islandImageProps } from './types'

defineOptions({
  name: 'IslandImage'
})

const props = defineProps(islandImageProps)

const emit = defineEmits<{
  (e: 'load', detail: unknown): void
  (e: 'error', detail: unknown): void
}>()

const isLoaded = ref(!props.src)

const resolvedWidth = computed(() => {
  if (props.width !== undefined) return addUnit(props.width, 'rpx')
  if (props.size !== undefined) return addUnit(props.size, 'rpx')
  return undefined
})

const resolvedHeight = computed(() => {
  if (props.height !== undefined) return addUnit(props.height, 'rpx')
  if (props.size !== undefined) return addUnit(props.size, 'rpx')
  return 'auto'
})

const rootStyle = computed(() => ({
  width: resolvedWidth.value,
  borderRadius: addUnit(props.radius, 'px'),
  '--island-image-height': resolvedHeight.value
}))

const shouldShowSkeleton = computed(() => props.showSkeleton && !!props.src && !isLoaded.value)

watch(
  () => props.src,
  (value) => {
    isLoaded.value = !value
  }
)

function addUnit(value: string | number, numberUnit: 'px' | 'rpx') {
  return typeof value === 'number' ? `${value}${numberUnit}` : value
}

function handleImageLoad(event: Event) {
  const detail = (event as Event & { detail?: unknown }).detail
  isLoaded.value = true
  emit('load', detail)
}

function handleError(event: Event) {
  const detail = (event as Event & { detail?: unknown }).detail
  const errorMessage =
    typeof detail === 'object' && detail && 'errMsg' in detail
      ? String((detail as { errMsg?: unknown }).errMsg)
      : ''

  if (errorMessage) {
    console.warn(errorMessage)
  }

  emit('error', detail)
}

function handlePreview() {
  if (!props.src || !props.preview) return

  const uniApi = globalThis as typeof globalThis & {
    uni?: {
      previewImage?: (options: { current: string; urls: string[] }) => void
    }
  }

  uniApi.uni?.previewImage?.({
    current: props.src,
    urls: [props.src]
  })
}
</script>

<style lang="scss">
@import './index.scss';
</style>
