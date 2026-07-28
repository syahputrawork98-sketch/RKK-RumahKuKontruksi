import PublicIcon from '../../components/icons/PublicIcon';
import { workProcessPhaseIcons } from './workProcessVisuals';

export default function ProcessPhaseCard({ phase }) {
  const iconName = workProcessPhaseIcons[phase.number] || 'info';

  return (
    <div className="phase-card timeline-node" data-phase-number={phase.number}>
      <div className="phase-header">
        <div className="phase-badge" data-icon={iconName}>
          <PublicIcon name={iconName} size={18} />
          <span className="phase-number">Fase {phase.number}</span>
        </div>
        <h3 className="phase-title">{phase.title}</h3>
      </div>
      
      <p className="phase-summary">{phase.summary}</p>
      
      <div className="phase-section phase-purpose">
        <div className="phase-section-title">
          <PublicIcon name="target" size={16} />
          <span>Tujuan</span>
        </div>
        <p>{phase.purpose}</p>
      </div>
      
      <div className="phase-section phase-outputs">
        <div className="phase-section-title">
          <PublicIcon name="file-text" size={16} />
          <span>Keluaran Konseptual</span>
        </div>
        <ul className="phase-outputs-list">
          {phase.outputs.map((output, idx) => (
            <li key={idx}>{output}</li>
          ))}
        </ul>
      </div>
      
      <div className="phase-section phase-decision">
        <div className="phase-section-title">
          <PublicIcon name="shield-check" size={16} />
          <span>Titik Keputusan</span>
        </div>
        <p>{phase.decision}</p>
      </div>
      
      <div className="phase-section phase-next">
        <div className="phase-section-title">
          <PublicIcon name="chevron-right" size={16} />
          <span>Kemungkinan Jalur Berikutnya</span>
        </div>
        <p>{phase.next}</p>
      </div>
      
      {phase.notice && (
        <div className="phase-notice">
          <PublicIcon name="info" size={16} />
          <span>{phase.notice}</span>
        </div>
      )}
    </div>
  );
}
