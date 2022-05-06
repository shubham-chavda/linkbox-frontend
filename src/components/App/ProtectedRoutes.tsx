import React, { useEffect } from 'react';
// import { useDispatch } from 'react-redux';

import { Outlet, Route } from 'react-router-dom';
import FileListing from '../../views/FileListing/FileListing';

export const ProtectedRoutes: React.FC = () => {
	console.log('ProtectedRoutes');
	// const dispatch = useDispatch();
	useEffect(() => {
		// if (window.localStorage.getItem('token')) {
		// 	dispatch(getUserDetails());
		// } else {
		// 	history.navigate?.('/login');
		// }
	}, []);

	// const isGlobalLoading = useSelector((state) => state.global.globalLoading);
	// const isAuth = useSelector((state) => (state.global.user ? true : false));
	// if (isGlobalLoading) {
	// 	return <Spinner />;
	// }
	// if (!isAuth) {
	// 	return <Navigate to="/login" />;
	// }
	return (
		<>
			{/* <Route path="/documents" element={<FileListing />} /> */}
			<Outlet />
		</>
	);
};
