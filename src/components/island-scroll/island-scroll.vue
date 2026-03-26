<template>
  <view class="island-scroll" :style="rootStyle">
    <scroll-view
      class="island-scroll__scroll"
      :upper-threshold="props.upperThreshold"
      :lower-threshold="props.lowerThreshold"
      :scroll-y="true"
      :scroll-top="scrollState.offsetTop"
      :scroll-with-animation="true"
      @scrolltolower="handleLoad"
      @scrolltoupper="handleUpper"
    >
      <slot></slot>

      <view class="island-scroll__load-more">
        <text v-if="!props.loadDone && !props.loading" class="island-scroll__load-text" @tap="handleLoad">
          {{ props.loadText }}
        </text>

        <view v-else-if="props.loading" class="island-scroll__loading">
          <view class="island-scroll__loading-icon"></view>
          <text class="island-scroll__load-text">{{ props.loadingText }}</text>
        </view>

        <text v-else-if="props.finishedText" class="island-scroll__finished-text">
          {{ props.finishedText }}
        </text>
      </view>

      <view v-if="props.placeholder" class="island-scroll__placeholder"></view>
    </scroll-view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'IslandScroll',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, reactive, watch } from 'vue'
import { islandScrollProps } from './types'

const emit = defineEmits<{
  (e: 'refresh'): void
  (e: 'load'): void
}>()

const props = defineProps(islandScrollProps)

const scrollState = reactive({
  offsetTop: 0
})

const loadState = reactive({
  pending: false
})

let scrollTopResetTimer: ReturnType<typeof setTimeout> | null = null

const rootStyle = computed(() => ({
  padding: props.padding,
  background: props.background,
  '--island-scroll-height': addUnit(props.height),
  '--island-scroll-bottom-offset': addUnit(props.bottomOffset)
}))

watch(
  () => props.resetKey,
  (value, oldValue) => {
    if (value === undefined) return
    if (value !== oldValue) scrollToTop()
  }
)

watch(
  () => props.dataTotal,
  (value, oldValue) => {
    if (props.resetKey !== undefined) return
    if (oldValue !== undefined && value < oldValue) scrollToTop()
  }
)

watch(
  () => props.loading,
  (value) => {
    if (!value) {
      loadState.pending = false
    }
  }
)

onBeforeUnmount(() => {
  if (scrollTopResetTimer) {
    clearTimeout(scrollTopResetTimer)
    scrollTopResetTimer = null
  }
})

function addUnit(value: string | number) {
  return typeof value === 'number' ? `${value}px` : value
}

function scrollToTop() {
  if (scrollTopResetTimer) {
    clearTimeout(scrollTopResetTimer)
  }

  scrollState.offsetTop = 0
  scrollTopResetTimer = setTimeout(() => {
    scrollState.offsetTop = -1
    scrollTopResetTimer = null
  }, 200)
}

function releaseLoadLockIfIdle() {
  nextTick(() => {
    if (!props.loading) {
      loadState.pending = false
    }
  })
}

function handleUpper() {
  emit('refresh')
}

function handleLoad() {
  if (props.loading || props.loadDone || loadState.pending) return

  loadState.pending = true
  emit('load')
  releaseLoadLockIfIdle()
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
