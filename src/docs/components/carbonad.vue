<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Values
const container = ref<HTMLDivElement | null>(null)
const code = 'CWYDT23U'
const placement = 'slimselectjscom'
let hasInitalized = false

// no need to account for option changes during dev, we can just
// refresh the page
onMounted(() => {
  if (!hasInitalized) {
    hasInitalized = true

    const s = document.createElement('script')
    s.id = '_carbonads_js'
    s.src = `//cdn.carbonads.com/carbon.js?serve=${code}&placement=${placement}`
    s.async = true

    // Add the script to the container ref element
    if (container.value) {
      container.value.appendChild(s)
    }
  }
})
</script>

<style lang="scss">
.carbon-container {
  #carbonads * {
    margin: initial;
    padding: initial;
  }
  #carbonads {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue',
      Helvetica, Arial, sans-serif;
  }
  #carbonads {
    display: flex;
    max-width: 100%;
    background-color: var(--color-ads-background);
    box-shadow: none;
    z-index: 100;
  }
  #carbonads a {
    color: inherit;
    text-decoration: none;
  }
  #carbonads a:hover {
    color: inherit;
  }
  #carbonads span {
    position: relative;
    display: block;
    overflow: hidden;
  }
  #carbonads .carbon-wrap {
    display: flex;
    flex-direction: column;
  }
  #carbonads .carbon-img {
    display: block;
    margin-bottom: 0;
    line-height: 1;
  }
  #carbonads .carbon-img img {
    display: block;
  }
  #carbonads .carbon-text {
    font-size: 12px;
    padding: var(--spacing-quarter);
    margin-bottom: 16px;
    line-height: 1.5;
    text-align: left;
  }
  #carbonads .carbon-poweredby {
    display: block;
    padding: var(--spacing-quarter);
    background: #f1f1f2;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
    font-size: 8px;
    line-height: 1;
    border-top-left-radius: 3px;
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>

<template>
  <div class="carbon-container" ref="container" />
</template>
