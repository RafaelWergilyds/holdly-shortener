import { UrlRepository } from '../repositories/urlRepository.ts'
import { decode, generateCode } from '../utils/generateCode.ts'

type UrlResponse = {
  code: string
  url: string
  userId: string
  clicks: number
}

export class UrlService {
  constructor(private urlRepository: UrlRepository) {}

  async createUrl(userId: string, url: string): Promise<UrlResponse> {
    const findUrl = await this.urlRepository.findByUrlAndUserId(userId, url)

    if (findUrl.length !== 0) throw new Error('Url already exists')

    const newUrl = await this.urlRepository.create(userId, url)

    const code = generateCode(newUrl.id)

    const urlResponse: UrlResponse = {
      code,
      url: newUrl.url,
      userId: newUrl.userId,
      clicks: newUrl.clicks,
    }

    return urlResponse
  }

  async getAllUrls(): Promise<UrlResponse[]> {
    const urls = await this.urlRepository.findAll()
    const urlsResponse: UrlResponse[] = []

    urls.forEach((url) => {
      const code = generateCode(url.id)
      const urlResponse = {
        code,
        url: url.url,
        userId: url.userId,
        clicks: url.clicks,
      }

      urlsResponse.push(urlResponse)
    })

    return urlsResponse
  }

  async findUrlByCode(code: string): Promise<UrlResponse> {
    try {
      const id = decode(code)
      const findUrl = await this.urlRepository.findById(id)

      if (!findUrl) throw new Error('Url not found')

      await this.urlRepository.incrementClick(code)

      const url: UrlResponse = {
        code,
        url: findUrl.url,
        userId: findUrl.userId,
        clicks: findUrl.clicks,
      }

      return url
    } catch (error) {
      throw error
    }
  }

  async findUrlsByUserId(userId: string): Promise<UrlResponse[]> {
    const urls = await this.urlRepository.findByUserId(userId)
    const urlsResponse: UrlResponse[] = []

    urls.forEach((url) => {
      const code = generateCode(url.id)
      const urlResponse = {
        code,
        url: url.url,
        userId: url.userId,
        clicks: url.clicks,
      }
      urlsResponse.push(urlResponse)
    })

    return urlsResponse
  }
}
