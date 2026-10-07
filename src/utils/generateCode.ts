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

const MAX_INT4 = 2_147_483_647

export function decode(encoded: string): number | null {
  try {
    const [decoded] = hash.decode(encoded)
    if (decoded === undefined) return null

    const id = Number(decoded)
    if (!Number.isInteger(id) || id < 1 || id > MAX_INT4) return null

    return id
  } catch {
    return null
  }
}
