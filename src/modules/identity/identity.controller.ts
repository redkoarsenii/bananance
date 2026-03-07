import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { IdentityService } from './identity.service';
import { UpdateIdentityDto } from './dto/update-identity.dto';
import { RegisterIdentityDto } from './dto/register-identity.dto';

@Controller('identity')
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  @Post()
  register(@Body() registerUser: RegisterIdentityDto) {
    return this.identityService.register(registerUser);
  }

  @Get()
  find(@Query('id') id?: string) {
    if (id) {
      return this.identityService.findOne(id);
    }
    return this.identityService.findAll();
  }

  @Patch()
  update(
    @Query('id') id: string,
    @Body() updateIdentityDto: UpdateIdentityDto,
  ) {
    return this.identityService.update(id, updateIdentityDto);
  }

  @Delete()
  remove(@Query('id') id: string) {
    return this.identityService.remove(id);
  }
}
