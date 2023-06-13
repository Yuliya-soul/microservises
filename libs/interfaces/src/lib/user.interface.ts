export enum UserRole {
	Teacher = 'Teacher',
	Student = 'Student'
}

export enum SkillState {
	Started = 'Started',
	WaitingForUpgrade = 'Waiting for upgrade',
	InProgress='In progress',
	Canceled='Canceled'
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