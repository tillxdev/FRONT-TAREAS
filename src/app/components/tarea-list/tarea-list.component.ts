// Importamos lo necesario para crear un componente y manejar el ciclo de vida
import { Component, OnInit } from '@angular/core';

// Importamos el servicio que se comunica con el backend (API)
import { TareaService } from '../../services/tarea.service';

// Importamos el modelo de datos de las tareas para tipar correctamente
import { Tarea } from '../../models/tarea';

// Importamos los módulos de Angular Material que se usan en la vista (HTML)
import { MatTableModule } from '@angular/material/table';         // Tabla para mostrar tareas
import { MatButtonModule } from '@angular/material/button';       // Botones de acción
import { MatIconModule } from '@angular/material/icon';           // Íconos de Angular Material
import { MatCheckboxModule } from '@angular/material/checkbox';   // Checkbox para "completado"
import { RouterModule } from '@angular/router';                   // Navegación de rutas

@Component({
  selector: 'app-tarea-list',     // Selector que se usa en HTML para usar este componente
  imports: [                      // Módulos necesarios SOLO para este componente (Angular Standalone)
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    RouterModule
  ],
  templateUrl: './tarea-list.component.html',     // HTML asociado
  styleUrl: './tarea-list.component.css'          // Estilos específicos
})



export class TareaListComponent implements OnInit{

  tareas: Tarea[] = [];  // Arreglo donde se guardarán las tareas que vienen del backend
  displayedColumns = ['titulo', 'descripcion', 'completado', 'acciones']; // Columnas que se mostrarán en la tabla
  

  constructor(private tareaService:TareaService){} //Inyectamos  el servicio

  ngOnInit(): void {
      this.cargarTareas(); // Cuando el componente se carga, se ejecuta este método
  }


  // en este componente cargamos e eliminamos 

  cargarTareas(): void {
    this.tareaService.getTareas().subscribe({
      next: (tareas) => this.tareas = tareas,                 // Cuando llegan las tareas, se guardan en la variable
      error: (err) => console.error('Error!!!!!! :', err)     // Si hay un error, lo muestra
    });
  }
  

  eliminarTarea(id?: number): void {
    this.tareaService.deleteTarea(id!).subscribe(() => {
      this.cargarTareas(); // Después de eliminar, recarga la lista
    });
  }
  



}
