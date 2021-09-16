# AKS Primality Test

A program that tests to see if a given number is prime, using the Agrawal-Kayal-Saxena primality test algorithm.

### The algorithm

Input: n > 1

1. Check if _n_ is a perfect power: if _n_ = _a_^_b_ for a > 1 and b > 1, output "composite"
2. Find the smallest _r_ such that the multiplicative order of _n_ modulo _r_ > the square of the binary logarithm of _n_. (If _r_ and _n_ are not coprime, skip this _r_)
3. For all 2<=_a_<=min(_r_, _n_-1), check that _a_ does not divide _n_: if _a_|_n_ for some 2<=_a_<=min(_r_, _n_-1), output "composite"
4. If _n_ <= _r_, output "prime"
5. For _a_ = 1 to the floor function of the product of the square root of Euler's totient function of _r_ and the binary logarithm of _n_, if (_X_+_a_)^_n_ != _X_^_n_+_a_ (mod _X_^_r_-1, _n_), output "composite";
6. Output "prime".
