import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppNavigate } from './components/App/AppNavigate';
import { ProtectedRoutes } from './components/App/ProtectedRoutes';
import NotFound from './components/NotFound';
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import FileListing from './views/FileListing/FileListing';
const App: React.FC = () => {
	return (
		<BrowserRouter>
			<AppNavigate />
			<Routes>
				<Route path="/" element={<ProtectedRoutes />}>
					<Route index element={<FileListing />} />
					{/* <Route path="/" element={<FileListing />} /> */}
					<Route path="/documents" element={<Home />} />
					{/* <Route path="*" element={<NotFound />} /> */}
				</Route>

				<Route path="/login" element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
