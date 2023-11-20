import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnDestroy{
  
  public title: any;
  public subTitle: Subscription
  constructor(private router: Router){
    this.subTitle = this.getDataRouting().subscribe( (event) => {
      this.title = event
      document.title = `Nomisoft - ${ this.title.title}`
    }
    )
  }
  ngOnDestroy(): void {
    this.subTitle.unsubscribe()
  }

  getDataRouting(){
    return this.router.events
    .pipe(
      filter( (event:any) => event instanceof ActivationEnd ),
      filter( (event:ActivationEnd) => event.snapshot.firstChild === null),
      map((event:ActivationEnd) => event.snapshot.data)
    )
    
  }
}
