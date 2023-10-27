export interface Asistencia{
  id: string;
  claseId: string;
  nombreDocente: string;
  fecha: string;
  hora: string;
  listaA:{
    alumno1: {
      nombre: string;
      id: string;
      asistio: false;
    }
    alumno2: {
      nombre: string;
      id: string;
      asistio: false;
    }
  }
}
