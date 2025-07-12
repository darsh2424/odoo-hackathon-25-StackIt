import { Box } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import QuestionPage from './pages/QuestionPage';
import AskQuestionPage from './pages/AskQuestionPage';
import AuthPage from './pages/AuthPage';
import TagPage from './pages/TagPage';

function App() {
  return (
    <Box minH="100vh" bg="gray.50">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/questions/:id" element={<QuestionPage />} />
          <Route path="/ask-question" element={<AskQuestionPage />} />
          <Route path="/tags/:name" element={<TagPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;