export interface Asistencia{
  id: string;
  claseId: string;
  nombreDocente: string;
  fecha: string;
  hora: string;
  listaA:[
    {
      mapValue: {
        fields: {
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
      }
    },
    {
      mapValue: {
        fields: {
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
      }
    }
  ]
}
