export interface claseModel{
  uid: string;
  codigo: string;
  estado: boolean;
  docenteId: string;
  listaA:[
    {
      nombre: string;
      id: string;
      asistio: false;
    },
    {
      nombre: string;
      id: string;
      asistio: false;
    }
  ]
  nombre: string;
  nombreD: string;
  sala: string;
  seccionId: number;
}
