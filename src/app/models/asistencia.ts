export interface Asistencia{
  dia: string;
  id: string;
  claseId: string;
  nombreDocente: string;
  fecha: string;
  hora: string;
  listaA:[
    {
      asistio: {
        booleanValue: boolean
      },
      id: {
        stringValue: string
      },
      nombre: {
        stringValue: string
      },
    },
    {
      asistio: {
        booleanValue: boolean
      },
      id: {
        stringValue: string
      },
      nombre: {
        stringValue: string
      },
    }
  ]
}
