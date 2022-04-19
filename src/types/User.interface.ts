export interface IUser {
	id: string;
	name: string;
	email: string;
	position: string;
	gender: string;
	isActive: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}
