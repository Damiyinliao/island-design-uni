import type { ExtractPropTypes, PropType } from 'vue'

export const islandModalProps = {
  title: {
    type: String,
    default: ''
  },
  visible: {
    type: Boolean,
    default: false
  },
  showCancel: {
    type: Boolean,
    default: true
  },
  showConfirm: {
    type: Boolean,
    default: true
  },
  confirmLabel: {
    type: String,
    default: 'Confirm'
  },
  cancelLabel: {
    type: String,
    default: 'Cancel'
  },
  width: {
    type: [String, Number] as PropType<string | number>,
    default: '80%'
  }
}

export type IslandModalProps = ExtractPropTypes<typeof islandModalProps>
