<template>
<div class="weui-search-bar" :class="{'weui-search-focusing': isFocusing || !!value}">
  <div class="weui-search-outer">
    <form class="weui-search-inner" @submit="submit">
      <i class="weui-icon-search"></i>
      <input type="search" class="weui-search-input" id="searchInput" :placeholder="placeholder" required v-model="value" v-el:input @focus="isFocusing = true" @blur="isFocusing = false">
      <a href="javascript:;" class="weui-icon-clear" @click="clearInput"></a>
    </form>
    <label for="searchInput" class="weui-search-text">
      <i class="weui-icon-search"></i>
      <span v-if="!!placeholder">{{placeholder}}</span>
    </label>
  </div>
  <a href="javascript:;" class="weui-search-cancel" v-if="!!cancelText && isFocusing" @click="cancelInput">{{cancelText}}</a>
</div>
</template>

<script>
export default {
  props: {
    /**
     * 标签
     */
    placeholder: {
      type: String,
      required: false
    },

    /**
     * 取消按钮文本，若不设置则无取消按钮
     */
    cancelText: {
      type: String,
      required: false
    },

    /**
     * 双向绑定的搜索框输入内容
     */
    value: {
      type: String,
      required: true,
      twoWay: true
    }
  },

  data () {
    return {
      isFocusing: false
    }
  },

  methods: {
    clearInput () {
      this.value = ''
      this.$els.input.focus()
    },

    cancelInput () {
      this.value = ''
    },

    submit (event) {
      event.preventDefault()
      this.$dispatch('weui-search-bar-submit')
    }
  }
}
</script>
