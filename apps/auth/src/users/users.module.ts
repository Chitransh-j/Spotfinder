import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserDocument, Userschema } from './models/users.schema';
import { UsersRepository } from './users.repository';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: UserDocument.name, schema: Userschema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports:[UsersService]
})
export class UsersModule {}