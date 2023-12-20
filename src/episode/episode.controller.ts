import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Auth } from 'src/auth/jwt/decorators/auth.decorator'
import { UpdateEpisodeDto } from './dto/update-episode.dto'
import { EpisodeService } from './episode.service'

@Controller('episodes')
export class EpisodeController {
	constructor(private readonly episodeService: EpisodeService) {}
	// Admin Place

	@Get('season/:id')
	@Auth('admin')
	async getAll(@Param('id') id: string) {
		return this.episodeService.getAll(+id)
	}

	@Put('toggle-visibility/:id')
	@HttpCode(200)
	@Auth('admin')
	async toggleVisibility(@Param('id') id: string) {
		return this.episodeService.toggleVisibility(+id)
	}

	@Get(':id')
	@Auth('admin')
	async get(@Param('id') id: string) {
		return this.episodeService.byId(+id)
	}

	@Post(':id')
	@HttpCode(200)
	@Auth('admin')
	async create(@Param('id') id: string) {
		return this.episodeService.create(+id)
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	@Auth('admin')
	async update(@Param('id') id: string, @Body() dto: UpdateEpisodeDto) {
		return this.episodeService.update(+id, dto)
	}

	@Delete(':id')
	@HttpCode(200)
	@Auth('admin')
	async delete(@Param('id') id: string) {
		return this.episodeService.delete(+id)
	}
}
