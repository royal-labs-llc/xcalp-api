import {Module} from '@nestjs/common';
import {EventsModule} from './api/events/events.module'
import {ConfigModule} from '@nestjs/config'
import {MongodbModule} from './storage/mongodb/mongodb.module'
import {GatewayModule} from './gateway/gateway.module'

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env'
  }),EventsModule, MongodbModule, GatewayModule],
})
export class AppModule {}
