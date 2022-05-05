class Cell {
  constructor(status = '.') {
    this.status = status; // muerto ., viva *
  }

  getState() {
    return this.status;
  }

  setState(newState) {
    this.status = newState;
  }
}
module.exports = Cell;
