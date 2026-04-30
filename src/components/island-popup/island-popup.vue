<template>
  <view v-if="shouldRender" class="island-popup">
    <view
      v-if="props.overlay && overlayRendered"
      :class="overlayClasses"
      :style="overlayStyle"
      @tap.stop="handleOverlayClick"
      @animationend="handleOverlayAnimationEnd"
    ></view>

    <view
      v-if="popupRendered"
      :class="popupClasses"
      :style="popupStyle"
      @tap.stop="handlePopupClick"
      @animationend="handlePopupAnimationEnd"
    >
      <slot v-if="showSlot"></slot>

      <view
        v-if="props.closeable"
        :class="['island-popup__close', `island-popup__close--${props.closeIconPosition}`]"
        @tap.stop="handleCloseIconClick"
      >
        <slot name="closeIcon">
          <view class="island-popup__close-icon"></view>
        </slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { islandPopupProps } from './types'
import type { IslandPopupPosition } from './types'
import type { IslandTransitionName } from '../island-transition'

defineOptions({
  name: 'IslandPopup'
})

const props = defineProps(islandPopupProps)

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'click-pop', event: Event): void
  (e: 'click-close-icon'): void
  (e: 'click-overlay'): void
  (e: 'open'): void
  (e: 'opened'): void
  (e: 'close'): void
  (e: 'closed'): void
}>()

const overlayRendered = ref(props.visible)
const popupRendered = ref(props.visible || !props.destroyOnClose)
const showSlot = ref(props.visible || !props.destroyOnClose)
const isActive = ref(false)
const animationState = ref<'idle' | 'enter' | 'leave'>('idle')
const overlayAnimationState = ref<'idle' | 'enter' | 'leave'>('idle')

const shouldRender = computed(() => overlayRendered.value || popupRendered.value)

const defaultTransitionMap: Record<IslandPopupPosition, IslandTransitionName> = {
  center: 'fade',
  top: 'slide-down',
  right: 'slide-right',
  bottom: 'slide-up',
  left: 'slide-left'
}

const transitionName = computed(() => props.transition || defaultTransitionMap[props.position])

const overlayClasses = computed(() => [
  'island-popup__overlay',
  props.overlayClass,
  {
    'island-popup__overlay--enter': overlayAnimationState.value === 'enter',
    'island-popup__overlay--leave': overlayAnimationState.value === 'leave'
  }
])

const popupClasses = computed(() => [
  'island-popup__panel',
  `island-popup__panel--${props.position}`,
  props.popClass,
  {
    'island-popup__panel--hidden': !props.visible && animationState.value === 'idle',
    'island-popup__panel--round': props.round,
    'island-popup__panel--safe-top': props.position === 'top' && props.safeAreaInsetTop,
    'island-popup__panel--safe-bottom': props.position === 'bottom' && props.safeAreaInsetBottom,
    [getPopupTransitionClass('enter')]: animationState.value === 'enter',
    [getPopupTransitionClass('leave')]: animationState.value === 'leave'
  }
])

const overlayStyle = computed(() => ({
  zIndex: props.zIndex,
  animationDuration: `${props.duration}ms`,
  ...props.overlayStyle
}))

const popupStyle = computed(() => ({
  zIndex: props.zIndex + 1,
  animationDuration: `${props.duration}ms`,
  ...props.customStyle
}))

watch(
  () => props.visible,
  async (visible) => {
    if (visible) {
      open()
      return
    }

    close()
  },
  { immediate: true }
)

async function open() {
  if (isActive.value && animationState.value !== 'leave') return

  isActive.value = true
  overlayRendered.value = true
  popupRendered.value = true
  showSlot.value = true
  animationState.value = 'idle'
  overlayAnimationState.value = 'idle'
  emit('open')

  await nextTick()

  if (!props.visible) return

  animationState.value = 'enter'
  overlayAnimationState.value = 'enter'
  emit('update:visible', true)
}

function close() {
  if (!isActive.value || !popupRendered.value || animationState.value === 'leave') return

  isActive.value = false
  animationState.value = 'leave'
  overlayAnimationState.value = 'leave'
  emit('close')
}

function requestClose() {
  emit('update:visible', false)
  close()
}

function handleOverlayClick() {
  emit('click-overlay')

  if (props.closeOnClickOverlay) {
    requestClose()
  }
}

function handleCloseIconClick() {
  emit('click-close-icon')
  requestClose()
}

function handlePopupClick(event: Event) {
  emit('click-pop', event)
}

function getPopupTransitionClass(stage: 'enter' | 'leave') {
  if (transitionName.value === 'none') {
    return ''
  }

  if (props.position === 'center' && transitionName.value === 'zoom') {
    return `island-popup__panel--center-zoom-${stage}`
  }

  return `island-transition-${transitionName.value}-${stage}`
}

function handlePopupAnimationEnd() {
  if (animationState.value === 'enter') {
    animationState.value = 'idle'
    emit('opened')
    return
  }

  if (animationState.value !== 'leave') return

  animationState.value = 'idle'
  popupRendered.value = !props.destroyOnClose
  showSlot.value = !props.destroyOnClose
  emit('closed')

  if (!props.overlay || overlayAnimationState.value === 'idle') {
    overlayRendered.value = false
  }
}

function handleOverlayAnimationEnd() {
  if (overlayAnimationState.value === 'enter') {
    overlayAnimationState.value = 'idle'
    return
  }

  if (overlayAnimationState.value !== 'leave') return

  overlayAnimationState.value = 'idle'

  if (overlayAnimationState.value === 'idle') {
    overlayRendered.value = false
  }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
