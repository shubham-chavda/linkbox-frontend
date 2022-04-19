import { useNavigate } from 'react-router-dom';
import History from '../../history';

export const AppNavigate = () => {
	History.navigate = useNavigate();

	return null;
};
