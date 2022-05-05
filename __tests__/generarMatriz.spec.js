// ejemplo
const Table = require('../table');

test('tabla.generarMatriz', () => {
  const tabla = new Table(3, 3, '.......*....**....**.');
  const matriz = tabla.generarMatriz(3, 3);
  expect(matriz.length).toBe(3);
  expect(matriz[0].length).toBe(3);
});
