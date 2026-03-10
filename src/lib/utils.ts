export function numberToRating(rating: number) {
  return rating.toFixed(1).toString().replace(".", ",");
}
