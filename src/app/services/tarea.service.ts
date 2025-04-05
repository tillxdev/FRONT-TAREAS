import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarea } from '../models/tarea';

@Injectable({
  providedIn: 'root' // angualar gestione automaticamente
})
export class TareaService {

  private apiUrl='http://127.0.0.1:8080/api/tareas';

  constructor(private http:HttpClient) { } //inyecta httpclient


  //obtener todas las tareas
  getTareas():Observable<Tarea[]>{
    return this.http.get<Tarea[]>(this.apiUrl);
  }


  //Obtener 1 tarea
  getTareaBYId(id:number):Observable<Tarea>{
    return this.http.get<Tarea>(`${this.apiUrl}/${id}`)
  }


  //crear 1 tarea 
  createTarea(tarea:Tarea):Observable<Tarea>{
    return this.http.post<Tarea>(this.apiUrl,tarea);
  }


  //Actualizar 1 tarea
  updateTarea(id:number,tarea:Tarea):Observable<Tarea>{
    return this.http.put<Tarea>(`${this.apiUrl}/${id}`,tarea);
  }

  
  //Eliminar 1 Tarea
  deleteTarea(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }



}
