export type ApiOk<T> = { success: true } & T;
export type ApiErr = { success: false; message?: string };

export async function fetchJson<T>(input: RequestInfo | URL, init?: RequestInit) {
  const res = await fetch(input, init);
  const data = (await res.json()) as T;
  return data;
}
