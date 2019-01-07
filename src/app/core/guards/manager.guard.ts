import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManagerGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private route: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.auth.user$.pipe(
      take(1),
      map(user => user && (user.roles.admin || user.roles.manager) ? true : false),
      tap(isAdmin => {
        if (!isAdmin) {
          console.log('Access denied: Additional privileges required');
          this.route.navigate(['home']);
        }
      })
    );
  }
}
