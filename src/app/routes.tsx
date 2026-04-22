import { createHashRouter, Navigate } from 'react-router';
import { Layout } from './components/Layout';
import { SpotlightLayout } from './components/SpotlightLayout';
import { DashboardPage } from './pages/DashboardPage';
import { SpotlightPage } from './pages/SpotlightPage';

// Placeholder for routes not yet built
const PlaceholderPage = ({ title }: { title: string }) => (
  <div style={{ padding: '48px 24px', maxWidth: '1200px', margin: '0 auto' }}>
    <div
      style={{
        background: 'var(--sttt-card-bg)',
        border: '1px solid var(--sttt-border)',
        borderRadius: '8px',
        padding: '48px',
        textAlign: 'center' as const,
      }}
    >
      <div style={{ fontSize: '22px', fontWeight: 700, color: '#000000', marginBottom: '8px' }}>
        {title}
      </div>
      <p style={{ fontSize: '14px', color: '#9ca3af' }}>This section is coming soon.</p>
    </div>
  </div>
);

export const router = createHashRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  // ── Portal shell (tab nav) ──
  {
    path: '/dashboard',
    Component: Layout,
    children: [
      { index: true, Component: DashboardPage },
      { path: 'sessions', element: <PlaceholderPage title="Sessions" /> },
      { path: 'marketing', element: <PlaceholderPage title="Marketing" /> },
      { path: 'submissions', element: <PlaceholderPage title="Submissions" /> },
      { path: 'reporting', element: <PlaceholderPage title="Reporting" /> },
    ],
  },
  // ── Public microsite shell (STTT public header + footer) ──
  {
    path: '/dashboard/spotlight',
    Component: SpotlightLayout,
    children: [{ index: true, Component: SpotlightPage }],
  },
]);
