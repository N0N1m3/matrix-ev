import { addition, division, multiplication, subtraction } from "./utils.ts";

type MatrixType = number[][];

interface MatrixInterface {
  add(num: number): Matrix;

  mull(num: number): Matrix;

  div(num: number): Matrix;

  sub(num: number): Matrix;

  add(matrix: MatrixInterface): Matrix;

  mull(matrix: MatrixInterface): Matrix;

  div(matrix: MatrixInterface): Matrix;

  sub(matrix: MatrixInterface): Matrix;

  trans(): Matrix;

  inverse(): Matrix;

  get(): MatrixType;
}

class Matrix implements MatrixInterface {
  constructor(private readonly matrix: MatrixType) {}

  public add(num: number): Matrix;
  public add(matrix: MatrixInterface): Matrix;
  public add(matrixOrNum: number | MatrixInterface): Matrix {
    return this.operate(matrixOrNum, addition);
  }

  public div(num: number): Matrix;
  public div(matrix: MatrixInterface): Matrix;
  public div(matrixOrNum: number | MatrixInterface): Matrix {
    return this.operate(matrixOrNum, division);
  }

  public mull(num: number): Matrix;
  public mull(matrix: MatrixInterface): Matrix;
  public mull(matrixOrNum: number | MatrixInterface): Matrix {
    return this.operate(matrixOrNum, multiplication);
  }

  public sub(num: number): Matrix;
  public sub(matrix: MatrixInterface): Matrix;
  public sub(matrixOrNum: number | MatrixInterface): Matrix {
    return this.operate(matrixOrNum, subtraction);
  }

  public get() {
    return this.matrix;
  }

  private operate(matrixOrNumber: number | MatrixInterface, operation: (a: number, b: number) => number) {
    const result: MatrixType = [];
    const base = this.get();

    if (typeof matrixOrNumber === "number") {
      for (let i = 0; i < base.length; i++) {
        result.push(base[i].map((elem) => operation(elem, matrixOrNumber)));
      }

      return new Matrix(result);
    }

    const additional = matrixOrNumber.get();

    for (let i = 0; i < base.length; i++) {
      result.push(base[i].map((elem, j) => operation(elem, additional[i][j])));
    }

    return new Matrix(result);
  }
}
