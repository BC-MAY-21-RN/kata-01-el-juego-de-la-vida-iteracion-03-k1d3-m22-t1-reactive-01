import Table from './table';

const tabla = new Table(10, 10, '.......*....**....**.');
console.log(tabla.imprimirMatriz(0));

setInterval(() => {
  tabla.cicloVida();
  console.log(tabla.imprimirMatriz(0));
}, 2000);
