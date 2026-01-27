<template>
  <div :style="cardStyle" role="button" @click="$emit('click')">
    <div :style="labelStyle">{{ label }}</div>
    <div :style="valueGroupStyle">
      <div :style="valueStyle">{{ value }}</div>
      <v-icon :style="iconStyle" :color="iconColor">{{ icon }}</v-icon>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: [Number, String],
    required: true,
  },
  icon: {
    type: String,
    default: "mdi-chart-box",
  },
  iconColor: {
    type: String,
    default: "#3b82f6",
  },
});

defineEmits(["click"]);

const cardStyle = {
  background: "#fff",
  borderRadius: "8px",
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  padding: "16px",
  minHeight: "100px",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "transform 0.1s ease-in-out",
};

const labelStyle = {
  fontSize: "15px",
  color: "#475467",
  fontWeight: 500,
  marginBottom: "8px",
};

const valueGroupStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
};

const valueStyle = {
  fontSize: "36px",
  color: "#111827",
  fontWeight: 800,
  lineHeight: 1,
};

const iconStyle = {
  fontSize: "40px",
  lineHeight: 1,
};
</script>
