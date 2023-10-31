import {Component, Input, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart, DatasetController, DoughnutController, LegendItem,
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
  @ViewChild(`canvas`) canvasElement!: HTMLCanvasElement;
  public chart: any;

  constructor() {
    Chart.register( Tooltip, Title, DoughnutController, ArcElement);
  }

  ngOnDestroy(): void {
    if (this.chart) {
      console.log('destroyedeeeeed')
      this.chart.destroy();
    }
  }

  ngOnInit(): void {
    this.chart = new Chart('chart', {
      type: 'doughnut',
      data: this.data,
      options: {
        layout: { padding: { left: 0.0, right: 0.0, top: 0.0, bottom: 0.0 } },
        animation: { duration: 0.0 },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display:true,
            position: 'top',
            align:'center',
            reverse:false,
            labels:{
              boxWidth:80,
              padding:50.0,
              useBorderRadius:true,
              // generateLabels(chart: Chart): LegendItem[] {
              //   let items=Chart.defaults.plugins.legend.labels.generateLabels.call(this,chart);
              //   console.log('dsadsadsadsadasdasdaa', items)
              //   items.forEach(item => item.text = (chart.data.labels as string[])[item.index as number] as string);
              //   return items;
              // }
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
