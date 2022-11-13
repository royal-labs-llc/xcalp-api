import {BadRequestException, Injectable} from '@nestjs/common'
import {EventsMongoDBService} from '../../storage/mongodb/services/events.service'
import {Events} from '../../models/event'
import {HttpService} from '@nestjs/axios'
import {ConfigService} from '@nestjs/config'

@Injectable()
export class EventsService {
  constructor(private eventsMongoDBService: EventsMongoDBService,
              private httpService: HttpService,
              private configService: ConfigService
  ) {}

  async getEvents() {
    const events = await this.eventsMongoDBService.getEvents();
    try {
      const projects = await this.httpService.post(
          this.configService.get('WEBMINT_API') +
          '/projects/list?api_key=' +
          this.configService.get('WEBMINT_API_KEY'),
          [
        events.map(_event => _event.contractAddress)
      ])
          .toPromise()
          .then(response => response.data)
      return events.map(_event => ({
        ..._event.toJSON(),
        project: projects.find(project => project.smartContracts.some(contract =>
            contract.deployedContracts.some(deployed =>
                deployed.contractAddress === _event.contractAddress)))
      }))
    }
    catch(ex) {
      console.log(ex)
      return []
    }
  }

  createEvents(event: Events) {
    return this.eventsMongoDBService.createEvent(event)
  }

  deleteEventById(id: string): any {
    return this.eventsMongoDBService.deleteById(id)
  }

    async registerPass(pass: string) {
      try {
        await this.httpService.put(
            this.configService.get('WEBMINT_API') +
            `/tokens/${pass}?api_key=` +
            this.configService.get('WEBMINT_API_KEY'), {
              add: [{
                trait_type: 'Claimed',
                value: 'YES'
              }]
            })
        return this.eventsMongoDBService.registerPass(pass)
      }catch(ex) {
        throw new BadRequestException()
      }
    }
}
