<template>
<img :src="src" :alt="alt" class="weui-media-appmsg-thumb">
</template>

<script>
export default {
  props: {
    /**
     * 应用于图片的src
     */
    src: {
      type: String,
      required: true
    },

    /**
     * 应用于图片的alt
     */
    alt: {
      type: String,
      required: false
    }
  }
}
</script>
