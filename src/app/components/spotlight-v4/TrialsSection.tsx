import React from 'react';
import { ExternalLink, FlaskConical, Clock, AlertCircle } from 'lucide-react';
import { trialsV4, bestPracticeSessions, type TrialV4 } from './data';

const FONT = 'gotham, sans-serif';
const MAROON = '#8B1F2D';

const statusColor: Record<string, { bg: string; border: string; text: string }> = {
  Completed: { bg: '#F0F9FF', border: '#BAE6FD', text: '#0369A1' },
  Recruiting: { bg: '#F0FDF4', border: '#BBF7D0', text: '#15803D' },
  Pending: { bg: '#FFFBEB', border: '#FDE68A', text: '#92400E' },
};

const TrialRow: React.FC<{ t: TrialV4 }> = ({ t }) => {
  const sc = statusColor[t.status] ?? statusColor.Pending;
  return (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', borderBottom:'1px solid var(--oav-border)' }}>
      <div style={{ flex:1 }}>
        <span style={{ fontSize:'14px', fontWeight:400, color:'#000', fontFamily:FONT }}>{t.name}</span>
        {t.note && <span style={{ fontSize:'12px', color:'#6B7280', fontFamily:FONT, marginLeft:'8px' }}>({t.note})</span>}
      </div>
      <span style={{ background:sc.bg, color:sc.text, border:`1px solid ${sc.border}`, borderRadius:'9999px', padding:'2px 10px', fontSize:'11px', fontWeight:500, fontFamily:FONT, whiteSpace:'nowrap' as const }}>{t.status}</span>
    </div>
  );
};

const TrialGroup: React.FC<{ title: string; subtitle?: string; trials: TrialV4[] }> = ({ title, subtitle, trials }) => {
  if (trials.length === 0) return null;
  return (
    <div style={{ marginBottom:'28px' }}>
      <div style={{ fontSize:'15px', fontWeight:700, color:MAROON, fontFamily:FONT, marginBottom:'4px' }}>{title}</div>
      {subtitle && <div style={{ fontSize:'12px', color:'#9CA3AF', fontFamily:FONT, marginBottom:'8px' }}>{subtitle}</div>}
      <div style={{ background:'var(--oav-card-bg)', border:'1px solid var(--oav-border)', borderRadius:'8px', padding:'4px 16px' }}>
        {trials.map(t => <TrialRow key={t.id} t={t} />)}
      </div>
    </div>
  );
};

export const TrialsSection: React.FC = () => {
  const past = trialsV4.filter(t => t.category === 'past-uchicago');
  const enrollUC = trialsV4.filter(t => t.category === 'enrolling-uchicago');
  const upcomingUC = trialsV4.filter(t => t.category === 'upcoming-uchicago');
  const enrollEnd = trialsV4.filter(t => t.category === 'enrolling-endeavor');
  const alPlaceholder = trialsV4.filter(t => t.category === 'al-placeholder');

  return (
    <section style={{ background:'var(--oav-page-bg)', padding:'56px 0' }}>
      <div className="trials-section-inner">

        {/* Section heading */}
        <div style={{ marginBottom:'32px' }}>
          <h2 style={{ fontSize:'28px', fontWeight:300, color:'#000', margin:0, fontFamily:FONT, display:'flex', alignItems:'center', gap:'10px' }}>
            <FlaskConical size={24} color={MAROON} />
            Clinical Trials
          </h2>
          <p style={{ fontSize:'14px', color:'#9CA3AF', marginTop:'8px', marginBottom:0, fontFamily:FONT }}>
            TTR perspective — past, current, and upcoming trials across both sites
          </p>
          <a
            href="https://clinicaltrials.gov"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display:'inline-flex', alignItems:'center', gap:'4px', fontSize:'14px', color:'#005EB8', textDecoration:'none', marginTop:'8px', fontFamily:FONT }}
          >
            <ExternalLink size={13} /> View all on ClinicalTrials.gov
          </a>
        </div>

        <TrialGroup title="Past Trials at UChicago (TTR)" subtitle="Trials we've been part of" trials={past} />
        <TrialGroup title="Currently Enrolling at UChicago" trials={enrollUC} />
        <TrialGroup title="Upcoming Trials at UChicago" trials={upcomingUC} />
        <TrialGroup title="Currently Enrolling at Endeavor Health" trials={enrollEnd} />

        {/* AL placeholder */}
        {alPlaceholder.length > 0 && (
          <div style={{ border:'1px dashed #FDE68A', borderRadius:'8px', padding:'16px 20px', background:'#FFFBEB', display:'flex', alignItems:'flex-start', gap:'12px', marginBottom:'28px' }}>
            <AlertCircle size={18} color="#D97706" style={{ flexShrink:0, marginTop:'2px' }} />
            <div>
              <div style={{ fontSize:'13px', fontWeight:700, color:'#92400E', fontFamily:FONT, marginBottom:'4px' }}>AL Amyloidosis Trials — Pending</div>
              <p style={{ fontSize:'13px', color:'#92400E', margin:0, fontFamily:FONT, lineHeight:1.6 }}>
                Awaiting input from Dr. Derman and Dr. Cooperrider on AL trials to feature.
              </p>
            </div>
          </div>
        )}

        {/* ── Monday Best Practice Sessions ── */}
        <div style={{ marginTop:'40px' }}>
          <h2 style={{ fontSize:'24px', fontWeight:300, color:'#000', margin:'0 0 4px 0', fontFamily:FONT, display:'flex', alignItems:'center', gap:'8px' }}>
            <Clock size={20} color={MAROON} />
            Monday Best Practice Sessions — June
          </h2>
          <p style={{ fontSize:'14px', color:'#9CA3AF', margin:'0 0 16px 0', fontFamily:FONT }}>
            Additional sessions for team members and support staff to present
          </p>
          <div style={{ background:'var(--oav-card-bg)', border:'1px solid var(--oav-border)', borderRadius:'8px', overflow:'hidden' }}>
            {bestPracticeSessions.map((s, i) => (
              <div key={s.id} style={{ padding:'12px 16px', borderBottom: i < bestPracticeSessions.length - 1 ? '1px solid var(--oav-border)' : 'none', display:'flex', gap:'12px', alignItems:'center' }}>
                <div style={{ width:'90px', flexShrink:0, fontSize:'13px', fontWeight:600, color:MAROON, fontFamily:FONT }}>{s.date.replace('Monday, ','')}</div>
                <div style={{ fontSize:'14px', color:'#000', fontFamily:FONT, lineHeight:1.4 }}>{s.title}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
