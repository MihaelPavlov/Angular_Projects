import {Component, Input, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {
  DoughnutAnimationOptions,
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart, DatasetController, DoughnutController, Legend, Animations,
  LinearScale, LineController, LineElement,
  PieController, PointElement, Title,
  Tooltip, TooltipItem
} from "chart.js";

@Component({
  selector: "crypto-doughnut-chart",
  templateUrl: "crypto-doughnut-chart.component.html",
  styleUrls: ["crypto-doughnut-chart.component.css"]
})
export class CryptoDoughnutChartComponent implements OnInit, OnDestroy {
  @Input('chartName') chartName!: string
  @Input('data') data: any
  @ViewChild(`canvas`) canvasElement!: HTMLCanvasElement;
  public chart: any;

  constructor() {
    Chart.register( Tooltip, Title, DoughnutController, ArcElement,Legend);
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  ngOnInit(): void {
    this.chart = new Chart('chart', {
      type: 'doughnut',
      data: this.data,
      options: {
        animation: { duration: 1000 },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip:{
            yAlign: 'top',
            xAlign: 'center',
            position: 'nearest',
            displayColors: false,
            axis: 'x',
          },
          legend: {
            display:true,
            position: 'bottom',
            align:'center',
            labels:{
              boxWidth:20,
              padding:15.0,
            }
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
