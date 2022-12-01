import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PlatoService } from './app.service';
import { Plato } from './interface'
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ PlatoService ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  formPlato: FormGroup;
  platos: Plato[] = []
  constructor(private platoService: PlatoService){
    this.formPlato = new FormGroup({
      id: new FormControl(),
      nombre: new FormControl(),
      precio: new FormControl(),
      oferta: new FormControl(),
      color: new FormControl(),
      fechaInicioActividad: new FormControl(),
    })
    this.getPlatos()

  }
  
  getPlatos(){
    this.platoService.getPlatos().subscribe(platos => {
      this.platos = platos
      console.log(platos)
    });
  }

  onDateSelect({day,month,year}:any){
    console.log(day)
    this.formPlato.patchValue({
      fechaInicioActividad: new Date(year,month-1,day) 
    })
  }
  edit: boolean = false
  
  getData(event:any){
    this.edit = true
    this.platoService.getPlato(parseInt(event.target.id)).subscribe(plato=>{
      this.formPlato.patchValue({
        id: plato.id,
        nombre: plato.nombre,
        precio: plato.precio,
        oferta: plato.oferta,
        color: plato.color,
        fechaInicioActividad: plato.fechaInicioActividad,
      })
    })
  }

  delete(){
    this.platoService.deletePlato(this.formPlato.value.id).subscribe(()=>{
      alert('Borrado exitoso')
      this.getPlatos()
      this.formPlato.patchValue({
        id: null,
        nombre: null,
        precio: null,
        oferta: null,
        color: null,
        fechaInicioActividad: null,
      })
    })
  }

  salvar(){
    let ok: boolean = true
    if(this.formPlato.value.nombre.indexOf(' ') < 0){
      alert("El nombre del plato debe tener al menos 2 palabras")
      ok = false
    }
    if(parseFloat(this.formPlato.value.precio)<9 || parseFloat(this.formPlato.value.precio)>25){
      alert("El precio del plato debe estar entre 9 a 25 dolares")
      ok = false
    }
    if(ok){
      if(!this.edit){

        this.platoService.newPlato(this.formPlato.value).subscribe(()=>{
          this.getPlatos()
        })
      }else{
        this.platoService.editPlato(this.formPlato.value).subscribe(()=>{
          this.getPlatos()})
      }

    }
  }


}
