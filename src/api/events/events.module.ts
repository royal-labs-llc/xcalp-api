import {Module} from '@nestjs/common'
import {EventsController} from './events.controller'
import {EventsService} from './events.service'
import {HttpModule} from '@nestjs/axios'
import {ConfigModule} from '@nestjs/config'

@Module({
    imports: [HttpModule, ConfigModule],
    controllers: [EventsController],
    providers: [EventsService]
})
export class EventsModule {}
