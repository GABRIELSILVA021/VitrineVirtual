import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModalService } from '../components/modal/modal.service';
import { LocalStorageService } from './localStorage.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);


  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private http: HttpClient,
    private modalService: ModalService
  ) { }

  get isLoggedIn() {
    var isLogged = this.localStorageService.validateUserInfo();
    this.loggedIn.next(isLogged);
    return this.loggedIn.asObservable();
  }

  login(user: User, modalError: any) {
    if (user.userName !== '' && user.password !== '') {
      //usando get apenas para uso local.
      this.http.get(`${environment.API}/profile?user=${user.userName}&password=${user.password}`).subscribe((data: any) => {
        if (data != null && data.length == 1) {
          this.localStorageService.setUserInfo(user.userName);
          this.loggedIn.next(true);
          this.router.navigate(['/']);
        } else {
          this.modalService.open(modalError, 'modal_mini', 'sm')
        }
      });
    }
  }

  getUserInfo() {
    if (this.isLoggedIn) {
      return this.localStorageService.getUserInfo();
    }
  }

  logout() {
    this.localStorageService.removeUserInfo();
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
