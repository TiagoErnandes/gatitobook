import { UsuarioExisteService } from './usuario-existe.service';
import { NovoUsuarioService } from './novo-usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NovoUsuario } from './novo-usuario';
import { minusculoValidator } from './minusculo.validator';
import { userPasswordEqualsValidator } from './usuario-senha-iguais.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css'],
})
export class NovoUsuarioComponent implements OnInit {
  newUserForm!: FormGroup;

  constructor(
    private formBuild: FormBuilder,
    private newUserService: NovoUsuarioService,
    private userExists: UsuarioExisteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newUserForm = this.formBuild.group(
      {
        email: ['', [Validators.required, Validators.email]],
        fullName: ['', [Validators.required, Validators.minLength(4)]],
        userName: [
          '',
          [minusculoValidator],
          [this.userExists.usuarioJaExiste()],
        ],
        password: [''],
      },
      {
        validators: [userPasswordEqualsValidator],
      }
    );
  }
  cadastrar() {
    if (this.newUserForm.valid) {
      const novoUsuario = this.newUserForm.getRawValue() as NovoUsuario;
      this.newUserService.cadastrarNovoUsuario(novoUsuario).subscribe(
        () => {
          this.router.navigate(['']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
