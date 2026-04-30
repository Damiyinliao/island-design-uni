import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'

export const islandTransitionNames = [
  'fade',
  'fade-up',
  'fade-down',
  'fade-left',
  'fade-right',
  'slide-up',
  'slide-down',
  'slide-left',
  'slide-right',
  'zoom',
  'none'
] as const

export type IslandTransitionName = (typeof islandTransitionNames)[number]

export type IslandTransitionTimingFunction =
  | 'linear'
  | 'ease'
  | 'ease-in'
  | 'ease-in-out'
  | 'ease-out'
  | 'step-start'
  | 'step-end'

export const islandTransitionProps = {
  name: {
    type: String as PropType<IslandTransitionName>,
    default: 'fade'
  },
  show: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number,
    default: 300
  },
  timingFunction: {
    type: String as PropType<IslandTransitionTimingFunction>,
    default: 'ease'
  },
  destroyOnClose: {
    type: Boolean,
    default: false
  },
  customClass: {
    type: String,
    default: ''
  },
  customStyle: {
    type: Object as PropType<CSSProperties>,
    default: undefined
  },
  enterFromClass: {
    type: String,
    default: ''
  },
  enterActiveClass: {
    type: String,
    default: ''
  },
  enterToClass: {
    type: String,
    default: ''
  },
  leaveFromClass: {
    type: String,
    default: ''
  },
  leaveActiveClass: {
    type: String,
    default: ''
  },
  leaveToClass: {
    type: String,
    default: ''
  }
}

export type IslandTransitionProps = ExtractPropTypes<typeof islandTransitionProps>
