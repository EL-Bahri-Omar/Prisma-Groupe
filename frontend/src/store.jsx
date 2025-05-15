import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { projectsReducer, newProjectReducer, projectReducer, projectDetailsReducer, newReviewReducer, projectReviewsReducer, reviewReducer } from './reducers/projectReducers';
import { newMessageReducer, myMessagesReducer, messageDetailsReducer, allMessagesReducer, messageReducer } from "./reducers/messageReducers";
import { blogsReducer, blogReducer, newBlogReducer, blogDetailsReducer } from './reducers/blogReducers';
import { actualitesReducer, actualiteReducer, newActualiteReducer, actualiteDetailsReducer } from './reducers/actualiteReducers';
import { teamMembersReducer, teamMemberReducer, newTeamMemberReducer, teamMemberDetailsReducer } from './reducers/teamReducers';
import { authReducer, userReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer } from "./reducers/userReducers";

const reducer = combineReducers({

  projects: projectsReducer,
  newProject: newProjectReducer,
  project: projectReducer,
  projectReviews: projectReviewsReducer,
  projectDetails: projectDetailsReducer,
  review: reviewReducer,
  newReview: newReviewReducer,

  newMessage: newMessageReducer,
  myMessages: myMessagesReducer,
  allMessages: allMessagesReducer,
  messageDetails: messageDetailsReducer,
  message: messageReducer,

  blogs: blogsReducer,
  newBlog: newBlogReducer,
  blog: blogReducer,
  blogDetails: blogDetailsReducer,

  actualites: actualitesReducer,
  newActualite: newActualiteReducer,
  actualite: actualiteReducer,
  actualiteDetails: actualiteDetailsReducer,

  teamMembers: teamMembersReducer,
  newTeamMember: newTeamMemberReducer,
  teamMember: teamMemberReducer,
  teamMemberDetails: teamMemberDetailsReducer,

  auth: authReducer,
  user: userReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  forgotPassword: forgotPasswordReducer
});



const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
