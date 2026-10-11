import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-login-screen',
  imports: [SHARED_IMPORTS, NgxMaskDirective],
  templateUrl: './login-screen.html',
  styleUrl: './login-screen.scss',
})
export class LoginScreen {
  private cookies = inject(CookieService);

  constructor() {
    this.cookies.set('sesion', 'valor');
    const valor = this.cookies.get('sesion');
  }
}