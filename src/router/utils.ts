import { NIcon } from 'naive-ui';
import { h } from 'vue';

import type { Component } from 'vue';

export function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
