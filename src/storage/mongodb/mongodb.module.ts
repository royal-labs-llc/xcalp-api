import {Global, Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'
import {ConfigModule, ConfigService} from '@nestjs/config'
import {EventsProvider} from '../../models/event'
import {EventsMongoDBService} from './services/events.service'
import {MessagesMongoDBService} from './services/message.service'
import {MessagesProvider} from '../../models/message'

@Global()
@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => ({
                uri: config.get('MONGO_URI'),
                dbName: config.get('MONGO_DB_NAME')
            }),
            inject: [ConfigService]
        }),
        MongooseModule.forFeature([
            EventsProvider,
            MessagesProvider
        ]),
    ],
    providers: [EventsMongoDBService, MessagesMongoDBService],
    exports: [EventsMongoDBService, MessagesMongoDBService],
})
export class MongodbModule {}
