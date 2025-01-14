import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazyImage.component.html',
})
export class LazyImageComponent implements OnInit {

  @Input()
  public url!: string;

  @Input()
  public alt: string = ''; // en caso de que no exista, se muestra el texto vacio


  public hasLoaded: boolean = false;


  ngOnInit(): void {
    if( !this.url)  throw new Error ( 'URL Property is required' );
  }

  onLoad() {

    // setTimeout ( () => { // contador de tiempo para que se muestre la imagen despues de 1seg
    //   this.hasLoaded = true;
    // }, 1000);

    this.hasLoaded = true;
  }

 }
