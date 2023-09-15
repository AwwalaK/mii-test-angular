import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-content2',
  templateUrl: './content2.component.html',
  styleUrls: ['./content2.component.css']
})
export class Content2Component {
  chart: any;

  ngOnInit(): void {
    this.createDummyChart();
  }

  createDummyChart() {
    const ctx = document.getElementById('dummyChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Data 1', 'Data 2', 'Data 3', 'Data 4', 'Data 5'],
        datasets: [{
          label: 'Dummy Chart',
          data: [10, 20, 15, 30, 25],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}