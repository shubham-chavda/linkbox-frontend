import { DEFAULT_API_CONFIG } from './config/api.config';
import SimpleInterface from './config/simpleInterface';
import user from './routes/user';
import documents from './routes/documents';
import { DEFAULT_DOC_API_CONFIG } from './config/doc.config';

function init() {
	const client = SimpleInterface.init(DEFAULT_API_CONFIG);
	const docClient = SimpleInterface.init(DEFAULT_DOC_API_CONFIG);

	return {
		user: user(client),
		documents: documents(docClient),
	};
}
// const apis = init();
export default init;

