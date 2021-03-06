import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import history from './history';
import Home from './views/Home/Home';
import LeftMenu from './views/LeftMenus/LeftMenu';
import Login from './views/Login/Login';
import NotFound from './components/NotFound';
import { useAppDispatch } from './hooks/useAppDispatch';
import { useAppSelector } from './hooks/useAppSelector';
import FileListing from './views/FileListing/FileListing';
import { AppNavigate } from './components/App/AppNavigate';
import { getUserDetails } from './store/global/globalReducer';
import { ProtectedRoutes } from './components/App/ProtectedRoutes';

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
					{/* <Route path="/" element={<FileListing />} /> */}
					<Route path="/" element={<Navigate to="/documents" />} />
					<Route path="/documents" element={<FileListing />} />
					<Route path="/profile" element={<LeftMenu />} />
					<Route path="/document-detail/:id" element={<Home />} />
					<Route path="*" element={<NotFound />} />
				</Route>
				<Route path="/login" element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
