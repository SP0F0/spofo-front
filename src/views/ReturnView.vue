<script setup lang="ts">
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const data = {
    labels: ["8월 1주", "8월 2주", "8월 3주", "8월 4주", "9월 1주", "9월 2주", "9월 3주", "9월 4주", "10월 1주", "10월 2주", "10월 3주", "10월 4주", "11월 1주"],
    datasets: [
        {
            data: [4, -5, 9, 14, 18, 11, 16, 5, 14, 9, 4, -2, 10],
            label: "포트폴리오",
            borderColor: "#120064",
            fill: false
        }
    ]
}

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        }, title: {
            display: true,
            text: '전체 포트폴리오 누적 수익률',
            color: '#120064',
            font: {
                weight: 'bold',
                size: 25
            }
        }
    }, scales: {
            x: {
                grid: {
                    display: false
                }
            }, y: {
                grid: {
                    display: false
                }
            }
        }
}
</script>

<template>
    <Line :data="data" :options="options" />
</template>