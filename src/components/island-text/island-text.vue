<template>
  <view
    :class="['text-wrapper', { 'one-line': props.lineCount === 1, 'multiple-rows': props.lineCount > 1 }]"
    :style="textWrapperStyle"
  >
    <slot v-if="$slots.inner" name="inner"></slot>
    <slot v-else>
      <text v-if="props.text">{{ props.text }}</text>
    </slot>
  </view>
</template>
<script lang="ts">
export default {
  name: 'IslandText'
}
</script>
<script lang="ts" setup>
import { computed } from 'vue'
import { islandTextProps } from './types';

const props = defineProps(islandTextProps)

const textWrapperStyle = computed(() => ({
  color: props.isActive ? props.activeColor || props.color : props.color,
  fontWeight: props.weight,
  fontSize: `${props.size}px`,
  WebkitLineClamp: props.lineCount > 0 ? props.lineCount : 'unset',
}))
</script>

<style lang="scss">
@import './index.scss';
</style>
