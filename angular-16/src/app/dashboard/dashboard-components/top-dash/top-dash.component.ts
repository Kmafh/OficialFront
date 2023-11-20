import { Component, OnInit, ViewChild } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Income } from 'src/app/models/income';
import { IncomeService } from 'src/app/services/income.service';
import { CurrencyPipe } from '@angular/common';
import { UtilsService } from '../../../services/utils.service';
import { ThemePalette } from '@angular/material/core';
import { MatProgressSpinnerModule, ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { ChartComponent } from 'ng-apexcharts';
import { VisitorChartOptions } from '../our-visiter/our-visiter.component';
import { SpinnerComponent } from './top-components/spinner/spinner.component';
@Component({
  selector: 'app-top-dash',
  standalone: true,
  imports: [
    SpinnerComponent,
    MatCardModule,
    MatRadioModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './top-dash.component.html',
  styleUrls: ['./top-dash.component.scss']
})
export class TopDashComponent implements OnInit{
  incomes:Income[] = []
  incomesFilter:Income[] = []
  cantIng:number = 0;
  cantGast:number = 0;
  balance:number = 0;
  constructor(private incomeService:IncomeService, private utilsService: UtilsService) {}
  color: ThemePalette = 'accent';
  value = 0;
  colorG: ThemePalette = 'accent';
  valueG = 0;
  colorI: ThemePalette = 'primary';
  valueI = 0;
  colorA: ThemePalette = 'primary';
  valueA = 0;
  mode: ProgressSpinnerMode = 'determinate';
  valueBalance = 0;
  valueIng = 0;
  valueGast = 0;
  cantAhor = 0;
  ngOnInit(): void { 
    this.getIncomes()
  }
  async getIncomes() {
    try {
      const today = new Date()
      const resp = await this.utilsService.getIncomesMes(today.getMonth());
      this.cantIng = resp[1];
      this.cantGast = resp[2];
      this.cantAhor = resp[3];
      this.balance = this.cantIng - this.cantGast - this.cantAhor;
      this.value = this.returnPorcentaje(this.balance);
      this.valueG = this.returnPorcentaje(this.cantGast);
      this.valueI = this.returnPorcentaje(this.cantIng);
      this.valueA = this.returnPorcentaje(this.cantAhor);
    } catch (error) {
      console.error(error);
    }
  }

  getPorcentaje(cant:number) {
    return (cant/this.cantIng) * 100
  }
  returnPorcentaje(value:any) {
    return Number(this.getPorcentaje(value).toFixed(0));
  }

  
}
