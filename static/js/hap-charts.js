// Paleta e utilitarios de graficos Chart.js para identidade Hapvida
// Requer Chart.js 4.x carregado antes deste arquivo

const HAP_PALETTE = [
    "#FF7A00",
    "#003DA5",
    "#1F9D55",
    "#F0B429",
    "#0B2F7A",
    "#D64545",
    "#7A7A7A",
    "#E56A00",
];

const HAP_CHART_DEFAULTS = {
    font: {
        family: "'Inter', -apple-system, sans-serif",
        size: 12,
        color: "#1A1A1A",
    },
    color: "#4A4A4A",
};

// Aplica defaults globais ao Chart.js
if (typeof Chart !== "undefined") {
    Chart.defaults.font.family = HAP_CHART_DEFAULTS.font.family;
    Chart.defaults.font.size = HAP_CHART_DEFAULTS.font.size;
    Chart.defaults.color = HAP_CHART_DEFAULTS.color;
}

// Opcoes base para qualquer grafico
function hapBaseOptions(overrides = {}) {
    return {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    padding: 20,
                    usePointStyle: true,
                    pointStyleWidth: 10,
                    font: { size: 12, family: "'Inter', sans-serif" },
                },
            },
            tooltip: {
                backgroundColor: "#0B2F7A",
                titleColor: "#FFFFFF",
                bodyColor: "#E5E7EB",
                padding: 12,
                cornerRadius: 8,
                titleFont: { size: 13, weight: "700" },
                bodyFont: { size: 12 },
            },
        },
        scales: {
            x: {
                grid: { display: false },
                border: { color: "#E5E7EB" },
                ticks: { color: "#7A7A7A" },
            },
            y: {
                grid: { color: "#F5F6F8", drawBorder: false },
                border: { color: "#E5E7EB" },
                ticks: { color: "#7A7A7A" },
            },
        },
        ...overrides,
    };
}

// Grafico de linha Hapvida
function hapLineChart(ctx, labels, datasets, options = {}) {
    const styledDatasets = datasets.map((ds, i) => ({
        borderColor: HAP_PALETTE[i % HAP_PALETTE.length],
        backgroundColor: "transparent",
        pointBackgroundColor: HAP_PALETTE[i % HAP_PALETTE.length],
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2,
        tension: 0.3,
        ...ds,
    }));

    return new Chart(ctx, {
        type: "line",
        data: { labels, datasets: styledDatasets },
        options: hapBaseOptions(options),
    });
}

// Grafico de barras Hapvida
function hapBarChart(ctx, labels, datasets, options = {}) {
    const styledDatasets = datasets.map((ds, i) => ({
        backgroundColor: HAP_PALETTE[i % HAP_PALETTE.length],
        borderRadius: 6,
        borderSkipped: false,
        ...ds,
    }));

    return new Chart(ctx, {
        type: "bar",
        data: { labels, datasets: styledDatasets },
        options: hapBaseOptions(options),
    });
}

// Grafico donut Hapvida
function hapDonutChart(ctx, labels, data, options = {}) {
    return new Chart(ctx, {
        type: "doughnut",
        data: {
            labels,
            datasets: [{
                data,
                backgroundColor: HAP_PALETTE.slice(0, data.length),
                borderWidth: 0,
                hoverOffset: 8,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            cutout: "65%",
            plugins: {
                legend: {
                    position: "right",
                    labels: {
                        padding: 16,
                        usePointStyle: true,
                        font: { size: 12, family: "'Inter', sans-serif" },
                    },
                },
                tooltip: {
                    backgroundColor: "#0B2F7A",
                    titleColor: "#FFFFFF",
                    bodyColor: "#E5E7EB",
                    padding: 12,
                    cornerRadius: 8,
                },
            },
            ...options,
        },
    });
}
