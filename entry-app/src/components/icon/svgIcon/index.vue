<template>
  <svg :class="svgClass" aria-hidden="true"><use :xlink:href="svgName"></use></svg>
</template>

<script>
export default {
  name: 'svg-icon',
  props: {
    iconName: {
      type: String,
      required: true,
    },
    className: {
      type: String,
    },
  },
  computed: {
    svgName() {
      return `#icon-${this.iconName}`;
    },
    svgClass() {
      return this.className ? `svg-icon ${this.className}` : 'svg-icon';
    },
  },
};
</script>

<style scoped>
.svg-icon {
  width: 2em;
  height: 2em;
  fill: currentColor;
  overflow: hidden;
}
</style>
