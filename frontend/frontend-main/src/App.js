import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddArticlePage from './pages/AddArticlePage';
import Articlespage from './pages/ArticlesPage';
import ArticlesPageAdmin from './pages/ArticlesPageAdmin';
import HomePage from './pages/homePage.js';
import journalistPage from './pages/journalistPage.js';
import ShowAllJournalist from './pages/ShowAllJournalist.js';
import AdminPage from './pages/AdminPage.js';
import SearchPage from './pages/SearchPage';
import Layout from './components/Layout';
import LayoutJournalist from './components/LayoutJournalist.js';
import LayoutAdmin from './components/LayoutAdmin.js';
import DraftsPage from './pages/drafts';
import UpdateDraftPage from './pages/UpdateDraftPage';
import Register from "./pages/Register.js";
import Profile from "./pages/Profile.js";
import Password from "./pages/password.js";
import UserName from "./pages/userName.js";
import Topic from "./pages/Topic.js";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserName />} />
        <Route path="/password" element={<Password />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/topic" element={<Topic />} />
        <Route path="/home" element={<Layout><HomePage /></Layout>}/>
        <Route path="/journalistPage" element={<LayoutJournalist><journalistPage /></LayoutJournalist>}/>
        <Route path="/articles"element={<Layout><Articlespage /></Layout>}/>
        <Route path="/journalistArticles"element={<LayoutJournalist><Articlespage /></LayoutJournalist>}/>
        <Route path="/articles/add"element={<LayoutJournalist><AddArticlePage /></LayoutJournalist>}/>
        <Route path="/drafts"element={<LayoutJournalist><DraftsPage /></LayoutJournalist>}/>
        <Route path="/updatedraftpage/:id"element={<LayoutJournalist><UpdateDraftPage /></LayoutJournalist>}/>
        <Route path="/AdminPage" element={<LayoutAdmin><AdminPage /></LayoutAdmin>}/>
        <Route path="/ArticlesPageAdmin"element={<LayoutAdmin><ArticlesPageAdmin /></LayoutAdmin>}/>
        <Route path="/publisher"element={<LayoutAdmin><ShowAllJournalist /></LayoutAdmin>}/>
        <Route path="/search-results/:searchTerm"element={<Layout><SearchPage /></Layout>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;