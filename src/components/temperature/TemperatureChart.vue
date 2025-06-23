<template>
  <div v-if="temperatures" class="bg-white rounded-lg shadow-md p-4 mb-6">
    <h2 class="text-lg font-semibold mb-4">Graphique des températures</h2>
    <div class="chart-container relative h-80">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import Chart from "chart.js/auto";

const props = defineProps({
  temperatures: {
    type: Array,
    required: true,
  },
  minTemp: {
    type: Number,
    required: true,
  },
  maxTemp: {
    type: Number,
    required: true,
  },
  period: {
    type: String,
    required: true,
  },
});

const chartCanvas = ref(null);
let chartInstance = null;

const timeFormatOptions = computed(() => {
  switch (props.period) {
    case "week":
      return {
        weekday: "short",
        day: "numeric",
        month: "short",
      };
    case "month":
      return {
        day: "numeric",
        month: "short",
      };
    case "year":
      return {
        month: "short",
        year: "numeric",
      };
    default:
      return {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
  }
});

const prepareChartData = () => {
  const labels = props.temperatures.map((temp) =>
    new Date(temp.date_heure).toLocaleTimeString(
      "fr-FR",
      timeFormatOptions.value
    )
  );

  const data = props.temperatures.map((temp) => temp.temperature);

  const backgroundColors = props.temperatures.map((temp) => {
    if (temp.type_alerte) {
      return temp.traitee ? "#F59E0B" : "#EF4444"; // Orange for treated alerts, red for untreated
    }
    return "#3B82F6"; // Blue for normal
  });

  return {
    labels,
    datasets: [
      {
        label: "Température (°C)",
        data,
        backgroundColor: backgroundColors,
        borderColor: "#3B82F6",
        borderWidth: 1,
        tension: 0.1,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };
};

const createChart = () => {
  if (chartInstance) {
    chartInstance.destroy();
  }

  const ctx = chartCanvas.value.getContext("2d");
  const chartData = prepareChartData();

  chartInstance = new Chart(ctx, {
    type: "line",
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
          min: Math.floor(props.minTemp - 10),
          max: Math.ceil(props.maxTemp + 10),
          title: {
            display: true,
            text: "Température (°C)",
          },
        },
        x: {
          title: {
            display: true,
            text: "Date/Heure",
          },
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (context) => {
              const temp = props.temperatures[context.dataIndex];
              let label = `${context.dataset.label}: ${context.raw}°C`;
              if (temp.type_alerte) {
                label += ` (Alerte: ${temp.type_alerte})`;
              }
              return label;
            },
          },
        },
        legend: {
          display: false,
        },
      },
    },
  });
};

onMounted(() => {
  if (props.temperatures.length) {
    createChart();
  }
});

watch(
  () => props.temperatures,
  () => {
    if (props.temperatures.length) {
      createChart();
    }
  },
  { deep: true }
);
</script>

<style>
.chart-container {
  position: relative;
  width: 100%;
}
</style>
