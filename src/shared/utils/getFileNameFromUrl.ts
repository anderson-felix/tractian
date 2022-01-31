type FuncType = (url: string) => string;

export const getFileNameFromUrl: FuncType = url =>
  String(url.split('/')?.at(-1));
