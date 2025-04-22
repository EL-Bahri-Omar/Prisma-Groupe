import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from "./Home";
import Expertises from "./Expertise";
import Blog from "./Blog";
import References from "./References"
import ClientsPage from "./ClientsPage";


import PrismaGroupe from './components/PrismaGroupe';
import PrismaEvents from './components/PrismaEvents';
import PrismaLogestique from './components/PrismaLogestique';
import PrismaLab from './components/PrismaLab';


import AboutUs from "./components/AboutUs"
import Contact from "./components/Contact"
import PrismaStudio from './components/PrismaStudio';
import PrismaEspaceDeco from './components/PrismaEspaceDeco';
import Informations from "./Information";
import Team from "./Team";
import Actualities from "./Actualities";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/expertises" element={<Expertises />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/references" element={<References />} />
        <Route path="/agence/depuis-2008" element={<Informations />} />
        <Route path="/agence/team" element={<Team />} />
        <Route path="/agence/actualites" element={<Actualities />} />

        <Route path="/PrismaEvents" element={<PrismaEvents />} />
        <Route path="/PrismaGroupe" element={<PrismaGroupe />} />
        <Route path="/PrismaStudio" element={<PrismaStudio />} />
        <Route path="/PrismaLogestique" element={<PrismaLogestique />} />
        <Route path="/PrismaEspaceDeco" element={<PrismaEspaceDeco/>}/>
        <Route path="/PrismaLab" element={<PrismaLab/>}/>



        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  );
};

export default App;