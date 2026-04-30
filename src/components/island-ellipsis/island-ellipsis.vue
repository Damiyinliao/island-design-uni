<template>
  <view :class="rootClasses" :style="props.customStyle">
    <view :id="rootId" class="island-ellipsis__inner" @tap="handleClick">
      <view v-if="!state.exceeded" class="island-ellipsis__wordbreak">
        {{ props.content }}
      </view>

      <view v-else-if="!state.expanded" class="island-ellipsis__wordbreak">
        {{ ellipsis.leading }}{{ ellipsis.leading ? props.symbol : '' }}<view
          v-if="props.expandText"
          class="island-ellipsis__text"
          @tap.stop="handleToggle(true)"
        >
          {{ props.expandText }}
        </view>{{ ellipsis.tailing ? props.symbol : '' }}{{ ellipsis.tailing }}
      </view>

      <view v-else class="island-ellipsis__wordbreak">
        {{ props.content }}<view
          v-if="props.collapseText"
          class="island-ellipsis__text"
          @tap.stop="handleToggle(false)"
        >
          {{ props.collapseText }}
        </view>
      </view>
    </view>

    <view :id="contentMeasureId" class="island-ellipsis__copy" :style="{ width: widthRef }">
      <view>{{ contentCopy }}</view>
    </view>

    <view :id="symbolMeasureId" class="island-ellipsis__copy">
      {{ symbolText }}
    </view>
  </view>
</template>

<script setup lang="ts">
import type { ComponentInternalInstance } from 'vue'
import { computed, getCurrentInstance, nextTick, onMounted, reactive, ref, watch } from 'vue'
import { islandEllipsisProps } from './types'
import type { IslandEllipsisedValue } from './types'

defineOptions({
  name: 'IslandEllipsis'
})

interface SelectorNodeInfo {
  width?: number
  height?: number
  lineHeight?: string
  paddingTop?: string
  paddingBottom?: string
  fontSize?: string
}

interface SelectorQuery {
  select: (selector: string) => {
    fields: (options: { computedStyle?: string[]; size?: boolean }, callback: (res: SelectorNodeInfo) => void) => {
      exec: () => void
    }
    boundingClientRect: (callback: (res: SelectorNodeInfo) => void) => {
      exec: () => void
    }
  }
}

const props = defineProps(islandEllipsisProps)

const emit = defineEmits<{
  (e: 'change', value: 'expand' | 'collapse'): void
  (e: 'click'): void
}>()

const instance = getCurrentInstance()
const randomId = Math.random().toString(36).slice(2, 10)
const rootId = `islandEllipsisRoot${randomId}`
const contentMeasureId = `islandEllipsisContent${randomId}`
const symbolMeasureId = `islandEllipsisSymbol${randomId}`

const contentCopy = ref(props.content)
const widthRef = ref('auto')
const ellipsis = reactive<IslandEllipsisedValue>({})
const state = reactive({
  exceeded: false,
  expanded: false
})

let maxHeight = 0
let lineHeight = 0
let originHeight = 0
let widthBase = [14, 10, 7, 8.4, 10]
let symbolTextWidth = widthBase[0] * 0.7921

const chineseReg = /^[\u4E00-\u9FA5]+$/
const digitReg = /^\d+$/
const letterUpperReg = /^[A-Z]+$/
const letterLowerReg = /^[a-z]+$/

const rootClasses = computed(() => ['island-ellipsis', props.customClass])

const symbolText = computed(() => {
  if (props.direction === 'end' || props.direction === 'middle') {
    return `${props.symbol}${props.expandText}`
  }

  return `${props.symbol}${props.expandText}${props.symbol}`
})

watch(
  () => [
    props.content,
    props.direction,
    props.rows,
    props.expandText,
    props.collapseText,
    props.symbol,
    props.lineHeight
  ],
  () => {
    resetState()
    scheduleCalculate()
  }
)

onMounted(() => {
  scheduleCalculate()
})

function scheduleCalculate() {
  setTimeout(async () => {
    await nextTick()
    await getSymbolInfo()
    await getReference()
  }, 100)
}

async function getSymbolInfo() {
  const node = await getNodeRect(`#${symbolMeasureId}`)
  symbolTextWidth = node.width ? Math.ceil(node.width) : Math.ceil(widthBase[0] * 0.7921)
}

async function getReference() {
  const node = await getNodeFields(`#${rootId}`, ['width', 'height', 'lineHeight', 'paddingTop', 'paddingBottom', 'fontSize'])

  if (!node.width || !node.height) {
    return
  }

  lineHeight = pxToNumber(node.lineHeight === 'normal' ? props.lineHeight : node.lineHeight)
  maxHeight = Math.floor(
    lineHeight * (normalizeRows() + 0.5) + pxToNumber(node.paddingTop) + pxToNumber(node.paddingBottom)
  )
  originHeight = pxToNumber(node.height)
  widthRef.value = `${node.width}px`

  const fontSize = pxToNumber(node.fontSize)
  widthBase = [fontSize, fontSize * 0.72, fontSize * 0.53, fontSize * 0.4, fontSize * 0.75]

  await calculateEllipsis()
}

