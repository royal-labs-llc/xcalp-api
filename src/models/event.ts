import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {ApiProperty} from '@nestjs/swagger';
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
    @ApiProperty()
    @Prop()
    @IsString()
    contractAddress: string

    @ApiProperty()
    @Prop()
    @IsNumber()
    eventDateTime: number

    @ApiProperty()
    @Prop()
    @IsString()
    eventDescription: string

    @ApiProperty()
    @Prop()
    @IsString()
    eventLocation: string

    @ApiProperty()
    @Prop()
    @IsString()
    eventName: string
}

@Schema(SchemaConstants)
export class EventsModel extends Events {}
export type EventsDocument = EventsModel & Document;
export const EventsProvider = {
    name: Events.name,
    schema: SchemaFactory.createForClass(EventsModel),
};
