import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AsistenciaService {
  private asignaturasUrl = 'http://localhost:3000/asignaturas';

  constructor(private http: HttpClient) {}

  // Obtener todas las asignaturas asociadas a un profesor
  obtenerAsignaturasPorProfesor(profesorId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.asignaturasUrl}?profesor=${profesorId}`);
  }

  // Obtener una asignatura por ID
  obtenerAsignaturaPorId(asignaturaId: string): Observable<any> {
    return this.http.get<any>(`${this.asignaturasUrl}/${asignaturaId}`);
  }

  // Actualizar una asignatura completa
  actualizarAsignatura(asignaturaId: string, asignatura: any): Observable<any> {
    return this.http.put<any>(`${this.asignaturasUrl}/${asignaturaId}`, asignatura);
  }

  // Registrar asistencia de un alumno en una asignatura y fecha específica
  registrarAsistencia(asignaturaId: string, fecha: string, asistencia: any): Observable<any> {
    const url = `${this.asignaturasUrl}/${asignaturaId}/asistencias`;
    return this.http.post(url, asistencia); 
  }
  

  // Obtener asistencias de un alumno por ID
  obtenerAsistenciasPorAlumnoId(alumnoId: string): Observable<any[]> {
    return this.http.get<any[]>(this.asignaturasUrl).pipe(
      // Filtramos las asistencias relacionadas con el alumno
      map((asignaturas) =>
        asignaturas
          .map((asignatura: any) => ({
            asignaturaId: asignatura.id,
            nombre: asignatura.nombre,
            asistencias: asignatura.asistencias
              .filter((asistencia: any) =>
                asistencia.alumnos.some((a: any) => a.id === alumnoId && a.asistio)
              )
              .map((asistencia: any) => ({
                fecha: asistencia.fecha,
                asistio: true,
              })),
          }))
          .filter((asignatura: any) => asignatura.asistencias.length > 0)
      )
    );
  }

  actualizarAsistenciaConQR(asignaturaId: string, usuarioId: string, fecha: string): Observable<any> {
    return this.obtenerAsignaturaPorId(asignaturaId).pipe(
      switchMap((asignatura) => {
        const asistencia = asignatura.asistencias.find((a: any) => a.fecha === fecha);
        if (!asistencia) {
          asignatura.asistencias.push({
            fecha,
            alumnos: [{ id: usuarioId, asistio: true }],
          });
        } else {
          const alumno = asistencia.alumnos.find((a: any) => a.id === usuarioId);
          if (alumno) {
            alumno.asistio = true;
          } else {
            asistencia.alumnos.push({ id: usuarioId, asistio: true });
          }
        }
        return this.actualizarAsignatura(asignaturaId, asignatura);
      })
    );
  }
  

}
