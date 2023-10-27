export interface claseModel{
  uid: string;
  codigo: string;
  docenteId: string;
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
  nombre: string;
  nombreD: string;
  sala: string;
  seccionId: number;
}
