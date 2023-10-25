import {Component, Input, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart, DoughnutController,
  LinearScale, LineController, LineElement,
  PieController, PointElement, Title,
  Tooltip
} from "chart.js";

@Component({
  selector: "crypto-doughnut-chart",
  templateUrl: "crypto-doughnut-chart.component.html",
  styleUrls: ["crypto-doughnut-chart.component.css"]
})
export class CryptoDoughnutChartComponent implements OnInit, OnDestroy {
  @Input('chartName') chartName!: string
  @Input('data') data: any
  @ViewChild('#chart') canvasElement!: HTMLCanvasElement;
  public chart: any;

  constructor() {
    Chart.register(PieController, Tooltip, BarController, LinearScale, CategoryScale, BarElement, LineController, LineElement, PointElement, LinearScale, Title, DoughnutController, ArcElement);
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  ngOnInit(): void {
    this.chart = new Chart("chart", {
      type: 'doughnut',
      data: this.data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: this.chartName
          }
        }
      },

    });
  }
}
