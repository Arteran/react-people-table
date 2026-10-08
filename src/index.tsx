import { createRoot } from 'react-dom/client';
import {
  Route,
  HashRouter as Router,
  Routes,
  Navigate,
} from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { ErorrPage, HomePage } from './components/SimpleComponents';
import { PeoplePage } from './components/PeoplePage';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />}></Route>

        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="people/" element={<PeoplePage />}>
          <Route path=":slug" element={<PeoplePage />}></Route>
        </Route>

        <Route path="*" element={<ErorrPage />}></Route>
      </Route>

      <Route path="*" element={<ErorrPage />}></Route>
    </Routes>
  </Router>,
);
