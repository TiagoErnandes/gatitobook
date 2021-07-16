import { AutenticacaoService } from './../../autenticacao/autenticacao.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user!: string;
  password!: string;

  constructor(
    private authService: AutenticacaoService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  login() {
    this.authService.autentica(this.user, this.password).subscribe(
      () => {
        this.router.navigate(['animais']);
      },
      (erro) => {
        alert('Usuario ou senha invalida');
        console.log(erro);
      }
    );
  }
}
