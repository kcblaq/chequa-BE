import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class Dtonotify {
	
	@IsNotEmpty()
	@IsEmail()
	email: string;
}
