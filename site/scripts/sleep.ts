export const sleep = (sec: number) => new Promise(r => setTimeout(r, sec * 1000));
