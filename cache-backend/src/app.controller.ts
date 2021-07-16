import { Controller, Get, CACHE_MANAGER, Inject, UseInterceptors,
  CacheInterceptor, CacheKey, CacheTTL  } from '@nestjs/common';
import { AppService } from './app.service';
import { Cache } from 'cache-manager';
import { CacheModel } from './interfaces/cacheModel';


@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  fakeString : CacheModel = { "key1" : "1"
  };

  constructor(private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache) {}
    
    @Get("auto-cache")
    @CacheKey('my-string')
    @CacheTTL(300)
    get(){
      return this.fakeString;
    }
  @Get()
  async getHello() {
    return this.appService.getHello();
  }

  @Get("fetch")
  async setGetSimpleString(){
    var value = await this.cacheManager.get('my-string');
    console.log('value',value)
    if(value){
      return {
        data: value,
        loadsFrom: 'redis cache'
      }
    }
    console.log('this.fakeString',this.fakeString)
    await this.cacheManager.set('my-string', JSON.stringify(this.fakeString), {ttl: 600});
    return{
      data:this.fakeString,
      loadsFrom:'fake database'
    }
  }

}
