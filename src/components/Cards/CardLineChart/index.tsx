'use client';

import React from 'react';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';
import { DonationOptionsProps } from '@/types/donations';
import { generateRandomColor } from '@/utils/utils';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

// Register the required components
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

declare global {
  interface Window {
    myLine: Chart;
  }
}

function generateRandomNumbers(count: number, min = 0, max = 100) {
  const numbers = [];
  for (let i = 0; i < count; i++) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    numbers.push(randomNumber);
  }
  return numbers;
}

export default function CardLineChart() {
  const store = useSelector((state: RootState) => state.donations);

  React.useEffect(() => {
    // Ensure donationOptions is defined and is an array
    const donationOptions = store.donationOptions || [];

    const config = {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: donationOptions.map((option) => {
          const color = generateRandomColor();
          const data = generateRandomNumbers(7, 100, 800);

          console.log('option #@', option);
          return {
            label: option.name,
            backgroundColor: color,
            borderColor: color,
            data,
            fill: false,
          };
        }),
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: 'black', // Font color for legend labels
            },
            align: 'end',
            position: 'bottom',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          },
        },
        scales: {
          x: {
            ticks: {
              color: 'rgba(36, 22, 22, 0.7)', // Font color for x-axis ticks
            },
            display: true,
            title: {
              display: true,
              text: 'Month',
              color: 'black', // Font color for x-axis title
            },
            grid: {
              display: false,
              borderDash: [2],
              borderDashOffset: 2,
              color: 'rgba(33, 37, 41, 0.3)',
              zeroLineColor: 'rgba(0, 0, 0, 0)',
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: 2,
            },
          },
          y: {
            ticks: {
              color: 'rgba(36, 22, 22, 0.7)', // Font color for y-axis ticks
            },
            display: true,
            title: {
              display: true,
              text: 'No. of donations',
              color: 'black', // Font color for y-axis title
            },
            grid: {
              borderDash: [3],
              borderDashOffset: 3,
              drawBorder: true,
              color: 'rgba(255, 255, 255, 0.15)',
              zeroLineColor: 'rgba(33, 37, 41, 0)',
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: 2,
            },
          },
        },
      },
    };

    const canvas = document.getElementById('line-chart') as HTMLCanvasElement | null;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        window.myLine = new Chart(ctx, config);
      }
    }

    // Cleanup on unmount
    return () => {
      if (window.myLine) {
        window.myLine.destroy();
      }
    };
  }, [store.donationOptions]); // Add store.donationOptions as a dependency

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
      <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">Overview</h6>
            <h2 className="text-black text-xl font-semibold">Donations value</h2>
          </div>
        </div>
      </div>
      <div className="p-4 flex-auto">
        {/* Chart */}
        <div className="relative h-64">
          <canvas id="line-chart"></canvas>
        </div>
      </div>
    </div>
  );
}