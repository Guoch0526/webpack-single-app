<template>
<li class="weui-media-info-meta" :class="{'weui-media-info-meta-extra': extra}"><slot></slot></li>
</template>

<script>
export default {
  props: {
    /**
     * 是否为extra的标识，若是，则文字左方会有竖线隔离符
     */
    extra: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
