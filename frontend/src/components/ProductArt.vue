<script setup>
// Simple product illustrations used as placeholder imagery until real photos exist.
defineProps({
  variant: { type: String, required: true }, // tube | jar | pump | perfume | dropper
  body: { type: String, default: '#ffffff' },
  cap: { type: String, default: '#e5e7eb' },
  label: { type: String, default: '#9ca3af' },
})
</script>

<template>
  <svg viewBox="0 0 120 140" role="img" aria-hidden="true">
    <ellipse cx="60" cy="132" rx="34" ry="5" fill="#000" opacity="0.08" />

    <g v-if="variant === 'tube'">
      <rect x="40" y="12" width="40" height="8" rx="2" :fill="cap" />
      <rect x="42" y="18" width="36" height="94" rx="8" :fill="body" />
      <rect x="46" y="110" width="28" height="18" rx="4" :fill="cap" />
      <rect x="50" y="46" width="20" height="3" rx="1.5" :fill="label" />
      <rect x="53" y="54" width="14" height="2" rx="1" :fill="label" opacity="0.6" />
      <rect x="53" y="60" width="14" height="2" rx="1" :fill="label" opacity="0.6" />
      <rect x="46" y="22" width="5" height="84" rx="2.5" fill="#fff" opacity="0.35" />
    </g>

    <g v-else-if="variant === 'jar'">
      <rect x="22" y="58" width="76" height="70" rx="18" :fill="body" />
      <rect x="25" y="38" width="70" height="24" rx="10" :fill="cap" />
      <rect x="44" y="84" width="32" height="4" rx="2" :fill="label" />
      <rect x="50" y="93" width="20" height="2.5" rx="1.25" :fill="label" opacity="0.6" />
      <rect x="28" y="64" width="6" height="56" rx="3" fill="#fff" opacity="0.35" />
    </g>

    <g v-else-if="variant === 'pump'">
      <rect x="50" y="20" width="20" height="14" rx="3" :fill="cap" />
      <rect x="66" y="22" width="24" height="6" rx="3" :fill="cap" />
      <rect x="53" y="32" width="14" height="18" rx="3" :fill="cap" />
      <rect x="32" y="48" width="56" height="80" rx="14" :fill="body" />
      <rect x="48" y="78" width="24" height="3" rx="1.5" :fill="label" />
      <rect x="52" y="86" width="16" height="2" rx="1" :fill="label" opacity="0.6" />
      <rect x="52" y="91" width="16" height="2" rx="1" :fill="label" opacity="0.6" />
      <rect x="37" y="54" width="6" height="66" rx="3" fill="#fff" opacity="0.3" />
    </g>

    <g v-else-if="variant === 'perfume'">
      <rect x="47" y="26" width="26" height="26" rx="4" :fill="cap" />
      <rect x="54" y="48" width="12" height="8" :fill="cap" opacity="0.8" />
      <rect x="30" y="54" width="60" height="74" rx="10" :fill="body" />
      <rect x="42" y="80" width="36" height="22" rx="2" fill="#fff" opacity="0.85" />
      <rect x="48" y="88" width="24" height="2.5" rx="1.25" :fill="label" />
      <rect x="52" y="94" width="16" height="2" rx="1" :fill="label" opacity="0.6" />
      <rect x="35" y="60" width="5" height="62" rx="2.5" fill="#fff" opacity="0.4" />
    </g>

    <g v-else-if="variant === 'dropper'">
      <rect x="52" y="14" width="16" height="26" rx="8" :fill="cap" />
      <rect x="48" y="38" width="24" height="14" rx="2" :fill="cap" />
      <rect x="38" y="50" width="44" height="78" rx="12" :fill="body" />
      <rect x="46" y="80" width="28" height="18" rx="2" fill="#fff" opacity="0.85" />
      <rect x="51" y="87" width="18" height="2.5" rx="1.25" :fill="label" />
      <rect x="42" y="56" width="5" height="66" rx="2.5" fill="#fff" opacity="0.35" />
    </g>
  </svg>
</template>
