const c = "composite";
const p = "prime";

// Greatest common divisor
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);

// Lowest common multiple
const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);

// Euler's totient function
const phi = (a: number): number => {
  let result: number = 0;
  for (let i = 2; Math.pow(i, 2) <= a; i++) {
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

const main = (n: number): string => {
  // If n = a^b for int. a > 1, b > 1 return composite
  for (let b = 2; b < Math.log2(n); b++) {
    let a = Math.pow(n, 1 / b);
    if (Number.isInteger(a)) {
      return c;
    }
  }

  // Find smallest r s.t. O_r(n) > (log_2(n))^2
  let r: number;
  let maxk: number = Math.floor(Math.pow(Math.log2(n), 2));
  let maxr: number = Math.max(3, Math.ceil(Math.pow(Math.log2(n), 5)));
  let nextr: boolean = true;
  for (r = 2; nextr && r < maxr; r++) {
    nextr = false;
    for (let k: number = 1; !nextr && k <= maxk; k++) {
      nextr = Math.pow(n, k) % r === 1 || Math.pow(n, k) % r === 0;
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
  if (n > 5690034 && n <= r) {
    return p;
  }

  // for (let a = 1; a < Math.floor(Math.sqrt()))

  // n is prime
  return p;
};

console.log(main(31));
