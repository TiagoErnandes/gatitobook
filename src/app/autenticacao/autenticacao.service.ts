import { UsuarioService } from './usuario/usuario.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  constructor(
    private httpClient: HttpClient,
    private userService: UsuarioService
  ) {}

  autentica(user: string, password: string): Observable<HttpResponse<any>> {
    return this.httpClient
      .post(
        'http://localhost:3000/user/login',
        {
          userName: user,
          password: password,
        },
        {
          observe: 'response',
        }
      )
      .pipe(
        tap((res) => {
          const authToken = res.headers.get('x-access-token') ?? '';
          this.userService.salvaToken(authToken);
        })
      );
  }
}
