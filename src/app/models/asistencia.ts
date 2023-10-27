export interface Asistencia{
  id: string;
  claseId: string;
  nombreDocente: string;
  listaA:{
    alumno1:{
      id: string;
      asistio: boolean;
    },
    alumno2:{
      id: string;
      asistio: boolean;
    }
  }
}
