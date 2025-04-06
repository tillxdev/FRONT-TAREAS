// Importa decoradores y clases necesarias de Angular Core
import { Component, OnInit } from '@angular/core';

// Importa clases para manejar formularios reactivos
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

// Importa módulos de Angular Material para campos de texto, checkboxes y botones
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

// Servicio personalizado que se encarga de la lógica de tareas (llamadas HTTP, etc)
import { TareaService } from '../../services/tarea.service';

// Modelo de datos que representa una tarea
import { Tarea } from '../../models/tarea';

// Herramientas de Angular para manejar navegación y parámetros de URL
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tarea-form', // Nombre del componente que usarás en templates: <app-tarea-form>
  imports: [ // Módulos necesarios para que funcione el formulario y los componentes de Angular Material
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  templateUrl: './tarea-form.component.html', // Ruta al HTML del componente
  styleUrl: './tarea-form.component.css' // Estilos CSS del componente
})
export class TareaFormComponent implements OnInit {

  // Creamos un formulario reactivo con 3 campos: titulo, descripcion y completado
  tareaForm = new FormGroup({
    titulo: new FormControl(''),
    descripcion: new FormControl(''),
    completado: new FormControl(false) 
  });

  isEdit = false; // Bandera para saber si estamos editando una tarea existente
  tarea?: Tarea; // Variable donde guardaremos la tarea que estamos editando

  constructor(
    private tareaService: TareaService, // Inyectamos el servicio de tareas
    private router: Router, // Inyectamos el router para redireccionar
    private route: ActivatedRoute // Inyectamos la ruta activa para obtener parámetros (como el ID)
  ) {}

  ngOnInit(): void {
    // Obtenemos el ID de la tarea desde la URL
    const tareaId = +this.route.snapshot.paramMap.get('id')!;

    // Si existe un ID, significa que estamos en modo edición
    if (tareaId) {
      this.isEdit = true;

      // Llamamos al servicio para obtener la tarea por su ID
      this.tareaService.getTareaBYId(tareaId).subscribe(tarea => {
        this.tarea = tarea;

        // Rellenamos el formulario con los datos actuales de la tarea
        this.tareaForm.patchValue({
          titulo: tarea.titulo,
          descripcion: tarea.descripcion,
          completado: tarea.completado 
        });
      });
    }
  }

  // Función que se ejecuta al enviar el formulario
  onSubmit() {
    const formData = this.tareaForm.value;
  
    if (this.isEdit && this.tarea?.id) {
      // Crear un objeto Tarea completo, incluyendo el ID original
      const updatedTarea: Tarea = {
        id: this.tarea.id,       // <-- Asegúrate de incluir el ID
        titulo: formData.titulo || '', // Usamos || '' para evitar valores undefined
        descripcion: formData.descripcion || '',
        completado: formData.completado || false
      };
      console.log("Datos enviados al servidor (UPDATE):", updatedTarea); // <-- Verifica esto en consola
      this.tareaService.updateTarea(this.tarea.id, updatedTarea).subscribe({
        next: () => this.router.navigate(['/tareas']),
        error: (err) => console.error('Error al actualizar', err)
      });
    } else {
      // Para creación, no necesitamos el ID
      const newTarea: Tarea = {
        titulo: formData.titulo || '',
        descripcion: formData.descripcion || '',
        completado: formData.completado || false
      };
  
      this.tareaService.createTarea(newTarea).subscribe({
        next: () => this.router.navigate(['/tareas']),
        error: (err) => console.error('Error al crear:', err)
      });
    }
  }





}//endclass
