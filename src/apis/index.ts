import { DEFAULT_API_CONFIG } from './config/api.config';
import SimpleInterface from './config/simpleInterface';
import user from './routes/user';

// import User from './User';

function init() {
	const client = SimpleInterface.init(DEFAULT_API_CONFIG);

	return {
		user: user(client)
	};
}
const apis = init();
export default apis;

// export default {
// 	init() {
// 		const client = SimpleInterface.init(DEFAULT_API_CONFIG);

// 		return {
// 			user: user(client)
// 		};
// 	}
// };
