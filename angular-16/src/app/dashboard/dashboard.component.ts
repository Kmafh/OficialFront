import { Component, AfterViewInit } from '@angular/core';
import { SalesOverviewComponent } from './dashboard-components/sales-overview/sales-overview.component';
import { OurVisiterComponent } from './dashboard-components/our-visiter/our-visiter.component';
import { ProfileComponent } from './dashboard-components/profile/profile.component';
import { ContactsComponent } from './dashboard-components/contacts/contacts.component';
import { ActivityTimelineComponent } from './dashboard-components/activity-timeline/activity-timeline.component';
import { TopDashComponent } from './dashboard-components/top-dash/top-dash.component';
import { UtilsService } from '../services/utils.service';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [SalesOverviewComponent, OurVisiterComponent, ProfileComponent, ContactsComponent, ActivityTimelineComponent, TopDashComponent, CommonModule],
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
	resp:any;

	constructor( private utilsService: UtilsService){
		sessionStorage.setItem("pag","dash")
	}
	ngAfterViewInit() { }
	async ngOnInit(): Promise<void> {
		sessionStorage.setItem('pag','futuro')
	
		try {
		  this.resp = await this.getSaving();
		  // Resto de la lógica que depende de this.resp
		} catch (error) {
		  console.error(error);
		  // Manejo de errores si es necesario
		}
	  }
	  
	  async getSaving() {
		try {
		  return await this.utilsService.getIncomes();
		} catch (error) {
		  console.error(error);
		  throw error; // Re-lanzar el error para que pueda ser manejado más arriba si es necesario
		}
	  }
}
