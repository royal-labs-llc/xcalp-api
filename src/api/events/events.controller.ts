import {Body, Controller, Delete, Get, Param, Post, Query} from '@nestjs/common'
import {EventsService} from './events.service'
import {Events} from '../../models/event'

@Controller('events')
export class EventsController {
    constructor(private eventsService: EventsService) {}

    @Post()
    createEvent(@Body() event: Events) {
        return this.eventsService.createEvents(event)
    }

    @Get()
    getEvents() {
        return this.eventsService.getEvents()
    }

    @Post('register/:pass')
    registerPass(@Param('pass') pass: string, @Query('address') address: string) {
        return this.eventsService.registerPass(pass)
    }

    @Delete(':id')
    deleteEventById(@Param('id') id: string) {
        return this.eventsService.deleteEventById(id)
    }
}
