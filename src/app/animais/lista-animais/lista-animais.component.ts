import { UsuarioService } from './../../autenticacao/usuario/usuario.service';
import { environment } from './../../../environments/environment';

import { Component, OnInit } from '@angular/core';
import { Animais } from '../animais';
import { AnimaisService } from '../animais.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

const API = environment.apiURL;
@Component({
  selector: 'app-lista-animais',
  templateUrl: './lista-animais.component.html',
  styleUrls: ['./lista-animais.component.css'],
})
export class ListaAnimaisComponent implements OnInit {
  animais!: Animais;
  constructor(private activatedRouter: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRouter.params.subscribe((params) => {
      this.animais = this.activatedRouter.snapshot.data['animais'];
    });
  }
}
