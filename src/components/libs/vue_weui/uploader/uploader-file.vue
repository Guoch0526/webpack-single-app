<template>
<li :class="{'weui-uploader-file': true, 'weui-uploader-status': hasStatus}" :style="{'backgroundImage': 'url(' + imageUrl + ')'}">
  <div class="weui-uploader-status-content">
    <slot name="status"></slot>
  </div>
</li>
</template>

<script>
export default {
  props: {
    /**
     * 预览图的url，将被用于backgroud-image中
     */
    imageUrl: {
      type: String,
      required: true
    },

    /**
     * 是否包含status
     * 若包含，则预览图片上会添加黑色蒙层
     */
    hasStatus: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
