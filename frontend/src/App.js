import { useEffect , useState} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';


// Blog imports
import BlogsPage from "./components/blog/BlogsPage"
import BlogDetails from "./components/blog/BlogDetails"


// Auth or User imports
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";

// Admin imports
import Dashboard from "./components/admin/Dashboard";

import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";

import ProjectsList from "./components/admin/ProjectList";
import NewProject from "./components/admin/newProject";
import UpdateProject from "./components/admin/UpdateProject";
import ProjectReviews from "./components/admin/ProjectReviews";

import BlogsList from "./components/admin/BlogsList";
import NewBlog from "./components/admin/NewBlog";
import UpdateBlog from "./components/admin/UpdateBlog";

import ActualitesList from "./components/admin/ActualitesList";
import NewActualite from "./components/admin/newActualite";
import UpdateActualite from "./components/admin/UpdateActualite";

import TeamList from "./components/admin/TeamList";
import NewTeamMember from "./components/admin/newTeamMember";
import UpdateTeamMember from "./components/admin/UpdateTeamMember";

import MessagesList from "./components/admin/messagesList";
import ProcessMessage from "./components/admin/ProcessMessages";


import ProtectedRoute from "./components/route/ProtectedRoute";
import { loadUser } from "./actions/userActions";
import { useSelector } from 'react-redux'
import store from './store';




function App() {

  useEffect(() => {
    store.dispatch(loadUser())

  }, [])

  const { user, loading } = useSelector(state => state.auth)

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" Component={Home} exact />
            <Route path="/search/:keyword" Component={Home} />

            <Route path="/blog/:id" Component={BlogDetails} exact />

            <Route path="/blogspage" Component={BlogsPage} exact />



            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path="/password/forgot" Component={ForgotPassword} exact />
            <Route path="/password/reset/:token" Component={NewPassword}/>

            <Route element={<ProtectedRoute />}>
              <Route path="/me" element={<Profile />} />
              <Route path="/me/update" element={<UpdateProfile />} />
              <Route path="/password/update" element={<UpdatePassword />} />
            </Route>

          </Routes>

        </div>
        
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
        
        {!loading && user && user.role !== 'admin' && (
            <Footer />
        )}
      </div>
    </Router>
  );
}

export default App;
