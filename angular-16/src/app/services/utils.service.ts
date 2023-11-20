import { Injectable } from '@angular/core';
import { Income } from '../models/income';
import { IncomeService } from './income.service';
import { SavingService } from './saving.service';
import { Saving } from '../models/saving';
import { Loan } from '../models/loan';
import { LoanService } from './loan.service';
import { Movement } from '../models/movement';
import { MovementService } from './movement.service';
import { environment } from 'src/enviroments/environment.prod';
import { Friend } from '../models/friend';
import { FriendService } from './friend.service';
import { Usuario } from '../models/usuario';
import { MailService } from './mail.service';
import { UsuarioService } from './usuario.service';
import { ProjectsService } from './projects.service';
import { Project } from '../models/project';
import { BehaviorSubject } from 'rxjs';
import { Alert } from '../models/alert';
import { AlertService } from './alert.service';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  savResoponse: Saving[] = [];
  loaResoponse: Loan[] = [];
  incomesActive: Income[] = [];
  proyect!: Project;
  constructor(
    private incomeService: IncomeService,
    private savingService: SavingService,
    private loanService: LoanService,
    private movsService: MovementService,
    private friendService: FriendService,
    private mailService: MailService,
    private userService: UsuarioService,
    private proService: ProjectsService,
    private alertService: AlertService
  ) {}

  //Usuario
  async getUserByUID(uid: any) {
    return await new Promise<any>((resolve, reject) => {
      this.userService.getUsuarioByUID(uid).subscribe(
        (resp: any) => {
          resolve(resp);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  async getUsuarios() {
    const total = await new Promise<any>((resolve, reject) => {
      let user: Usuario[];
      let users: Usuario[] = [];
      this.userService.getUsuarios().subscribe(
        (resp: any) => {
          resolve(resp);
        },
        (error) => {
          reject(error);
        }
      );
    });
    return total;
  }
  async setUsuario(user: any) {
    user.active = true;
    user.img = 'perfil.png';
    user.fondo = 'user-info.jpg';
    this.userService.createUser(user).subscribe(
      (respF: any) => {
        console.table(respF);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //Ingresos/Gastos
  async getIncomes() {
    const total = await new Promise<any>((resolve, reject) => {
      let incomes: Income[];
      let incomesFilter: Income[] = [];
      let cantGast: number = 0;
      let cantIng: number = 0;
      let total: number[] = [];
      this.incomeService.getIncomesByUID().subscribe(
        (resp: any) => {
          (incomes = resp.incomes as Income[]),
            incomes.forEach((income) => {
              if (income.active === true) {
                incomesFilter.push(income);
              }
            }),
            resolve(incomesFilter);
        },
        (error) => {
          reject(error);
        }
      );
    });
    return total;
  }
  async getTotalIncomes() {
    const total = await new Promise<any>((resolve, reject) => {
      let incomes: Income[];
      let incomesFilter: Income[] = [];
      let cantGast: number = 0;
      let cantIng: number = 0;
      let total: number[] = [];
      this.incomeService.getIncomesByUID().subscribe(
        (resp: any) => {
          (incomes = resp.incomes as Income[]),
            incomes.forEach((income) => {
              if (income.active === true) {
                incomesFilter.push(income);
              }
            }),
            incomesFilter.forEach((income) => {
              if (income.tipe === 'bill' || income.tipe === 'pro') {
                cantGast = cantGast + income.cant;
              } else {
                cantIng = Number(cantIng) + income.cant;
              }
            });
          total[0] = cantGast;
          total[1] = cantIng;
          resolve(total);
        },
        (error) => {
          reject(error);
        }
      );
    });
    return total;
  }
  async getIncomesMes(mes: number) {
    let date;
    let today = new Date();
    let meses;
    let cantI = 0;
    let cantG = 0;
    let cantS = 0;
    let incomesMes: Income[] = [];
    let result = await this.getIncomes();
    result.forEach((income: any) => {
      date = new Date(income.createAt);
      meses = date.getMonth();
      if (meses === mes && date.getFullYear() === today.getFullYear()) {
        incomesMes.push(income);
      }
    });
    incomesMes.forEach((income) => {
      if (income.tipe === 'income') {
        cantI = cantI + income.cant;
      } else if (income.tipe === 'bill' || income.tipe === 'pro') {
        cantG = cantG + income.cant;
      } else if (income.tipe === 'saving') {
        cantS = cantS + income.cant;
      }
    });
    result[0] = incomesMes;
    result[1] = cantI;
    result[2] = cantG;
    result[3] = cantS;
    return result;
  }
  async setIncome(loan: any, resp: any, tipe: any, title: string) {
    let inco: Income = new Income();
    let div: any;
    inco.uid = loan.uid!;
    inco.cant = loan.cant!;
    inco.description = loan.description!;
    loan.origin
      ? (inco.origin = loan.origin)
      : (inco.description = loan.description!);
    inco.time = true!;
    inco.img = base_url + '/upload/incomes/' + loan.img;
    inco.tipe = tipe;
    inco.oid = resp.id ? resp.id : resp;
    div = loan.cantFinish / loan.interes;
    tipe === 'income'
      ? (inco.cant = loan.cantFinish - div)
      : (inco.cant = loan.cant!);
    inco.tipe === 'loan'
      ? (inco.img = 'card.png')
      : inco.tipe === 'bill'
      ? (inco.img = 'gastos.png')
      : (inco.img = 'income.png');
    this.incomeService.setIncome(inco).subscribe(async (resp) => {
      await this.setMovement(loan, resp, tipe, title);
    });
  }
  //Ahorros
  async getSaving() {
    try {
      const resp: any = await (
        await this.savingService.getSavingsByUID()
      ).toPromise();
      const savings = resp.savings as Saving[];
      let savingsFilter: Saving[] = [];
      let cantGast: number = 0;
      let cantIng: number = 0;
      let total: number[] = [];
      savings.forEach((saving) => {
        if (saving.active === true) {
          savingsFilter.push(saving);
        }
      });
      this.savResoponse = savingsFilter;
      savingsFilter.forEach((saving) => {
        cantGast = cantGast + saving.cant;
      });

      total[0] = cantGast;
      total[1] = cantIng;

      const lectura = [{ total: total, saving: this.savResoponse }];
      return lectura;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  //Creditos
  async getLoan() {
    try {
      const resp: any = await (
        await this.loanService.getLoansByUID()
      ).toPromise();
      const loans = resp.loans as Loan[];

      let loansFilter: Loan[] = [];
      let total: number[] = [];

      loans.forEach((loan) => {
        if (loan.active === true) {
          loansFilter.push(loan);
        }
      });
      this.loaResoponse = loansFilter;
      return this.loaResoponse;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  //Movimientos
  async getMov(oid: any) {
    const movs: Movement[] = await new Promise<any>((resolve, reject) => {
      this.movsService.getMovementsByOid(oid).subscribe(
        (resp: any) => {
          const movs = resp.movements as Movement[];
          // Ordenar movs por la propiedad createAt en orden ascendente
          resolve(movs.reverse());
        },
        (error) => {
          reject(error);
        }
      );
    });

    return movs;
  }
  async getMovByUID() {
    const movs: Movement[] = await new Promise<any>((resolve, reject) => {
      this.movsService.getMovementsByUID().subscribe(
        (resp: any) => {
          const movs = resp.movements as Movement[];
          // Ordenar movs por la propiedad createAt en orden ascendente
          resolve(movs.reverse());
        },
        (error) => {
          reject(error);
        }
      );
    });

    return movs;
  }
  async getMovementMes(mes: number, oid: any) {
    let date;
    let today = new Date();
    let meses;
    let movMes: Movement[] = [];
    let result = await this.getMov(oid);
    result.forEach((income: any) => {
      date = new Date(income.createAt);
      meses = date.getMonth();
      if (meses === mes && date.getFullYear() === today.getFullYear()) {
        movMes.push(income);
      }
    });
    return movMes;
  }
  async setMovement(loan: any, resp: any, tipe: any, title: string) {
    let mov: Movement = new Movement();
    let div: any;
    mov.uid = loan.uid!;
    mov.oid = resp.income.oid ? resp.income.oid : resp.income.id;
    mov.cant = loan.cant!;
    mov.origin = title;
    mov.img = base_url + '/upload/incomes/' + loan.img;
    mov.tipe = tipe;

    await this.movsService.setMovement(mov).subscribe((resp) => {});
  }
  //Proyectos
  async getProjects() {
    const total = await new Promise<any>((resolve, reject) => {
      let projects: Project[];
      let projectsFilter: Project[] = [];
      let cantGast: number = 0;
      let cantIng: number = 0;
      let total: number[] = [];
      this.proService.getProjectsByUID().subscribe(
        (resp: any) => {
          (projects = resp.projects as Project[]),
            projects.forEach((project) => {
              if (project.active === true) {
                projectsFilter.push(project);
              }
            }),
            resolve(projectsFilter);
        },
        (error) => {
          reject(error);
        }
      );
    });
    return total;
  }
  async getProMes(mes: number) {
    let date;
    let today = new Date();
    let meses;
    let cantI = 0;
    let cantG = 0;
    let cantS = 0;
    let proMes: Project[] = [];
    let result = await this.getProjects();
    result.forEach((pro: any) => {
      date = new Date(pro.createAt);
      meses = date.getMonth();
      if (meses === mes && date.getFullYear() === today.getFullYear()) {
        proMes.push(pro);
      }
    });

    return proMes;
  }
  setProject(pro: any) {
    this.proyect = pro;
  }
  //Alertas
  async getAlert() {
    const alert: Alert[] = await new Promise<any>((resolve, reject) => {
      let filter: any[] = [];
      this.alertService.getAlertsByUID().subscribe(
        (resp: any) => {
          const alerts = resp.alerts as Alert[];
          // Ordenar movs por la propiedad createAt en orden ascendente

          resolve(alerts);
        },
        (error) => {
          reject(error);
        }
      );
    });
    return alert;
  }
  async setAlert(alert: any) {
    alert.active = true;
    this.alertService.setAlert(alert).subscribe(
      (respF: any) => {
        console.table(respF);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  async putSeeAlert(alert: any) {
    alert.visto = true;
    this.alertService.putAlert(alert).subscribe(
      (respF: any) => {
        console.table(respF);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //Amigos
  async setFriend(uid: any) {
    let friend: Friend = new Friend();
    let div: any;
    friend.fid = uid!;
    friend.img = uid!;
    friend.active = true;
    friend.uid = this.userService.user.uid;
    this.userService.getUsuarioByUID(uid).subscribe(
      (respF: any) => {
        friend.img = respF.user.img!;
        this.friendService.setFriend(friend).subscribe();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  async getFriends() {
    const friends: Friend[] = await new Promise<any>((resolve, reject) => {
      this.friendService.getFriendsByUID().subscribe(
        (resp: any) => {
          const friends = resp.friends as Friend[];
          // Ordenar movs por la propiedad createAt en orden ascendente
          resolve(friends.reverse());
        },
        (error) => {
          reject(error);
        }
      );
    });

    return friends;
  }
  async isFriend(fid: any) {
    try {
      const resp:any = await this.friendService.getFriendsByUID().toPromise();
      const friends = resp?.friends as Friend[];
  
      // Comprobar si existe
      for (const friend of friends) {
        if (friend.fid === fid) {
          return true; // Si se encuentra un amigo, retornar true directamente
        }
      }
      return false; // Si no se encuentra ningún amigo, retornar false al final
    } catch (error) {
      console.error('Error al obtener amigos', error);
      throw error;
    }
  }
  //Email
  async sendMail(value: any) {
    this.mailService.sendEmail(value).subscribe((resp) => {
      console.log(resp);
    });
  }

  private _proyecto: any;
  private proyectoSubject = new BehaviorSubject<any>(null);

  get proyecto(): any {
    return this._proyecto;
  }

  set proyecto(value: any) {
    if (this._proyecto !== value) {
      this._proyecto = value;
      this.proyectoSubject.next(value); // Notifica a los observadores del cambio
    }
  }

  get proyectoObservable() {
    return this.proyectoSubject.asObservable();
  }
}
