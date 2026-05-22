import { createHashRouter } from 'react-router';
import { SpotlightLayout } from './components/SpotlightLayout';
import { SpotlightPageV5 } from './pages/SpotlightPageV5';

export const router = createHashRouter([
  // UChicago custom domain root.
  {
    path: '/',
    Component: SpotlightLayout,
    children: [{ index: true, Component: SpotlightPageV5 }],
  },
]);
