import { UrlRepository } from "../repositories/urlRepository";
import { decode, generateCode } from "../utils/generateCode";

type UrlResponse = {
    code: string
    url: string
    clicks: number
}

export class UrlService {
    urlRepository: UrlRepository;

    constructor(urlRepository: UrlRepository){
        this.urlRepository = urlRepository;
    }

    async createUrl(url: string): Promise<UrlResponse>{
        const findUrl = await this.urlRepository.findByUrl(url);

        if(findUrl.length !== 0) throw new Error('Url already exists');

        const newUrl = await this.urlRepository.create(url);

        const code = generateCode(newUrl[0].id);

        const urlResponse: UrlResponse ={
            code,
            url: newUrl[0].url,
            clicks: newUrl[0].clicks
        }

        return urlResponse;
    }

    async getAllUrls(): Promise<UrlResponse[]>{
        const urls = await this.urlRepository.findAll();
        const urlsResponse: UrlResponse[] = [];

        urls.forEach(url => {
            const code = generateCode(url.id);
            const urlResponse = {
                code,
                url: url.url,
                clicks: url.clicks
            };

            urlsResponse.push(urlResponse);
        })

        return urlsResponse;
    }

    async findUrlByCode(code: string): Promise<UrlResponse>{
        try {
            const id = decode(code)
            const findUrl = await this.urlRepository.findById(id);
    
            if(!findUrl) throw new Error('Url not found');
    
            await this.urlRepository.incrementClick(code);
    
            const url: UrlResponse = {
                code,
                url: findUrl.url,
                clicks: findUrl.clicks
            }
    
            return url;
        } catch (error) {
            throw error;
        }
    }
}