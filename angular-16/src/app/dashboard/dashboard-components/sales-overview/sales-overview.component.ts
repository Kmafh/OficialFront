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
  selector: "app-sales-overview",
  standalone: true,
  imports: [NgApexchartsModule, DemoMaterialModule],
  templateUrl: "./sales-overview.component.html"
})
export class SalesOverviewComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent = Object.create(null);
  public chartOptions: Partial<ChartOptions>;
  incomes:Income[] = []
  incomesActive:Income[] = []
  cantIng:Number[] = [];
  cantGast:Number[] = [];
  cantSaving:Number[] = [];

  constructor( private incomeService:IncomeService, private utilsService: UtilsService) {
    this.chartOptions = {
      series: [
        {
          name: "Ingresos",
          data: [ ],
        },
        {
          name: "Gastos",
          data: [ ],
        },
        {
          name: "Ahorro",
          data: [ ],
        },
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
        categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      },

      legend: {
        show: false,
      },
      fill: {
        colors: ["#209287", "#005562",  "#b9f2a1"],
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
          data: [this.cantIng[0], this.cantIng[1], this.cantIng[2], this.cantIng[3], this.cantIng[4], this.cantIng[5], this.cantIng[6], this.cantIng[7], this.cantIng[8],
          this.cantIng[9], this.cantIng[10], this.cantIng[11]],
        },
        {
          name: "Gastos",
          data: [this.cantGast[0], this.cantGast[1], this.cantGast[2], this.cantGast[3], this.cantGast[4], this.cantGast[5], this.cantGast[6], this.cantGast[7], this.cantGast[8],
          this.cantGast[9], this.cantGast[10], this.cantGast[11]],
        },
        {
          name: "Ahorro",
          data: [this.cantSaving[0], this.cantSaving[1], this.cantSaving[2], this.cantSaving[3], this.cantSaving[4], this.cantSaving[5], this.cantSaving[6], this.cantSaving[7], this.cantSaving[8],
          this.cantSaving[9], this.cantSaving[10], this.cantSaving[11]]
        },
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
        categories: ["Ene","Feb", "Mar", "Apr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      },

      legend: {
        show: false,
      },
      fill: {
        colors: ["#209287", "#005562",  "#b9f2a1"],
        opacity: 1,
      },
      tooltip: {
        theme: "dark",
      },
    };
  }
  getIncomes() {
   
    return this.incomeService.getIncomesByUID().subscribe((resp:any) => {
      this.incomes = resp.incomes as Income[],
      this.incomes.forEach( income => {
        if(income.active === true) {
          this.incomesActive.push(income);
        }
      })
      this.cantIng=this.getTotalArray('income');
      this.cantGast=this.getTotalArray('bill');
      this.cantSaving=this.getTotalArray('saving');
      
      this.nuevo();
      })
  }
  getIncomesMes(mes:number, type:any):Number {
    let date;
    let today = new Date();
    let meses;
    let cant = 0
    let incomesMes:Income[] = []

    this.incomesActive.forEach( income => {
        date = new Date(income.createAt);
        meses = date.getMonth();
        if(meses === mes && date.getFullYear() === today.getFullYear()) {
          incomesMes.push(income);
        }
    })
    incomesMes.forEach( income => {
      if(income.tipe === type || (income.tipe === 'pro' && type === 'bill')) {
        cant = cant + income.cant
      } 
    })
    return cant
  }

  getTotalArray(tipe:any):Number[] {
    let cantArray: Number[] = []
    let cont;

    for(cont =0; cont <= 11; cont++ ){
        cantArray[cont] = this.getIncomesMes(cont, tipe)
    }
    return cantArray
  }
  
}
