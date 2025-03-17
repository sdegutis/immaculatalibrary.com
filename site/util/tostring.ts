const dec = new TextDecoder()

export function tostring(str: string | Uint8Array) {
  return typeof str === 'string' ? str : dec.decode(str)
}
