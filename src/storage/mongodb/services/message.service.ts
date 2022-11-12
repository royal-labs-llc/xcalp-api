import {Injectable} from '@nestjs/common'
import {Model} from 'mongoose'
import {InjectModel} from '@nestjs/mongoose'
import {Messages, MessagesDocument} from '../../../models/message'

@Injectable()
export class MessagesMongoDBService {
    constructor(
        @InjectModel(Messages.name)
        private document: Model<MessagesDocument>,
    ) {}

    createMessage(message: Messages) {
        return this.document.create(message)
    }

    getAllMessages(address: string) {
        return this.document.find({
            $or: [
                {
                    recipient: address
                },
                {
                    sender: address
                }
            ]
        }).exec()
    }
}
