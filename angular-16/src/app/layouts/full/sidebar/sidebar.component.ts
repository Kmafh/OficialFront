import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../../shared/menu-items/menu-items';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports:[DemoMaterialModule, NgFor, NgIf, RouterModule, CommonModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class AppSidebarComponent implements OnDestroy {
  private usuarioSubscription: Subscription;

  mobileQuery: MediaQueryList;
  public imgUrl = "";
  public fondoUrl = "";
  public user!:Usuario
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    private userService: UsuarioService, private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    
    this.user = userService.user
    this.imgUrl = this.user.getImgUrl;
    this.fondoUrl = this.user.getFondoUrl;
    this.usuarioSubscription = this.userService.getUserObservable().subscribe((nuevoUsuario) => {
      this.user = nuevoUsuario;
      this.imgUrl = userService.user.getImgUrl;
      this.fondoUrl = userService.user.getFondoUrl;
    });
  }
  
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
