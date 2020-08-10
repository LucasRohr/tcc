export class ArrayUtils {
  static range(start, end) {
    return Array.from({ length: end - start }, (v, k) => k + start)
  }
}
