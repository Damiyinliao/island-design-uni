<template>
  <view v-if="rendered" class="island-modal">
    <view class="island-modal__mask" @tap.stop="handleMaskClick"></view>

    <view :class="panelClasses" :style="panelStyle" @animationend="handleAnimationEnd" @tap.stop>
      <view class="island-modal__inner">
        <view v-if="props.title || $slots.header" class="island-modal__header">
          <view v-if="props.title" class="island-modal__title">{{ props.title }}</view>
          <slot v-else name="header"></slot>
        </view>

        <view class="island-modal__body">
          <slot></slot>
        </view>
      </view>

      <view v-if="$slots.footer || props.showCancel || props.showConfirm" class="island-modal__footer">
        <slot name="footer">
          <view class="island-modal__actions">
            <view v-if="props.showCancel" class="island-modal__action" @tap="handleCancel">
              {{ props.cancelLabel }}
            </view>

            <view
              v-if="props.showConfirm"
              :class="[
                'island-modal__action',
                'island-modal__action--primary',
                { 'island-modal__action--split': props.showCancel }
              ]"
              @tap="handleConfirm"
            >
              {{ props.confirmLabel }}
            </view>
          </view>
        </slot>
      </view>
    </view>
  </view>
</template>
<script lang="ts">
export default {
  name: 'IslandText'
}
</script>
<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { islandModalProps } from './types'

const props = defineProps(islandModalProps)

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
  (e: 'mask'): void
}>()

const rendered = ref(props.visible)
const animationState = ref<'idle' | 'enter' | 'leave'>(props.visible ? 'enter' : 'idle')

const panelClasses = computed(() => [
  'island-modal__panel',
  {
    'island-modal__panel--enter': animationState.value === 'enter',
    'island-modal__panel--leave': animationState.value === 'leave'
  }
])

const panelStyle = computed(() => ({
  width: addUnit(props.width)
}))

watch(
  () => props.visible,
  async (value) => {
    if (value) {
      rendered.value = true
      animationState.value = 'idle'
      await nextTick()
      animationState.value = 'enter'
      return
    }

    if (rendered.value) {
      startLeaveAnimation()
    }
  },
  { immediate: true }
)

function addUnit(value: string | number) {
  return typeof value === 'number' ? `${value}px` : value
}

function startLeaveAnimation() {
  if (!rendered.value || animationState.value === 'leave') return
  animationState.value = 'leave'
}

function handleCancel() {
  emit('cancel')
  startLeaveAnimation()
}

function handleConfirm() {
  emit('confirm')
  startLeaveAnimation()
}

function handleMaskClick() {
  emit('mask')
  startLeaveAnimation()
}

function handleAnimationEnd() {
  if (animationState.value === 'enter') {
    animationState.value = 'idle'
    return
  }

  if (animationState.value === 'leave') {
    rendered.value = false
    animationState.value = 'idle'
    emit('update:visible', false)
  }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
