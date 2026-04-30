import type { ExtractPropTypes } from 'vue'

export const animateModalProps = {
  visible: {
    type: Boolean,
    default: false
  },
  keepMaskOnLeave: {
    type: Boolean,
    default: false
  },
  showClose: {
    type: Boolean,
    default: true
  },
  zIndex: {
    type: Number,
    default: 9999
  }
}

export type AnimateModalProps = ExtractPropTypes<typeof animateModalProps>
