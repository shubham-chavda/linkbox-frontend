import { ISimpleInterface } from '../config/simpleInterface';

export default (base: ISimpleInterface) => {
	return {
		getUserData() {
            console.log("🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 ~ file: user.ts ~ line 6 ~ getUserData ~ getUserData")
			return base.detail('user/details');
		}
	};
};
