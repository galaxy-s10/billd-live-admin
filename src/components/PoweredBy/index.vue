<template>
  <div class="powered-by">
    <span>Powered by</span>
    <span class="author">
      <a
        :href="GITHUB_REPO"
        target="_blank"
      >
        galaxy-s10
      </a>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { GITHUB_REPO } from '@/constant';
</script>

<style lang="scss" scoped>
.powered-by {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 40px;
  background-color: rgba($color: $theme-color-gold, $alpha: 0.1);
  color: $theme-color-gold;
  text-align: center;
  line-height: 40px;

  user-select: none;
  .author {
    margin-left: 10px;
    font-weight: bold;
    a {
      color: inherit;
      text-decoration: none;
    }
  }
}
</style>
