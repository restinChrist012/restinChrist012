/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Sermons } from './pages/Sermons';
import { Commentary } from './pages/Commentary';
import { Reading } from './pages/Reading';
import { Discipleship } from './pages/Discipleship';
import { Community } from './pages/Community';
import { Prayer } from './pages/Prayer';
import { Healing } from './pages/Healing';
import { Admin } from './pages/Admin';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sermons" element={<Sermons />} />
          <Route path="/commentary" element={<Commentary />} />
          <Route path="/reading" element={<Reading />} />
          <Route path="/discipleship" element={<Discipleship />} />
          <Route path="/community" element={<Community />} />
          <Route path="/prayer" element={<Prayer />} />
          <Route path="/healing" element={<Healing />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </Router>
  );
}
