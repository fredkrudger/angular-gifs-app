import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar: </h5>
    <input
      type="text"
      class="form-control"
      placeholder="Buscar Gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
    >
  `
})
// dentro del input hay que definir un nombre local para acceder al input, es como una especie de ID, algo usado como los modales de bootstrap
// keyup.enter es un evento que se dispara cuando se presiona la tecla enter, en este caso cuando se escribe el nombre del tag

export class SearchComponent  {

  // viewChild se usa para solo acceder a un solo elemento HTML
  // viewChildren se usa para acceder a todos los elementos HTML, usado como array

  @ViewChild('txtTagInput')
  // ElementRef <HTMLInputElement>: son palabras reservadas a utilizar cuando sea un input al cual queremos acceder
  public tagInput!: ElementRef <HTMLInputElement>; // el signo de exclamacion indica que que esa variable siempre tendra datos que mostraran

  constructor(private gifsService: GifsService) { } // aqui declaramo una variable y le inyectamos el servicio definido en GifsModule

  searchTag() {

    const newTag = this.tagInput.nativeElement.value; // nativeElement es un metodo que nos devuelve el elemento HTML, al cual fue declarado arriba, tagInput

    this.gifsService.searchTag(newTag); //aqui accederemos al servicio y llamamos al metodo searchTag

    this.tagInput.nativeElement.value = ''; // limpiamos el input y le pasamos un valor vacio
    
  }


}
