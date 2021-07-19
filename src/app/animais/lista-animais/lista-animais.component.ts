import { UsuarioService } from './../../autenticacao/usuario/usuario.service';
import { environment } from './../../../environments/environment';

import { Component, OnInit } from '@angular/core';
import { Animais } from '../animais';
import { AnimaisService } from '../animais.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

const API = environment.apiURL;
@Component({
  selector: 'app-lista-animais',
  templateUrl: './lista-animais.component.html',
  styleUrls: ['./lista-animais.component.css'],
})
export class ListaAnimaisComponent implements OnInit {
  animais$!: Observable<Animais>;
  constructor(
    private animaisService: AnimaisService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.animais$ = this.usuarioService.retornaUsuario().pipe(
      switchMap((usuario) => {
        const userName = usuario.name ?? '';
        return this.animaisService.listaDoUsuario(userName);
      })
    );
  }
}
