export default function ProcessPhaseCard({ phase }) {
  return (
    <div className="phase-card">
      <div className="phase-header">
        <div className="phase-number">Fase {phase.number}</div>
        <h3 className="phase-title">{phase.title}</h3>
      </div>
      
      <p className="phase-summary">{phase.summary}</p>
      
      <div className="phase-section">
        <div className="phase-section-title">Tujuan</div>
        <p>{phase.purpose}</p>
      </div>
      
      <div className="phase-section">
        <div className="phase-section-title">Keluaran Konseptual</div>
        <ul className="phase-outputs-list">
          {phase.outputs.map((output, idx) => (
            <li key={idx}>{output}</li>
          ))}
        </ul>
      </div>
      
      <div className="phase-section">
        <div className="phase-section-title">Titik Keputusan</div>
        <p>{phase.decision}</p>
      </div>
      
      <div className="phase-section">
        <div className="phase-section-title">Kemungkinan Jalur Berikutnya</div>
        <p>{phase.next}</p>
      </div>
      
      {phase.notice && (
        <div className="phase-notice">
          {phase.notice}
        </div>
      )}
    </div>
  );
}
