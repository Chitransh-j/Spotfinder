import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from '@app/common';
import { UserDocument, userschema } from './models/users.schema';
import { UsersRepository } from './users.repository';

@Module({
  imports:[DatabaseModule,
    DatabaseModule.forFeature([{name: UserDocument.name,schema:userschema}])],
  controllers: [UsersController],
  providers: [UsersService,UsersRepository]
})
export class UsersModule {}
