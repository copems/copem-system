<template>
  <div class="stepper-container">
    <v-container fluid class="stepper-wrapper">
      <div class="clean-stepper">
        <!-- v-for MUST be on a real element -->
        <div
          v-for="(step, index) in steps"
          :key="step.value"
          class="step-group"
        >
          <!-- Step -->
          <div class="step-wrapper">
            <div
              class="step-circle"
              :class="{
                active: modelValue === step.value,
                completed: modelValue > step.value,
              }"
            >
              <v-icon v-if="modelValue > step.value" size="18">
                mdi-check
              </v-icon>
              <span v-else>{{ index + 1 }}</span>
            </div>

            <div
              class="step-title"
              :class="{
                active: modelValue === step.value,
                completed: modelValue > step.value,
              }"
            >
              {{ step.title }}
            </div>
          </div>

          <!-- Line -->
          <div
            v-if="index < steps.length - 1"
            class="step-line"
            :class="{ completed: modelValue > step.value }"
          />
        </div>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  steps: {
    type: Array,
    required: true,
    validator: (steps) =>
      steps.every((s) => typeof s.title === "string" && s.value !== undefined),
  },
});
</script>

<style scoped>
/* =====================================================
   NO SCROLLBARS – HARD GUARANTEE
===================================================== */
.stepper-container,
.stepper-wrapper,
.clean-stepper {
  overflow: hidden !important;
}

.stepper-container {
}

/* =====================================================
   LAYOUT
===================================================== */
.stepper-wrapper {
  max-width: 1300px;
  margin: auto;
}

.clean-stepper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28px 24px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
}

/* Wrapper for step + line */
.step-group {
  display: flex;
  align-items: center;
  min-width: 0;
}

/* =====================================================
   STEP
===================================================== */
.step-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
}

.step-circle {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 2px solid #cfd4dc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #6b7280;
  background: #ffffff;
  transition: all 0.25s ease;
}

.step-circle.active {
  background: #2563eb;
  border-color: #2563eb;
  color: #ffffff;
}

.step-circle.completed {
  background: #22c55e;
  border-color: #22c55e;
  color: #ffffff;
}

/* =====================================================
   TITLE
===================================================== */
.step-title {
  margin-top: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #9ca3af;
  text-align: center;
  white-space: nowrap;
}

.step-title.active {
  color: #2563eb;
  font-weight: 600;
}

.step-title.completed {
  color: #22c55e;
  font-weight: 600;
}

/* =====================================================
   LINE
===================================================== */
.step-line {
  width: 300px;
  height: 2px;
  background: #cfd4dc;
  margin: 0 12px;
  border-radius: 2px;
  transition: background 0.3s ease;
}

.step-line.completed {
  background: #22c55e;
}

/* =====================================================
   MOBILE
===================================================== */
@media (max-width: 600px) {
  .step-title {
    font-size: 12px;
  }

  .step-circle {
    width: 36px;
    height: 36px;
  }

  .step-line {
    margin: 0 6px;
  }
}
</style>
