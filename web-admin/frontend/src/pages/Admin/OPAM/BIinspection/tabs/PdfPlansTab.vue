<template>
  <v-row>
    <v-col cols="12" md="4">
      <div class="text-overline text-grey-darken-1 mb-2">Available Documents</div>
      <v-list class="bg-transparent pa-0">
        <v-list-item
          v-for="(plan, index) in plans"
          :key="index"
          @click="selectPlan(index)"
          rounded="lg"
          :active="selectedPlan === index"
          active-color="primary"
          class="mb-2 border bg-white"
        >
          <template #prepend>
            <v-icon :color="selectedPlan === index ? 'primary' : 'grey'">
              mdi-file-pdf-box
            </v-icon>
          </template>
          <v-list-item-title class="font-weight-bold text-body-2">
            {{ plan.name }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-caption font-weight-bold">
            {{ plan.date }}
          </v-list-item-subtitle>
          <template #append>
            <v-chip size="x-small" color="success" variant="tonal" class="ml-2">
              Approved
            </v-chip>
          </template>
        </v-list-item>
      </v-list>
    </v-col>
    <v-col cols="12" md="8">
      <v-card
        v-if="selectedPlan !== null"
        class="rounded-lg border overflow-hidden"
        height="600"
        flat
      >
        <iframe
          :src="plans[selectedPlan].pdfUrl + '#toolbar=0'"
          width="100%"
          height="100%"
          style="border: none"
        ></iframe>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

interface PdfPlan {
  name: string;
  date: string;
  pdfUrl: string;
}

const props = defineProps<{
  plans: PdfPlan[];
  modelValue?: number | null;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: number | null): void;
}>();

const selectedPlan = ref<number | null>(props.modelValue ?? 0);

watch(
  () => props.modelValue,
  (val) => {
    selectedPlan.value = val ?? 0;
  }
);

const selectPlan = (index: number) => {
  selectedPlan.value = index;
  emit("update:modelValue", index);
};
</script>

<style scoped></style>
