import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (!isAuthenticated()) {
      this.router.navigate(['/auth/login']);
      return false;
    }
  
    return true;
  }
}

// Your isAuthenticated function remains the same
const isAuthenticated = () => {
  // Your actual authentication logic here
  return false; // For demonstration, it returns true
};
