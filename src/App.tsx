import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppNavigate } from './components/App/AppNavigate';
import { ProtectedRoutes } from './components/App/ProtectedRoutes';
import NotFound from './components/NotFound';
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import FileListing from './views/FileListing/FileListing';
import history from './history';
import { useAppDispatch } from './hooks/useAppDispatch';
import { useAppSelector } from './hooks/useAppSelector';
import { getUserDetails } from './store/global/globalReducer';
const App: React.FC = () => {
	const dispatch = useAppDispatch();

	const isUserExist = useAppSelector((state) => state.global.user);

	useEffect(() => {
		if (window.localStorage.getItem('token')) {
			if (!isUserExist) dispatch(getUserDetails());
		} else history.navigate?.('/login');
	}, []);
	return (
		<BrowserRouter>
			<AppNavigate />
			<Routes>
				<Route path="/" element={<ProtectedRoutes />}>
					<Route index element={<FileListing />} />
					{/* <Route path="/" element={<FileListing />} /> */}
					<Route path="/documents" element={<Home />} />
					<Route path="*" element={<NotFound />} />
				</Route>

				<Route path="/login" element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
