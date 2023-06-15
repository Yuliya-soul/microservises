import {  IsString } from 'class-validator';

export class UserSkillsDto {
    @IsString()
    id: string;
}
