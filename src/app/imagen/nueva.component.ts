import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router'
import { ImagenService } from '../services/imagen.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-nueva',
  templateUrl: './nueva.component.html',
  styleUrls: ['./nueva.component.css']
})
export class NuevaComponent implements OnInit {

  @ViewChild('imagenInputFile', {static: false}) imagenFile: ElementRef;

  imagen: File;
  imagenMin: File;

  constructor(
    private imagenService: ImagenService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  onUpload(): void{
    this.spinner.show();
    this.imagenService.upload(this.imagen).subscribe(
      data =>{
        this.spinner.hide();
        this.router.navigate(['/']);
      },
      err=>{
        this.spinner.hide();
        alert(err.console.console.error.mensaje)
        this.reset();
      }
    );
  }

  reset(): void{
    this.imagen = null;
    this.imagenMin = null;
    this.imagenFile.nativeElement.value = '';
  }

  onFileChange(event){
    this.imagen = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (evento: any)=>{
      this.imagenMin = evento.target.result;
    };
    fr.readAsDataURL(this.imagen);
  }

}
