export default function isTouchDevice() {
  return /Mobi|Tablet|Touch/.test(navigator.userAgent);
}
