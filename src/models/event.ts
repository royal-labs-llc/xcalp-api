import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {IsNumber, IsString} from 'class-validator';
import {SchemaConstants} from '../storage/mongodb/constants'
import {Document} from 'mongoose'

export interface IEvents {
    contractAddress: string
    eventName: string;
    eventDescription: string;
    eventDateTime: number;
    eventLocation: string;
}

export class Events implements IEvents {
    @Prop()
    @IsString()
    contractAddress: string

    @Prop()
    @IsNumber()
    eventDateTime: number

    @Prop()
    @IsString()
    eventDescription: string

    @Prop()
    @IsString()
    eventLocation: string

    @Prop()
    @IsString()
    eventName: string

    @Prop()
    @IsString({ each: true })
    claimedPasses: string[]
}

@Schema(SchemaConstants)
export class EventsModel extends Events {}
export type EventsDocument = EventsModel & Document;
export const EventsProvider = {
    name: Events.name,
    schema: SchemaFactory.createForClass(EventsModel),
};
