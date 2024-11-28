export default function isErrorInFetching<T>(
  response: T | { error: string }
  //This syntax is specific to type guards in TypeScript. It tells TypeScript that if the function returns true, the response parameter is guaranteed to have the type { error: string }
): response is { error: string } {
  return (response as { error: string }).error !== undefined;
}
