import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import type { IslandTransitionName } from '../island-transition'

export type IslandPopupPosition = 'center' | 'top' | 'right' | 'bottom' | 'left'
export type IslandPopupCloseIconPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
export type IslandPopupTransitionName = IslandTransitionName | ''

export const islandPopupProps = {
  visible: {
    type: Boolean,
    default: false
  },
  position: {
    type: String as PropType<IslandPopupPosition>,
    default: 'center'
  },
  zIndex: {
    type: Number,
    default: 10000
  },
  duration: {
    type: Number,
    default: 300
  },
  transition: {
    type: String as PropType<IslandPopupTransitionName>,
    default: ''
  },
  overlay: {
    type: Boolean,
    default: true
  },
  overlayClass: {
    type: String,
    default: ''
  },
  overlayStyle: {
    type: Object as PropType<CSSProperties>,
    default: undefined
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true
  },
  destroyOnClose: {
    type: Boolean,
    default: false
  },
  round: {
    type: Boolean,
    default: false
  },
  closeable: {
    type: Boolean,
    default: false
  },
  closeIconPosition: {
    type: String as PropType<IslandPopupCloseIconPosition>,
    default: 'top-right'
  },
  safeAreaInsetTop: {
    type: Boolean,
    default: true
  },
  safeAreaInsetBottom: {
    type: Boolean,
    default: false
  },
  popClass: {
    type: String,
    default: ''
  },
  customStyle: {
    type: Object as PropType<CSSProperties>,
    default: undefined
  }
}

export type IslandPopupProps = ExtractPropTypes<typeof islandPopupProps>
