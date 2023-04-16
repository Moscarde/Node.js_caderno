import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Container from './components/layout/Container'
import Message from './components/layout/Message'


// Pages
import Login from './components/pages/Auth/Login'
import Register from './components/pages/Auth/Register'
import Home from './components/pages/Home'
import Profile from './components/pages/User/Profile'
import MyPets from './components/pages/Pets/MyPets'
import AddPet from './components/pages/Pets/AddPet'
import EditPet from './components/pages/Pets/EditPet'
import PetDetails from './components/pages/Pets/PetDetails'
import MyAdoptions from './components/pages/Pets/MyAdoptions'

// Context
import { UserProvider } from './context/UserContext'

function App() {
	return (
		<Router>
			<UserProvider>
				<Navbar />
				<Message/>
				<Container>
					<Routes>
						<Route path="/pets/myadoptions" element={<MyAdoptions />} />
						<Route path="/pets/edit/:id" element={<EditPet />} />
						<Route path="/pet/:id" element={<PetDetails />} />
						<Route path="/pets/add" element={<AddPet />} />
						<Route path="/pets/mypets" element={<MyPets />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/user/profile" element={<Profile />} />
						<Route path="/" element={<Home />} />
					</Routes>
				</Container>
				<Footer />
			</UserProvider>
		</Router>
	);
}

export default App;
