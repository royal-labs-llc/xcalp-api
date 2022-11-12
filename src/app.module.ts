import {Module} from '@nestjs/common';
import {EventsModule} from './api/events/events.module'
import {ConfigModule} from '@nestjs/config'
import {MongodbModule} from './storage/mongodb/mongodb.module'

@Module({
  imports: [EventsModule, ConfigModule.forRoot({
    envFilePath: '.env'
  }), MongodbModule],
})
export class AppModule {}
