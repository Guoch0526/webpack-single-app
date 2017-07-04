<template>
<div :class="'weui-dialog-' + type">
  <div class="weui-mask"></div>
  <div class="weui-dialog">
    <div class="weui-dialog-hd">
      <div class="weui-dialog-title">{{title}}</div>
    </div>
    <div class="weui-dialog-bd"><slot></slot></div>
    <div class="weui-dialog-ft">
      <a v-if="type === 'confirm'" href="javascript:;" class="weui-btn-dialog default" @click="dispathEventAndClose('weui-dialog-cancel')">{{cancelButton}}</a>
      <a href="javascript:;" class="weui-btn-dialog primary" @click="dispathEventAndClose('weui-dialog-confirm')">{{confirmButton}}</a>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    /**
     * 对话框类型
     * alert: 提示框，只包含确定按钮（默认）
     * confirm: 询问框，包含确定和取消按钮
     */
    type: {
      type: String,
      required: false,
      default: 'alert'
    },

    /**
     * 对话框标题
     */
    title: {
      type: String,
      required: true
    },

    /**
     * 确定按钮名称
     */
    confirmButton: {
      type: String,
      required: false,
      default: '确定'
    },

    /**
     * 取消按钮名称
     */
    cancelButton: {
      type: String,
      required: false,
      default: '取消'
    }

  },

  methods: {
    dispathEventAndClose (event) {
      this.$dispatch(event)
    }
  }
}
</script>
