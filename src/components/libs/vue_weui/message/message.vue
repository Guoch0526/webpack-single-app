<template>
<div class="weui-msg">
  <div class="weui-icon-area" v-if="icon">
    <i :class="['weui-icon-msg', 'weui-icon-' + icon]"></i>
  </div>
  <div class="weui-text-area">
    <h2 class="weui-msg-title" v-if="title">{{title}}</h2>
    <div class="weui-msg-desc"><slot name="content"></slot></div>
  </div>
  <div class="weui-opr-area">
    <slot name="operation"></slot>
  </div>
  <div class="weui-extra-area">
    <slot name="extra"></slot>
  </div>
</div>
</template>

<script>
export default {
  props: {
    /**
     * 消息图标名称
     * 若设置，则会在最上方显示大图标
     */
    icon: {
      type: String,
      required: false
    },

    /**
     * 消息标题
     */
    title: {
      type: String,
      required: false
    }
  }
}
</script>
