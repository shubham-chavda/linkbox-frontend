import {
	useSelector as useSelectorTyped,
	TypedUseSelectorHook
} from 'react-redux';
import { RootState } from '../store/types';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelectorTyped;
