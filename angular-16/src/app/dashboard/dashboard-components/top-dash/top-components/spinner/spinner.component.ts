import { Component, OnInit, ViewChild } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexGrid,
  NgApexchartsModule
} from "ng-apexcharts";
import { DemoMaterialModule } from "src/app/demo-material-module";
import { Income } from "src/app/models/income";
import { IncomeService } from "src/app/services/income.service";
import { UtilsService } from "src/app/services/utils.service";

export interface ChartOptions {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  yaxis: ApexYAxis | any;
  xaxis: ApexXAxis | any;
  fill: ApexFill | any;
  tooltip: ApexTooltip | any;
  stroke: ApexStroke | any;
  legend: ApexLegend | any;
  grid: ApexGrid | any;
}

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [NgApexchartsModule, DemoMaterialModule],
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  @ViewChild("chart") chart: ChartComponent = Object.create(null);
  public chartOptions: Partial<ChartOptions>;
  incomes:Income[] = []
  incomesActive:Income[] = []
  cantIng:Number = 0;
  cantGast:Number = 0;
  cantSaving:Number[] = [];

  constructor( private incomeService:IncomeService, private utilsService: UtilsService) {
    this.chartOptions = {
      series: [
        {
          name: "Ingresos",
          data: [this.cantIng],
        }
      ],
      chart: {
        type: "bar",
        fontFamily: "Poppins,sans-serif",
        height: 320,
      },
      grid: {
        borderColor: "rgba(0,0,0,.2)",
        strokeDashArray: 6,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "90%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: ["Ene"],
      },

      legend: {
        show: false,
      },
      fill: {
        colors: ["#209287"],
        opacity: 1,
      },
      tooltip: {
        theme: "dark",
      },
    };
  }

  ngOnInit(): void { 
    this.getIncomes();
    
  }

  nuevo() {
    this.chartOptions = {
      series: [
        {
          name: "Ingresos",
          data: [this.cantIng],
        }
      ],
      chart: {
        type: "bar",
        height: 200,
      },
      grid: {
       
        strokeDashArray: 0,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "90%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: ["Ene"],
      },

      legend: {
        show: true,
      },
      fill: {
        colors: ["#209287","#209287"],
        opacity: 1,
      },
      tooltip: {
        theme: "dark",
      },
    };
  }
  async getIncomes() {
    try {
      const total = await this.utilsService.getIncomes();
      this.cantIng = total[1];
      this.cantGast = total[0];
      this.nuevo()
    } catch (error) {
      console.error(error);
    }
  }
 
  
}
