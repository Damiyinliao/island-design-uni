<template>
  <view v-if="!props.destroyOnClose || display" :class="classes" :style="styles" @tap="handleClick">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { islandTransitionProps } from './types'

defineOptions({
  name: 'IslandTransition'
})

const props = defineProps(islandTransitionProps)

const emit = defineEmits<{
  (e: 'beforeEnter'): void
  (e: 'enter'): void
  (e: 'afterEnter'): void
  (e: 'beforeLeave'): void
  (e: 'leave'): void
  (e: 'afterLeave'): void
  (e: 'click', event: Event): void
}>()

const display = ref(false)
const animationClass = ref('')
let timer: ReturnType<typeof setTimeout> | undefined

const classes = computed(() => [
  'island-transition',
  props.customClass,
  animationClass.value,
  {
    'island-transition--hidden': !display.value
  }
])

const styles = computed(() => ({
  animationDuration: props.name === 'none' ? '0ms' : `${props.duration}ms`,
  animationTimingFunction: props.timingFunction,
  ...props.customStyle
}))

watch(
  () => props.show,
  (value) => {
    if (value) {
      enter()
      return
    }

    leave()
  },
  { immediate: true }
)

async function enter() {
  if (display.value) return

  clearTimer()
  emit('beforeEnter')
  display.value = true
  animationClass.value = getEnterClass()

  await nextTick()

  emit('enter')
  timer = setTimeout(() => {
    animationClass.value = props.enterToClass
    emit('afterEnter')
  }, props.duration)
}

async function leave() {
  if (!display.value) return

  clearTimer()
  emit('beforeLeave')
  animationClass.value = getLeaveClass()

  await nextTick()

  emit('leave')
  timer = setTimeout(() => {
    if (!props.show) {
      display.value = false
    }

    animationClass.value = props.leaveToClass
    emit('afterLeave')
  }, props.duration)
}

function getEnterClass() {
  if (props.enterFromClass || props.enterActiveClass) {
    return [props.enterFromClass, props.enterActiveClass].filter(Boolean).join(' ')
  }

  return props.name === 'none' ? '' : `island-transition-${props.name}-enter`
}

function getLeaveClass() {
  if (props.leaveFromClass || props.leaveActiveClass) {
    return [props.leaveFromClass, props.leaveActiveClass].filter(Boolean).join(' ')
  }

  return props.name === 'none' ? '' : `island-transition-${props.name}-leave`
}

function clearTimer() {
  if (!timer) return

  clearTimeout(timer)
  timer = undefined
}

function handleClick(event: Event) {
  emit('click', event)
}
</script>

<style lang="scss">
@import './index.scss';
</style>
