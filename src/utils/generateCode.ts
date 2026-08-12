import Hashids from 'hashids'
import 'dotenv/config'

const hash = new Hashids(
  process.env.SECRET,
  7,
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
)

export function generateCode(id: number): string {
  const hashed = hash.encode(id)

  return hashed
}

export function decode(encoded: string): number {
  const decoded = hash.decode(encoded)
  const id = decoded[0]

  return Number(id)
}
