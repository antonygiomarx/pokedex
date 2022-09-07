import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpAdapterService } from './http/http-adapter.service';
import { AxiosAdapterService } from './axios-adapter/axios-adapter.service';

@Module({
  providers: [HttpAdapterService, AxiosAdapterService],
  imports: [HttpModule],
  exports: [HttpAdapterService],
})
export class AdaptersModule {}
