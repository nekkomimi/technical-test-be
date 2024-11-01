import { Global, Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';

@Global()
@Module({
  imports: [],
  exports: [],
  providers: [JwtStrategy],
})
export class CoreModule {}
