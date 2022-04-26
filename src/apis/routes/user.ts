import { ISimpleInterface } from '../config/simpleInterface';

export default (base: ISimpleInterface) => {
	return {
		login(data:any){
			return base.post('auth/login',data);
		},
		getUserData() {
            return base.detail('auth/me');
		}
	};
};
