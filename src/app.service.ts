import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { Db } from 'mongodb';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('MONGO') private database: Db,
  ) {}
  getHello(): string {
    const apiKey = this.configService.apiKey;
    const dbName = this.configService.database.name;
    return 'Hello World! ' + apiKey + ' ' + dbName;
  }

  getTasks() {
    const taskCollection = this.database.collection('tasks');
    return taskCollection.find({}).toArray();
  }
}
