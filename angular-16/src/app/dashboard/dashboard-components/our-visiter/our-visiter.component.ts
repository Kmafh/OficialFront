import { Component, ViewChild } from "@angular/core";
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexTooltip,
  ApexNonAxisChartSeries,
  ApexResponsive,
  NgApexchartsModule,
} from "ng-apexcharts";
import { DemoMaterialModule } from "src/app/demo-material-module";
import { Income } from "src/app/models/income";
import { IncomeService } from "src/app/services/income.service";
import { UtilsService } from "src/app/services/utils.service";

export interface VisitorChartOptions {
  series: ApexNonAxisChartSeries | any;
  chart: ApexChart | any;
  responsive: ApexResponsive[] | any;
  labels: any;
  tooltip: ApexTooltip | any;
  legend: ApexLegend | any;
  colors: string[] | any;
  stroke: any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
}

@Component({
  selector: "app-our-visiter",
  standalone: true,
  imports: [NgApexchartsModule, DemoMaterialModule],
  templateUrl: "./our-visiter.component.html"
})
export class OurVisiterComponent {
  @ViewChild("visitor-chart") chart2: ChartComponent = Object.create(null);
  public VisitorChartOptions: Partial<VisitorChartOptions> = {
      
  };
  incomes:Income[] = []
  incomesFilter:Income[] = []
  cantIng:number = 0;
  cantGast:number = 0;
  balance:number = 0;
  cantAhor:number = 0;
  constructor(private incomeService:IncomeService, private utilsService: UtilsService) {
  }
  ngOnInit(): void { 
    this.VisitorChartOptions = {
      series: [0, 0, 0],
      chart: {
        type: "donut",
        fontFamily: "Poppins,sans-serif",
        height: 253,
      },
      plotOptions: {
        pie: {
          donut: {
            size: "80px",
          },
        },
      },
      tooltip: {
        fillSeriesColor: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 0,
      },
      legend: {
        show: false,
      },
      labels: ["Gastos", "Disponible", "otros", ],
      colors: ["#005562", "#209287", "#b9f2a1",],
      responsive: [
        {
          breakpoint: 767,
          options: {
            chart: {
              width: 200,
            },
          },
        },
      ],
    };
    this.getIncomes()
  }
  
  nuevo() {
    this.VisitorChartOptions = {
      series: [this.cantGast, this.cantAhor,this.balance, ],
      chart: {
        type: "donut",
        fontFamily: "Poppins,sans-serif",
        height: 253,
      },
      plotOptions: {
        pie: {
          donut: {
            size: "80px",
          },
        },
      },
      tooltip: {
        fillSeriesColor: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 0,
      },
      legend: {
        show: false,
      },
      labels: ["Gastos", "Ahorro","Disponible",  ],
      colors: ["#005562", "#b9f2a1", "#209287", ],
      responsive: [
        {
          breakpoint: 767,
          options: {
            chart: {
              width: 300,
            },
          },
        },
      ],
    };
  }
  async getIncomes() {
    try {
      const today = new Date()
      const resp = await this.utilsService.getIncomesMes(today.getMonth());
      this.cantIng = resp[1];
      this.cantGast = resp[2];
      this.cantAhor = resp[3];
      this.balance = this.cantIng - this.cantGast -this.cantAhor;
      this.nuevo();
    } catch (error) {
      console.error(error);
    }
  }
}
