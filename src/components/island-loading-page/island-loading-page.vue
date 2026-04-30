<template>
  <IslandTransition
    :show="props.loading"
    :custom-style="transitionStyle"
    custom-class="island-loading-page__transition"
    @click="handleClick"
  >
    <view :class="rootClasses" :style="props.customStyle">
      <view class="island-loading-page__wrapper">
        <view class="island-loading-page__icon">
          <image v-if="props.image" :src="props.image" class="island-loading-page__image" mode="widthFix" :style="iconStyle" />
          <view v-else class="island-loading-page__spinner" :style="spinnerStyle"></view>
        </view>

        <slot>
          <text class="island-loading-page__text" :style="textStyle">
            {{ props.loadingText }}
          </text>
        </slot>
      </view>
    </view>
  </IslandTransition>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import IslandTransition from '../island-transition'
import { islandLoadingPageProps } from './types'

defineOptions({
  name: 'IslandLoadingPage'
})

const props = defineProps(islandLoadingPageProps)

const emit = defineEmits<{
  (e: 'click', event: Event): void
}>()

const rootClasses = computed(() => ['island-loading-page', props.customClass])

const transitionStyle = computed<CSSProperties>(() => ({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: 'flex',
  backgroundColor: props.bgColor,
  zIndex: props.zIndex
}))

const iconStyle = computed(() => ({
  width: addUnit(props.iconSize),
  height: addUnit(props.iconSize)
}))

const spinnerStyle = computed(() => ({
  width: addUnit(props.iconSize),
  height: addUnit(props.iconSize),
  borderColor: `${props.loadingColor} ${props.loadingColor} ${props.loadingColor} transparent`
}))

const textStyle = computed(() => ({
  fontSize: addUnit(props.fontSize),
  color: props.customColor
}))

function addUnit(value: string | number) {
  return typeof value === 'number' ? `${value}px` : value
}

function handleClick(event: Event) {
  emit('click', event)
}
</script>

<style lang="scss">
@import './index.scss';
</style>
