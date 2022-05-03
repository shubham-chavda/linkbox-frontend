import { ISimpleInterface } from '../config/simpleInterface';
const { API_URL } = process.env;

export default (base: ISimpleInterface) => {
	return {
		async login(data: any) {
			console.log("🚀 ~ file: user.ts ~ line 6 ~ login ~ API_URL",)
			// return base.post('auth/login',data);

			// https://b6b4-43-249-234-229.ngrok.io/v1/auth/login
			return await fetch(`${API_URL}auth/login`, {
				method: 'POST',
				mode: 'cors',
				redirect: 'follow',
				credentials: 'include', // Don't forget to specify this if you need cookies
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Credentials': 'true',
				},
				body: JSON.stringify(data)
			}).then(res => res.json()).then(function (data) {
				return data
			});
		},
		getUserData() {
			return base.detail('auth/me');
		}
	};
};
