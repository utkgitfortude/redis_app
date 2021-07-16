import { Component } from '@angular/core';
// import  { RedisClient } from "redis";
import * as redis from "redis";
import * as redisStore from 'cache-manager-redis-store';

// const client = createClient();
// console.log('client',client)
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cache-frontend';

  ngOnInit(){
    // const client : any = redis.createClient({
    //   port : 6379,
    //   host : 'localhost'
    // })
    // console.log('client',client)
  }

}