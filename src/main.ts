const { pow, log2, floor, max, ceil, sqrt } = Math;

const c = "composite";
const p = "prime";

// Polynomial class
class Polynomial extends Array {
  static create(a: number, n: number): Polynomial {
    let nfact = factorial(n);
    let coeffs = [];
    for (let i = 0; i < n + 1; i++) {
      let nifact = factorial(n - i);
      let ifact = factorial(i);
      let ak = pow(a, n - i);
      coeffs.push((nfact * ak) / (nifact * ifact));
    }
    return Polynomial.from(coeffs) as Polynomial;
  }

  get deg(): number {
    if (this.length > 0) return this.length - 1;
    return -Infinity;
  }

  clone(): Polynomial {
    return this.slice() as Polynomial;
  }

  isZero(): boolean {
    return this.length === 0;
  }

  add(P: Polynomial, factor: number = 1): Polynomial {
    let ret = this.clone();
    while (ret.deg < P.deg) ret.unshift(0);
    let i0 = ret.deg - P.deg;
    for (let i = 0; i < P.length; ++i) ret[i + i0] += factor * P[i];
    while (ret[0] === 0) ret.shift();
    return ret;
  }

  sub(P: Polynomial): Polynomial {
    return this.add(P, -1);
  }

  div(P: Polynomial) {
    if (P.deg > this.deg)
      throw new Error("Cannot divide by polynomial of larger degree");
    if (P.isZero()) throw new Error("Cannot divide by the zero polynomial");
    let ret = this.clone();
    let normalizer = P[0];
    for (let i = 0; i <= this.deg - P.deg; ++i) {
      ret[i] /= normalizer;
      let coef = ret[i];
      if (coef === 0) continue;
      for (let j = 1; j <= P.deg; ++j) ret[i + j] -= P[j] * coef;
    }
    let q = ret.slice(0, this.deg - P.deg + 1);
    let r = ret.slice(this.deg - P.deg + 1, ret.length);
    return { q, r };
  }

  mod(n: number) {
    let ret = this.clone();
    for (let i = 0; i <= this.deg; ++i) ret[i] %= n;
    return ret;
  }
}

// Greatest common divisor
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);

// Lowest common multiple
const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);

// Euler's totient function
const phi = (a: number): number => {
  let result: number = 0;
  for (let i = 2; pow(i, 2) <= a; i++) {
    if (a % i === 0) {
      while (a % i === 0) {
        a /= i;
      }
      result -= result / i;
    }
  }
  if (a > 1) {
    result -= result / a;
  }
  return result;
};

const factorial = (n: number): number => {
  let f = 1;
  for (let i = 2; i <= n; i++) f *= i;
  return f;
};

const main = (n: number): string => {
  // If n = a^b for int. a > 1, b > 1 return composite
  for (let b = 2; b < log2(n); b++) {
    let a = pow(n, 1 / b);
    if (Number.isInteger(a)) {
      return c;
    }
  }

  // Find smallest r s.t. O_r(n) > (log_2(n))^2
  let r: number;
  let maxk: number = floor(pow(log2(n), 2));
  let maxr: number = max(3, ceil(pow(log2(n), 5)));
  let nextr: boolean = true;
  for (r = 2; nextr && r < maxr; r++) {
    nextr = false;
    for (let k: number = 1; !nextr && k <= maxk; k++) {
      nextr = pow(n, k) % r === 1 || pow(n, k) % r === 0;
    }
  }
  r--;

  // If 1 < gcd(a, n) < n for a <= r, return composite
  for (let a = r; a > 1; a--) {
    let gcd_an: number = gcd(a, n);
    if (gcd_an > 1 && gcd_an < n) {
      return c;
    }
  }

  // If n <= r, return prime
  if (n <= r && n <= 5690034) {
    return p;
  }

  // let maximum = floor(log2(n)*sqrt(phi(r)));
  // let r1 =
  // for (let a = 1; a <= maximum; a++) {
  //   let p1 = Polynomial.create(a, n);
  //   let zeroes = []
  //   for
  //   let params = p1.sub(p1.div([1, , a] as Polynomial).r as Polynomial);
  //   if ( != 0) return c;
  // }

  // n is prime
  return p;
};

console.log(main(31));
// const p1 = Polynomial.create(1, 10);
// const p2 = Polynomial.create(2, 2);
// console.log(p1.div(p2));
