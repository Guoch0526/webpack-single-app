<template>
<a href="link || 'javascript:;'" v-link="routerLink" class="weui-tabbar-item" :class="{'weui-bar-item-on': isOn}">
  <div class="weui-tabbar-icon">
    <slot name="icon"></slot>
  </div>
  <div class="weui-tabbar-label">
    <slot name="label"></slot>
  </div>
</a>
</template>

<script>
export default {
  props: {
    /**
     * 跳转链接
     */
    link: {
      type: String,
      required: false
    },

    /**
     * vue-router使用的跳转链接
     * 若使用vue-router，推荐使用router-link而非link
     */
    routerLink: {
      type: null,
      required: false
    },

    /**
     * 是否被选中的标识
     */
    isOn: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
