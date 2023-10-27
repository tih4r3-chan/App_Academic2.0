export interface Asistencia{
  id: string;
  claseId: string;
  nombreDocente: string;
  listaA:{
    alumno1:{
      asistio: boolean;
    },
    alumno2:{
      asistio: boolean;
    }
  }
}
