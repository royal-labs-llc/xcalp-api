import {Module} from '@nestjs/common'
import {MessageGateway} from './gateway.service'

@Module({
    providers: [MessageGateway]
})
export class GatewayModule {}
