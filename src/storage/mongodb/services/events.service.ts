import {Injectable} from '@nestjs/common'
import {Model} from 'mongoose'
import {InjectModel} from '@nestjs/mongoose'
import {Events, EventsDocument} from '../../../models/event'

@Injectable()
export class EventsMongoDBService {
    constructor(
        @InjectModel(Events.name)
        private document: Model<EventsDocument>,
    ) {}

    createEvent(event: Events) {
        return this.document.create(event)
    }

    getById(id: string) {
        return this.document.findById(id).exec()
    }

    deleteById(id: string) {
        return this.document.deleteOne({
            _id: id
        }).exec()
    }

    getEvents() {
        return this.document.find().exec()
    }
}
