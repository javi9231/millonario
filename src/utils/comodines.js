function comodin5050(pregunta) {
    pregunta.comodines[1]._5050.sort().forEach(eliminar => {
      pregunta.respuestas[eliminar] = null;
    });
  }
export default comodin5050;
