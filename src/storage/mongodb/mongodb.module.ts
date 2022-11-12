import {Global, Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'
import {ConfigModule, ConfigService} from '@nestjs/config'
import {EventsProvider} from '../../models/event'
import {EventsMongoDBService} from './services/events.service'

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
            EventsProvider
        ]),
    ],
    providers: [EventsMongoDBService],
    exports: [EventsMongoDBService],
})
export class MongodbModule {}
