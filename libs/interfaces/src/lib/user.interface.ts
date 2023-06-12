export enum UserRole {
	Teacher = 'Teacher',
	Student = 'Student'
}

export enum SkillState {
	None = 'None',
	Junior = 'Junior',
	Middle='Middle',
	Advanced='Advanced'
}

export interface IUser {
	_id?: string;
	displayName?: string;
	email: string;
	passwordHash: string;
	role: UserRole;
	skills?: IUserSkills[];
}

export interface IUserSkills {
	_id?: string;
	skillId: string;
	skillState: SkillState;
}