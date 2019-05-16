
const preguntas = [
  {
    id: 1,
    nivelDificultad: 1,
    pregunta: 'James Cameron tuvo la idea de Terminator cuando... ',
    pista: 'Tenía fiebre cuando se le ocurrió',
    curiosidad: 'Una pesadilla febríl con un robot que intentaba matarlo',
    respuestas:  [
      {
        respuesta: 'Leía un Comic',
        probabilidad: 1, // en caso de eliminar alguna esta no se eliminaria
        isTrue: 'false'
      },
      {
        respuesta: 'Libro',
        probabilidad: 0,
        isTrue: 'false'
      },
      {
        respuesta: 'Pesadilla',
        probabilidad: 1,
        isTrue: 'true'
      }
    ]
  },
  {
    id: 2,
    nivelDificultad: 0,
    pregunta: 'Qué modelo de Terminator es representado por Arnold Schwarzenegger',
    pista: 'Es más que un 600 y menos de 1000',
    curiosidad: 'T800',
    respuestas:  [
      {
        respuesta: 'T600',
        probabilidad: 0,
        isTrue: 'false'
      },
      {
        respuesta: 'T900',
        probabilidad: 1,
        isTrue: 'false'
      },
      {
        respuesta: 'T1100',
        probabilidad: 0,
        isTrue: 'false'
      },
      {
        respuesta: 'T800',
        probabilidad: 1,
        isTrue: 'true'
      }
    ]
  },
  {
    id: 3,
    nivelDificultad: 1,
    pregunta: 'Es una mejora de T-888 ',
    pista: 'Es triste de pedir',
    curiosidad: 'T-888 es capaz de robar la piel de otro para reparar la suya',
    respuestas:  [
      {
        respuesta: 'Envejece',
        probabilidad: 1,
        isTrue: 'false'
      },
      {
        respuesta: 'superoido',
        probabilidad: 0,
        isTrue: 'false'
      },
      {
        respuesta: 'robar piel',
        probabilidad: 1,
        isTrue: 'true'
      }
    ]
  },
  {
    id: 4,
    nivelDificultad: 2,
    pregunta: 'Cual es la frase más famosa de Terminator',
    pista: 'I’ll be back',
    curiosidad: 'Volveré es según American Film Institute está en el puesto 37' +
    'de las mejores frases de película. Y Hasta la vista, baby en el puesto 76',
    respuestas:  [
      {
        respuesta: 'Hasta la vista Baby',
        probabilidad: 1,
        isTrue: 'false'
      },
      {
        respuesta: 'Volveré',
        probabilidad: 1,
        isTrue: 'true'
      }
    ]
  },
  {
    id: 5,
    nivelDificultad: 0,
    pregunta: 'Nombre inteligencia artificial',
    pista: 'Red del cielo',
    curiosidad: 'Skynet es una Inteligencia artificial capaz de controlar el'+
    ' arsenal militar de los Estados Unidos con independencia de los humanos',
    respuestas:  [
      {
        respuesta: 'SkyIA',
        probabilidad: 1,
        isTrue: 'false'
      },
      {
        respuesta: 'Intranet',
        probabilidad: 0,
        isTrue: 'false'
      },
      {
        respuesta: 'IA',
        probabilidad: 0,
        isTrue: 'false'
      },
      {
        respuesta: 'Skynet',
        probabilidad: 1,
        isTrue: 'true'
      }
    ]
  }
]
export default preguntas;
