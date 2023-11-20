import { Component } from '@angular/core';
import { Activity, activities } from 'src/app/dashboard/dashboard-components/activity-timeline/activity-timeline-data';
import { AppHeaderComponent } from '../header.component';
import { MatDialogRef } from '@angular/material/dialog';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-modalhead',
  templateUrl: './modalhead.component.html',
  styleUrls: ['./modalhead.component.scss']
})
export class ModalheadComponent {

  activityData: Activity[];

    public dialogRef!: MatDialogRef<AppHeaderComponent>
    constructor( ) {

    this.activityData = activities;
  }


  ngOnInit(): void {
  }

}
