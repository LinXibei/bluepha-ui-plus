<template>
  <button
    ref="_ref"
    :class="[
      // ns.b(),
      // ns.m(_type),
      // ns.m(_size),
      // ns.is('disabled', _disabled),
      // ns.is('loading', loading),
      // ns.is('plain', plain),
      // ns.is('round', round),
      // ns.is('circle', circle),
      // ns.is('text', text),
      // ns.is('link', link),
      // ns.is('has-bg', bg),
    ]"
    :aria-disabled="_disabled || loading"
    :disabled="_disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :style="buttonStyle"
    @click="handleClick"
  >
    <template v-if="loading">
      <slot v-if="$slots.loading" name="loading" />
      <el-icon v-else :class="ns.is('loading')">
        <component :is="loadingIcon" />
      </el-icon>
    </template>
    <el-icon v-else-if="icon || $slots.icon">
      <component :is="icon" v-if="icon" />
      <slot v-else name="icon" />
    </el-icon>
    <span
      v-if="$slots.default"
      :class="{ [ns.em('text', 'expand')]: shouldAddSpace }"
    >
      <slot />
    </span>
  </button>
</template>
<script lang="ts" setup>

</script>