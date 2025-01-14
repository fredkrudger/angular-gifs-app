import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';

@Injectable( {providedIn: 'root'} )
export class GifsService {

  public gifList: Gif[] = []; // declaramos la variable con la estructrura de gif para guardar los datos

  private _tagsHistory: string[] = [];
  private apiKey:         string = '9Ib8DwX1xLyicGoWCgJjksGHoPa0LzoU';
  private serviceUrl:     string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('GIFS SERVICE READY');
   } //inyectamos el httpClient para usar la api de giphy

  get tagsHistory(){
    return [...this._tagsHistory]; // se hace uso de spread para convertir el array en un array nuevo y afectar el array original, con dichos valores originales
  }

  private organizeHistory(tag:string){
    tag = tag.toLowerCase(); // colocamos todo en minusculas, para validar los nombres de tags

    if( this._tagsHistory.includes( tag ) ) { //includes: es palabra reservada
      // verificamos si el tag colocado nuevo es igual al que ya existe, para no repetir el mismo tag
       this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag)
    }

    // si la condicion se cumple, se agrega el tag al principio del array
    this._tagsHistory.unshift(tag);
    // se mantiene el array con limite de 10 elementos, los demas se eliminan y no se muetran
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('History', JSON.stringify(this._tagsHistory));
    // LocalStorage, no requiere de importar, es un libreria de js
    // JSON.stringify: convierte el array en un string, para poder guardarlo en el localStorage, que usa string
  }

  private loadLocalStorage(): void {
    // verificamos si existe el localStorage con el nombre de History y tiene datos
    if (! localStorage.getItem('History')) return; // si no existe, no hacemos nada

    this._tagsHistory = JSON.parse(localStorage.getItem('History')!);
    // el Json.parse siempre cumplira y recibira el nombre "History", para convertir el string en un array
    // JSON.parse: convierte el string en un array, para poder usarlo y mostrarlo en el componente

    // Verificamos si existe algun tag para mostrar en el array, si no existe, no hacemos nada
    if (this._tagsHistory.length === 0) return; //

    this.searchTag( this._tagsHistory[0]);
  }

  searchTag(tag: string):void {

    if(tag.length === 0) return; // si el tag es vacio, no hacemos nada

    // aqui llamamos la funcion que organiza el array de tags
    this.organizeHistory(tag);


    // httpParams es una clase especial que nos permite crear parametros para la api y es mas comodo
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', tag)
      .set('limit', 10)


    // httpParams es una clase especial que nos permite crear parametros para la api y es mas comodo
    // SearchResponse es un generico en el que estan las interfaces que retorna la API

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params}) // esta es la estructura utilizada si se hace uso de httpParams, en caso contrario se puede usar tood en una sola linea
      .subscribe( resp => {

        this.gifList = resp.data;

      });

  }

}
