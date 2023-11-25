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
import { Subscription } from "rxjs";
import { DemoMaterialModule } from "src/app/demo-material-module";
import { Income } from "src/app/models/income";
import { Movement } from "src/app/models/movement";
import { Project } from "src/app/models/project";
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
  selector: 'app-grafico-pro',
  templateUrl: './grafico-pro.component.html',
  styleUrls: ['./grafico-pro.component.scss']
  
})
export class GraficoProComponent {
  @ViewChild("visitor-chart") chart2: ChartComponent = Object.create(null);
  public VisitorChartOptions: Partial<VisitorChartOptions> = {
      
  };
  incomes:Income[] = []
  movs:Movement[] = [];
  incomesFilter:Income[] = []
 
  pro:Project = new Project()
  
  private proyectoSubscription!: Subscription;
  constructor(private incomeService:IncomeService, private utilsService: UtilsService) {
  }
  ngOnInit(): void { 
    this.proyectoSubscription = this.utilsService.proyectoObservable.subscribe(() => {
      this.getPro();
       this.getMovs().then((resp) => {
        this.movs = resp as Movement[] 
      })
    });
    this.VisitorChartOptions = {
      series: [this.pro.cantObjetivo, this.pro.actual],
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
      labels: ["Pendiente", "Logrado",],
      colors: ["#005562", "#209287",],
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
    this.getPro()
  }
  ngOnDestroy(): void {
    this.proyectoSubscription.unsubscribe();
  }
  nuevo() {
    this.utilsService.proyecto ?this.pro = this.utilsService.proyecto:null;//Borrar
    this.VisitorChartOptions = {
      series: [this.pro.actual, this.pro.cantObjetivo, ],
      chart: {
        type: "donut",
        fontFamily: "Poppins,sans-serif",
        height: 200,
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
      labels: ["Logrado", "Pendiente",],
      colors: ["#209287", "#f3f6f6",],
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
  }
  async getPro() {
    try {
      this.utilsService.proyecto ?this.pro = this.utilsService.proyecto:null;
      this.nuevo();
    } catch (error) {
      console.error(error);
    }
  }

  isExpanded = false;

  toggleExpansion() {
    this.isExpanded = !this.isExpanded;
  }

  async getMovs() {
    try {
      
      const resp = await this.utilsService.getMov(this.pro.id?this.pro.id:0);
       return resp;
    } catch (error) {
      console.error(error);
      return error
    }
  }
}