async function calculateEllipsis() {
  const node = await getNodeRect(`#${contentMeasureId}`)

  if (!node.height || node.height <= maxHeight || !lineHeight || !originHeight) {
    state.exceeded = false
    return
  }

  state.exceeded = true
  const estimatedLineCount = Math.max(originHeight / lineHeight - 1, 1)
  const rowCharacterCount = Math.max(Math.floor(props.content.length / estimatedLineCount), 1)
  const rows = normalizeRows()

  if (props.direction === 'middle') {
    ellipsis.leading = tailorContent(0, rowCharacterCount * (rows + 0.5), 'end')
    ellipsis.tailing = tailorContent(props.content.length - rowCharacterCount * (rows + 0.5), props.content.length, 'start')
  } else if (props.direction === 'end') {
    ellipsis.leading = tailorContent(0, rowCharacterCount * (rows + 0.5), 'end')
    ellipsis.tailing = ''
  } else {
    const start = props.content.length - rowCharacterCount * (rows + 0.5) - 5
    ellipsis.leading = ''
    ellipsis.tailing = tailorContent(start, props.content.length, 'start')
  }

  assignContent()
  setTimeout(() => {
    verifyEllipsis()
  }, 100)
}

async function verifyEllipsis() {
  const node = await getNodeRect(`#${contentMeasureId}`)

  if (!node.height || node.height <= maxHeight) return

  if (props.direction === 'end') {
    ellipsis.leading = ellipsis.leading?.slice(0, -1)
  } else {
    ellipsis.tailing = ellipsis.tailing?.slice(1)
  }

  assignContent()

  if ((ellipsis.leading && ellipsis.leading.length > 0) || (ellipsis.tailing && ellipsis.tailing.length > 0)) {
    setTimeout(() => {
      verifyEllipsis()
    }, 100)
  }
}

function assignContent() {
  contentCopy.value = `${ellipsis.leading || ''}${ellipsis.leading ? props.symbol : ''}${props.expandText || ''}${
    ellipsis.tailing ? props.symbol : ''
  }${ellipsis.tailing || ''}`
}

function tailorContent(left: number, right: number, type: 'start' | 'end') {
  const direction = props.direction === 'middle' ? type : props.direction
  const contentWidth = pxToNumber(widthRef.value) * normalizeRows() - symbolTextWidth
  const contentPartWidth = props.direction === 'middle' ? contentWidth / 2 : contentWidth
  const start = clampIndex(left)
  const end = clampIndex(right)
  let widthPart = -1
  let marking = direction === 'end' ? start : end
  let cutoff = direction === 'end' ? end : start

  while (widthPart < contentPartWidth && marking >= 0 && marking < props.content.length) {
    widthPart += getCharacterWidth(props.content[marking])
    cutoff = marking
    direction === 'end' ? marking++ : marking--
  }

  if (direction === 'end') {
    return props.content.slice(0, cutoff)
  }

  return props.content.slice(cutoff, end)
}

function getCharacterWidth(char = '') {
  if (chineseReg.test(char)) return widthBase[0]
  if (letterUpperReg.test(char)) return widthBase[1]
  if (letterLowerReg.test(char)) return widthBase[2]
  if (digitReg.test(char)) return widthBase[3]
  return widthBase[4]
}

function normalizeRows() {
  const rows = Number(props.rows)
  return Number.isFinite(rows) && rows > 0 ? rows : 1
}

function pxToNumber(value: string | number | undefined | null) {
  if (typeof value === 'number') return value
  if (!value) return 0
  const match = String(value).match(/^\d*(\.\d*)?/)
  return match ? Number(match[0]) : 0
}

function clampIndex(value: number) {
  return Math.max(0, Math.min(Math.floor(value), props.content.length))
}

function resetState() {
  state.exceeded = false
  state.expanded = false
  ellipsis.leading = ''
  ellipsis.tailing = ''
  contentCopy.value = props.content
}

function handleToggle(expanded: boolean) {
  state.expanded = expanded
  emit('change', expanded ? 'expand' : 'collapse')
}

function handleClick() {
  emit('click')
}

function getUniApi() {
  return (
    globalThis as typeof globalThis & {
      uni?: {
        createSelectorQuery?: () => SelectorQuery & {
          in?: (component: ComponentInternalInstance | null) => SelectorQuery
        }
      }
    }
  ).uni
}

function createSelectorQuery() {
  const query = getUniApi()?.createSelectorQuery?.()
  return query?.in?.(instance as ComponentInternalInstance) ?? query
}

function getNodeFields(selector: string, computedStyle: string[]) {
  return new Promise<SelectorNodeInfo>((resolve) => {
    const query = createSelectorQuery()

    if (!query) {
      resolve({})
      return
    }

    query
      .select(selector)
      .fields({ computedStyle, size: true }, (res) => {
        resolve(res || {})
      })
      .exec()
  })
}

function getNodeRect(selector: string) {
  return new Promise<SelectorNodeInfo>((resolve) => {
    const query = createSelectorQuery()

    if (!query) {
      resolve({})
      return
    }

    query
      .select(selector)
      .boundingClientRect((res) => {
        resolve(res || {})
      })
      .exec()
  })
}
</script>

<style lang="scss">
@import './index.scss';
</style>
