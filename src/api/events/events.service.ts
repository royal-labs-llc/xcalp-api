import {Injectable} from '@nestjs/common'
import {EventsMongoDBService} from '../../storage/mongodb/services/events.service'
import {Events} from '../../models/event'

@Injectable()
export class EventsService {
  constructor(private eventsMongoDBService: EventsMongoDBService
  ) {}

  getEvents() {
    return this.eventsMongoDBService.getEvents()
  }

  createEvents(event: Events) {
    return this.eventsMongoDBService.createEvent(event)
  }

  deleteEventById(id: string): any {
    return this.eventsMongoDBService.deleteById(id)
  }
}
