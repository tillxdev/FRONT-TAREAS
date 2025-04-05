import { Component, OnInit } from '@angular/core';
import { TareaService } from '../../services/tarea.service';

//importaciones
import { Tarea } from '../../models/tarea';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tarea-list',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    RouterModule
  ],
  templateUrl: './tarea-list.component.html',
  styleUrl: './tarea-list.component.css'
})


export class TareaListComponent implements OnInit{

  tareas:Tarea[]=[];//Aqui guardaremos las tareas
  displayedColumns=['titulo','descripcion','completado','acciones'];

  constructor(private tareaService:TareaService){} //Inyectamos  el servicio

  ngOnInit(): void {
      this.cargarTareas();
  }


  // en este componente cargamos e eliminamos 

  cargarTareas():void{
    this.tareaService.getTareas().subscribe({
      next :(tareas) => this.tareas = tareas,
      error: (err)=> console.error('Error!!!!!! :',err)
    });
  }


  eliminarTarea(id?:number):void{
    this.tareaService.deleteTarea(id!).subscribe(()=>{
      this.cargarTareas();
    });
  }
  



}
