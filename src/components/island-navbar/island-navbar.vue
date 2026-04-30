<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { islandNavbarProps } from './types'

defineOptions({
  name: 'IslandNavbar'
})

const props = defineProps(islandNavbarProps)

const emit = defineEmits<{
  (e: 'title-click'): void
  (e: 'back'): void
  (e: 'home'): void
}>()

const navPaddingLeft = ref(20)
const navHeight = ref(80)
const statusHeight = ref(44)
const navRightWidth = ref(0)
const showHomeButton = ref(false)

const rootStyle = computed(() => ({
  height: `${props.placeholder ? navHeight.value : 0}px`,
  '--nav-background': props.background,
  '--nav-height': `${navHeight.value}px`,
  '--nav-padding-left': `${navPaddingLeft.value}px`,
  '--status-bar-height': `${statusHeight.value}px`,
  '--nav-right-width': `${navRightWidth.value}px`,
}))

function handleBack() {
  if (props.backFunc) {
    props.backFunc()
  } else {
    emit('back')
    getUniApi()?.navigateBack?.()
  }
}

function handleTitleClick() {
  emit('title-click')
}

function handleHomeClick() {
  emit('home')

  if (!props.homePath) return

  getUniApi()?.switchTab?.({ url: props.homePath })
}

function setHomeButton() {
  const pages = getPages()

  if (pages.length === 1) {
    showHomeButton.value = true
  }
}

function setNavHeight() {
  const uniApi = getUniApi()
  const deviceInfo = uniApi?.getDeviceInfo?.()
  const windowInfo = uniApi?.getWindowInfo?.()
  const capsuleInfo = uniApi?.getMenuButtonBoundingClientRect?.()

  if (!windowInfo || !capsuleInfo) return

  if (!windowInfo.statusBarHeight) {
    windowInfo.statusBarHeight = deviceInfo?.platform === 'android' ? 48 : 44
  }

  const navRightPadding = windowInfo.windowWidth - capsuleInfo.right // 胶囊右侧到屏幕右侧的距离
  navHeight.value = windowInfo.statusBarHeight + capsuleInfo.height + (capsuleInfo.top - windowInfo.statusBarHeight) * 2
  navPaddingLeft.value = navRightPadding
  navRightWidth.value = navRightPadding + capsuleInfo.width
  statusHeight.value = windowInfo.statusBarHeight
}

function getUniApi() {
  return (
    globalThis as typeof globalThis & {
      uni?: {
        navigateBack?: () => void
        switchTab?: (options: { url: string }) => void
        getDeviceInfo?: () => { platform?: string }
        getWindowInfo?: () => {
          statusBarHeight?: number
          windowWidth: number
        }
        getMenuButtonBoundingClientRect?: () => {
          top: number
          right: number
          width: number
          height: number
        }
      }
    }
  ).uni
}

function getPages() {
  const pagesApi = (
    globalThis as typeof globalThis & {
      getCurrentPages?: () => unknown[]
    }
  ).getCurrentPages

  return pagesApi?.() ?? []
}

onMounted(() => {
  setNavHeight()
  setHomeButton()
})

defineExpose({
  height: navHeight
})
</script>

<template>
  <view class="island-navbar" :style="rootStyle">
    <view class="island-navbar__inner">
      <view class="island-navbar__left">
        <view
          v-if="props.backIcon"
          class="island-navbar__back"
          hover-class="island-navbar__back--active"
          :hover-stay-time="100"
          aria-role="button"
          aria-label="返回"
          @tap="handleBack"
        >
          <view class="island-navbar__back-icon" />
        </view>
        <view v-if="showHomeButton && props.homePath" class="island-navbar__home" @tap="handleHomeClick">
          <view class="island-navbar__home-icon" />
        </view>
      </view>
      <view class="island-navbar__center" @tap="handleTitleClick">
        <slot name="center">
          <text>{{ props.title }}</text>
        </slot>
      </view>
      <!-- 占位用 -->
      <view class="island-navbar__right" />
    </view>
  </view>
</template>

<style lang="scss">
@import './index.scss';
</style>
