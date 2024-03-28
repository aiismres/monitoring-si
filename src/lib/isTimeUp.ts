export function isTimeUp(date: string) {
  if (new Date(date).getTime() < Date.now()) {
    return true;
  } else {
    return false;
  }
}
