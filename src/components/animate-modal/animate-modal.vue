<template>
  <view class="animate-modal">
    <view
      v-if="maskVisible"
      class="animate-modal__mask"
      :style="{ zIndex }"
      :class="{ 'animate-modal__mask-enter': isMaskEntering, 'animate-modal__mask-leave': isMaskLeaving }"
      @tap.stop="onMaskClick"
      @animationend="onMaskAnimationEnd"
    ></view>
    <view
      v-if="modalVisible"
      class="animate-modal__container"
      :style="{ zIndex: zIndex + 1 }"
      :class="{ 'animate-modal__modal-enter': isEntering, 'animate-modal__modal-leave': isLeaving }"
      @animationend="onModalAnimationEnd"
      @tap.stop
    >
      <slot></slot>
      <view v-if="showClose" class="animate-modal__close" @tap="onCloseClick">
        <view class="animate-modal__close_icon"></view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { animateModalProps } from './types'

defineOptions({
  name: 'AnimateModal'
})

const props = defineProps(animateModalProps)

const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void
  (e: 'maskClick'): void
  (e: 'close'): void
  (e: 'afterEnter'): void
  (e: 'afterLeave'): void
}>()

const modalVisible = ref(false)
const maskVisible = ref(false)
const isEntering = ref(false)
const isLeaving = ref(false)
const isMaskEntering = ref(false)
const isMaskLeaving = ref(false)

function startEnterAnimation() {
  isEntering.value = true
  isLeaving.value = false
}

function startLeaveAnimation() {
  isEntering.value = false
  isLeaving.value = true
}

function startMaskEnterAnimation() {
  isMaskEntering.value = true
  isMaskLeaving.value = false
}

function startMaskLeaveAnimation() {
  isMaskEntering.value = false
  isMaskLeaving.value = true
}

function openModal() {
  if (!maskVisible.value) {
    maskVisible.value = true
    startMaskEnterAnimation()
  }

  modalVisible.value = true
  nextTick(() => {
    if (!props.visible) return
    startEnterAnimation()
  })
}

function closeModal() {
  if (!modalVisible.value || isLeaving.value) return

  if (!props.keepMaskOnLeave) {
    startMaskLeaveAnimation()
  }

  startLeaveAnimation()
}

function onMaskClick() {
  emit('maskClick')
  emit('update:visible', false)
  closeModal()
}

function onCloseClick() {
  emit('close')
  emit('update:visible', false)
  closeModal()
}

function onModalAnimationEnd() {
  if (isEntering.value) {
    isEntering.value = false
    emit('afterEnter')
    return
  }

  if (!isLeaving.value) return

  isLeaving.value = false
  modalVisible.value = false
  emit('afterLeave')
}

function onMaskAnimationEnd() {
  if (isMaskEntering.value) {
    isMaskEntering.value = false
    return
  }

  if (!isMaskLeaving.value) return

  isMaskLeaving.value = false
  maskVisible.value = false
}

watch(
  () => props.visible,
  (visible) => {
    if (visible) {
      openModal()
      return
    }

    closeModal()
  },
  { immediate: true }
)
</script>

<style lang="scss">
@import './index.scss';
</style>

