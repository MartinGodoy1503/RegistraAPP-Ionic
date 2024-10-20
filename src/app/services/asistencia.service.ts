import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AsistenciaService {
  private apiUrl = 'http://localhost:3000/asistencias'; // Cambia según la URL base de tu API

  constructor(private http: HttpClient) {}

  // OBTENER TODAS LAS ASISTENCIAS
  getAsistencias(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // AGREGAR UNA NUEVA ASISTENCIA
  addAsistencia(nuevaAsistencia: any): Observable<any> {
    return this.http.post(this.apiUrl, nuevaAsistencia);
  }

  // ELIMINAR UNA ASISTENCIA
  deleteAsistenciaById(asistenciaId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${asistenciaId}`);
  }

  // ACTUALIZAR UNA ASISTENCIA EXISTENTE
updateAsistencia(asistencia: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/${asistencia.id}`, asistencia);
}
}

