import { Routes } from '@angular/router';


//Los componentes que se asocian a ciertas rutas
import { TareaListComponent } from './components/tarea-list/tarea-list.component';
import { TareaFormComponent } from './components/tarea-form/tarea-form.component';




export const routes: Routes = [
//configuracion de rutas
    {path:'',redirectTo:'/tareas',pathMatch:'full'},
    {path:'tareas',component:TareaListComponent},
    {path:'tareas/nueva',component:TareaFormComponent},
    {path:'tareas/:id/editar',component:TareaFormComponent}



];
