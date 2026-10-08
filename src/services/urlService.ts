import { UrlRepository } from '../repositories/urlRepository.ts'
import { decode, generateCode } from '../utils/generateCode.ts'
import { ConflictError, NotFoundError } from '../errors.ts'
import { Url } from '../model/url.ts'

type UrlResponse = {
  code: string
  url: string
  userId: string
  clicks: number
}

function toUrlResponse(url: Url): UrlResponse {
  return {
    code: generateCode(url.id),
    url: url.url,
    userId: url.userId,
    clicks: url.clicks,
  }
}

export class UrlService {
  constructor(private urlRepository: UrlRepository) {}

  async createUrl(userId: string, url: string): Promise<UrlResponse> {
    const findUrl = await this.urlRepository.findByUrlAndUserId(userId, url)

    if (findUrl.length !== 0) throw new ConflictError('Url already exists')

    const newUrl = await this.urlRepository.create(userId, url)

    return toUrlResponse(newUrl)
  }

  async findUrlByCode(code: string): Promise<UrlResponse> {
    const id = decode(code)
    if (id === null) throw new NotFoundError('Url not found')

    const findUrl = await this.urlRepository.findById(id)
    if (!findUrl) throw new NotFoundError('Url not found')

    await this.urlRepository.incrementClick(code)

    return toUrlResponse(findUrl)
  }

  async findUrlsByUserId(userId: string): Promise<UrlResponse[]> {
    const urls = await this.urlRepository.findByUserId(userId)

    return urls.map(toUrlResponse)
  }
}
