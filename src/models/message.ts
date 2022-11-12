import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {IsString} from 'class-validator';
import {SchemaConstants} from '../storage/mongodb/constants'
import {Document} from 'mongoose'

export class Messages {
    @Prop()
    @IsString()
    messageRoom: string

    @Prop()
    @IsString()
    message: string

    @Prop()
    @IsString()
    timestamp: string

    @Prop()
    @IsString()
    recipient: string

    @Prop()
    @IsString()
    sender: string
}

@Schema(SchemaConstants)
export class MessagesModel extends Messages {}
export type MessagesDocument = MessagesModel & Document;
export const MessagesProvider = {
    name: Messages.name,
    schema: SchemaFactory.createForClass(MessagesModel),
};
