import { Component, OnInit } from '@angular/core';
import { Activity, activities } from './activity-timeline-data';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { TableMovementsComponent } from 'src/app/pages/gestion/gestion-components/table-movements/table-movements.component';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Movement } from 'src/app/models/movement';
import { environment } from 'src/enviroments/environment.prod';
const base_url= environment.base_url

@Component({
  selector: 'app-activity-timeline',
  standalone: true,
  imports: [DemoMaterialModule, NgIf, NgFor, CommonModule],
  templateUrl: './activity-timeline.component.html'
})
export class ActivityTimelineComponent implements OnInit {
  imgUrl = base_url+'/upload/incomes/'
  activityData!: Movement[];
  usuario!:Usuario ;

  constructor(private usuarioService: UsuarioService,
    private utilsService: UtilsService,
    ) {
      this.usuario = usuarioService.user
      let dataFinish:any;
      utilsService.getMovByUID().then(data => { 
        data.forEach((resp) =>{
          if(resp.img === 'http://localhost:3000/api/upload/incomes/card.png') {
            resp.img = 'card.png';
          }
        })
        this.activityData = data; 
      });
  }


  ngOnInit(): void {
  }

}
