<template>
  <v-card class="elevation-1" :style="tableCardStyle">
    <v-table class="custom-data-table">
      <thead>
        <tr>
          <th
            v-for="header in headers"
            :key="header.key"
            class="text-left"
            :style="[tableHeaderStyle, header.width ? { width: header.width } : {}]"
          >
            {{ header.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="itemKey ? item[itemKey] : index">
          <td
            v-for="header in headers"
            :key="header.key"
            class="text-left"
            :class="header.cellClass"
          >
            <!-- Use slot for custom cell rendering -->
            <slot :name="`cell-${header.key}`" :item="item" :value="item[header.key]">
              {{ item[header.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </v-table>
    <div v-if="!items.length" class="text-center pa-4 text-medium-emphasis">
      {{ emptyMessage }}
    </div>
  </v-card>
</template>

<script setup>
defineProps({
  headers: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  itemKey: {
    type: String,
    default: null,
  },
  emptyMessage: {
    type: String,
    default: "No data found.",
  },
});

const tableCardStyle = {
  borderRadius: "12px",
  overflow: "hidden",
};

const tableHeaderStyle = {
  background: "#f8fafc",
  color: "#334155",
  fontSize: "12px",
  fontWeight: 700,
  textTransform: "uppercase",
};
</script>

<style scoped>
.custom-data-table tr:hover {
  background-color: #f5f5f5 !important;
}

.custom-data-table tr td {
  border-bottom: 1px solid #e5e7eb;
}
</style>
