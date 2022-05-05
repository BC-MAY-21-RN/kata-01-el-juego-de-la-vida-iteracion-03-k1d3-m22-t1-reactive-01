const Cell = require('./cell');

class Table {
  constructor(x, y, cadena) {
    this.matriz = this.rellenarMatriz(x, y, cadena);
  }
  generarMatriz(x, y) {
    return Array(x).fill(new Cell()).map(() => (new Array(y).fill(new Cell())));
  }

  rellenarMatriz(x, y, cadena) {
    const matriz = this.generarMatriz(x, y);
    matriz.forEach(async (fila, indexi) => {
      fila.forEach(async (casilla, indexj) => {
        matriz[indexi][indexj] = new Cell(cadena.charAt(this.randomCaracter(0, cadena.length - 1)));
      });
    });
    return matriz;
  }

  randomCaracter(min, max) {
    return Math.random() * (max - min) + min;
  }

  cicloVida() {
    return this.reglas();
  }

  /*
    ["-"],["-"],["-"],["-"]
    ["-"],["*"],["-"],["-"]
    ["-"],["*"],["-"],["-"]
    ["-"],["-"],["-"],["-"]
    */

  vecinosVivos(x, y) {
    let vecinosVivos = 0;
    const objeto = {
      esquinaSuperiorIzquierda: (fila, columna) => {
        if (fila !== 0 && this.matriz[fila - 1][columna - 1]) {
          if (this.matriz[fila - 1][columna - 1].getState() === '*') {
            vecinosVivos += 1;
          }
        }
      },
      superior: (fila, columna) => {
        if (fila !== 0 && this.matriz[fila - 1][columna]) {
          if (this.matriz[fila - 1][columna].getState() === '*') {
            vecinosVivos += 1;
          }
        }
      },
      esquinaSuperiorDerecha: (fila, columna) => {
        if (fila !== 0 && this.matriz[fila - 1][columna + 1]) {
          if (this.matriz[fila - 1][columna + 1].getState() === '*') {
            vecinosVivos += 1;
          }
        }
      },
      esquinaInferiorIzquierda: (fila, columna) => {
        if (fila !== this.matriz.length - 1 && this.matriz[fila + 1][columna - 1]) {
          if (this.matriz[fila + 1][columna - 1].getState() === '*') {
            vecinosVivos += 1;
          }
        }
      },
      inferior: (fila, columna) => {
        if (fila !== this.matriz.length - 1 && this.matriz[fila + 1][columna]) {
          if (this.matriz[fila + 1][columna].getState() === '*') {
            vecinosVivos += 1;
          }
        }
      },
      esquinaInferiorDerecha: (fila, columna) => {
        if (fila !== this.matriz.length - 1 && this.matriz[fila + 1][columna + 1]) {
          if (this.matriz[fila + 1][columna + 1].getState() === '*') {
            vecinosVivos += 1;
          }
        }
      },
      derecha: (fila, columna) => {
        if (this.matriz[fila][columna + 1]) {
          if (this.matriz[fila][columna + 1].getState() === '*') {
            vecinosVivos += 1;
          }
        }
      },
      izquierda: (fila, columna) => {
        if (this.matriz[fila][columna - 1]) {
          if (this.matriz[fila][columna - 1].getState() === '*') {
            vecinosVivos += 1;
          }
        }
      },
    };
    Object.keys(objeto).forEach((key) => objeto[key](x, y));
    return vecinosVivos;
  }

  imprimirMatriz(fila = 0) {
    let cadena = '';
    if (fila === this.matriz.length) return '\n';
    this.matriz[fila].forEach((obj) => {
      cadena += obj.getState();
    });
    return `${cadena}\n${this.imprimirMatriz(fila + 1)}`;
  }

  reglas() {
    for (let i = 0; i < this.matriz.length; i += 1) {
      for (let j = 0; j < this.matriz.length; j += 1) {
        const vivas = this.vecinosVivos(i, j);
        //    console.log(this.matriz[i][j].status);
        if (this.matriz[i][j].getState() === '*' && vivas < 2) {
          this.matriz[i][j].setState('.');
        } else if (this.matriz[i][j].getState() === '*' && vivas > 3) {
          this.matriz[i][j].setState('.');
        } else if (this.matriz[i][j].getState() === '.' && vivas === 3) {
          this.matriz[i][j].setState('*');
        }
      }
    }
    return this.matriz;
  }
}
module.exports = Table;
