import { useEffect } from "react";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from "./components/home/Home";
import Expertises from "./components/Expertise";
import Blog from "./components/blog/Blog";
import BlogDetails from "./components/blog/BlogDetails";
import References from "./components/project/References"
import ProjectDetails from "./components/project/ProjectDetails"
import ClientsPage from "./components/ClientsPage";


import PrismaGroupe from './components/prisma/PrismaGroupe';
import PrismaEvents from './components/prisma/PrismaEvents';
import PrismaLogestique from './components/prisma/PrismaLogestique';
import PrismaLab from './components/prisma/PrismaLab';


import AboutUs from "./components/prisma/AboutUs"
import Contact from "./components/Contact"
import PrismaStudio from './components/prisma/PrismaStudio';
import PrismaEspaceDeco from './components/prisma/PrismaEspaceDeco';
import Informations from "./components/agence/Information";
import Team from "./components/agence/team/Team";
import Actualities from "./components/agence/actualite/Actualities";
import ActualitieDetails from "./components/agence/actualite/ActualiteDetails";
import Philosophie from "./components/agence/Philosophie"


// Auth or User imports
import ListMessages from "./components/message/ListMessages.jsx";
import MessageDetails from "./components/message/MessageDetails.jsx";

import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import NewPassword from "./components/user/NewPassword";
import SignUp from "./components/user/SignUp";
import SignIn from "./components/user/SignIn";
import SignInForgotPassword from "./components/user/SignInForgotPassword";

// Admin routes 
import Dashboard from './components/admin/Dashboard.jsx'

import UsersList from "./components/admin/UsersList.jsx";
import UpdateUser from "./components/admin/UpdateUser.jsx";

import ProjectsList from "./components/admin/ProjectList.jsx";
import NewProject from "./components/admin/newProject.jsx";
import UpdateProject from "./components/admin/UpdateProject.jsx";
import ProjectReviews from "./components/admin/ProjectReviews.jsx";

import BlogsList from "./components/admin/BlogsList.jsx";
import NewBlog from "./components/admin/NewBlog.jsx";
import UpdateBlog from "./components/admin/UpdateBlog.jsx";

import ActualitesList from "./components/admin/ActualitesList.jsx";
import NewActualite from "./components/admin/newActualite.jsx";
import UpdateActualite from "./components/admin/UpdateActualite.jsx";

import TeamList from "./components/admin/TeamList.jsx";
import NewTeamMember from "./components/admin/newTeamMember.jsx";
import UpdateTeamMember from "./components/admin/UpdateTeamMember.jsx";

import MessagesList from "./components/admin/messagesList.jsx";
import ProcessMessage from "./components/admin/ProcessMessages.jsx";

import ProtectedRoute from "./components/route/ProtectedRoute";
import { loadUser } from "./actions/userActions.js";
import store from './store.jsx';


const App = () => {

  useEffect(() => {
    store.dispatch(loadUser())

  }, [])


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/agence/depuis-2008" element={<Informations />} />
        <Route path="/agence/team" element={<Team />} />
        <Route path="/agence/philosophie" element={<Philosophie />} />
        <Route path="/agence/actualites" element={<Actualities />} />
        <Route path="/agence/actualites/:id" element={<ActualitieDetails />} />


        <Route path="/expertises" element={<Expertises />} />
        <Route path="/references" element={<References />} />
        <Route path="/project/:id" element={<ProjectDetails />} />

        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/password/forgot" element={<SignInForgotPassword />} />
        <Route path="/password/reset/:token" element={<NewPassword/>}/>

        <Route element={<ProtectedRoute />}>
          <Route path="/messages/me" element={<ListMessages />} />
          <Route path="/message/:id" element={<MessageDetails />} />
          <Route path="/me" element={<Profile />} />
          <Route path="/me/update" element={<UpdateProfile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
        </Route>
    

        <Route path="/PrismaEvents" element={<PrismaEvents />} />
        <Route path="/PrismaGroupe" element={<PrismaGroupe />} />
        <Route path="/PrismaStudio" element={<PrismaStudio />} />
        <Route path="/PrismaLogestique" element={<PrismaLogestique />} />
        <Route path="/PrismaEspaceDeco" element={<PrismaEspaceDeco/>}/>
        <Route path="/PrismaLab" element={<PrismaLab />} />


        <Route path="/about" element={<AboutUs />} />
          
      </Routes>
      
      <Routes>
          <Route element={<ProtectedRoute isAdmin={true} />}>
              <Route path="/dashboard" element={<Dashboard />} exact />
          </Route>

          <Route element={<ProtectedRoute isAdmin={true} />}>
              <Route path="/admin/projects" element={<ProjectsList />} exact />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
              <Route path="/admin/project/new" element={<NewProject />} exact />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
              <Route path="/admin/project/:projectId" element={<UpdateProject />} exact />
          </Route>

          <Route element={<ProtectedRoute isAdmin={true} />}>
              <Route path="/reviews" element={<ProjectReviews />} exact />
          </Route>

          
          <Route element={<ProtectedRoute isAdmin={true} />}>
              <Route path="/admin/blogs" element={<BlogsList />} exact />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
              <Route path="/admin/blog/new" element={<NewBlog />} exact />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
              <Route path="/admin/blog/:id" element={<UpdateBlog />} exact />
          </Route>

          <Route element={<ProtectedRoute isAdmin={true} />}>
              <Route path="/admin/actualites" element={<ActualitesList />} exact />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
              <Route path="/admin/actualite/new" element={<NewActualite />} exact />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
              <Route path="/admin/actualite/:id" element={<UpdateActualite />} exact />
          </Route>

          <Route element={<ProtectedRoute isAdmin={true} />}>
              <Route path="/admin/team" element={<TeamList />} exact />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
              <Route path="/admin/team/new" element={<NewTeamMember />} exact />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
              <Route path="/admin/team/:id" element={<UpdateTeamMember />} exact />
          </Route>

          <Route element={<ProtectedRoute isAdmin={true} />}>
              <Route path="/admin/messages" element={<MessagesList />} exact />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
              <Route path="/admin/message/:id" element={<ProcessMessage />} exact />
          </Route>


          <Route element={<ProtectedRoute isAdmin={true} />}>
              <Route path="/admin/users" element={<UsersList />} exact />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
              <Route path="/admin/user/:userId" element={<UpdateUser />} exact />
          </Route>

        </Routes>
    </Router>
  );
};

export default App;