import {  Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interface';

@Component({
  selector: 'gifs-card',
  templateUrl: './gifs-card.component.html',
})
export class GifsCardComponent implements OnInit{

  @Input()
  public gif!: Gif; // gif!: indica que la varible siempre tendran un valor, por el signo !

  // para los ciclos de vida de las variables cuando se inicializan
  ngOnInit(): void {
    // verificamos la variable y emitimos un erro, debe ser requereida
    if( !this.gif ) throw new Error('Gif Propoerty is required');
  }

}
