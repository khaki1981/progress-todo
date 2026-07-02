import { useAppState } from '../hooks/useAppState';
import { ProgressCircle } from './ProgressCircle';
import { ProjectTabs } from './ProjectTabs';
import { SettingsDialog } from './SettingsDialog';
import { TodoList } from './TodoList';

const formatToday = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const weekday = new Intl.DateTimeFormat('ja-JP', {
    weekday: 'long',
  }).format(today);

  return `${month}月${date}日 ${weekday} · いい調子！`;
};

export function HomeScreen() {
  const { activeProject, progress, projects } = useAppState();

  return (
    <main className="home-page">
      <section className="app-shell" aria-label="Progress Todo home">
        <div className="device-camera" aria-hidden="true" />

        <div className="status-bar" aria-hidden="true">
          <span>9:41</span>
          <div className="status-bar__icons">
            <span className="status-bar__signal">
              <span />
              <span />
              <span />
              <span />
            </span>
            <span className="status-bar__battery">
              <span />
            </span>
          </div>
        </div>

        <header className="app-shell__header">
          <div>
            <p className="app-shell__eyebrow">{formatToday()}</p>
            <h1>Progress Todo</h1>
          </div>
          <div className="app-shell__avatar" aria-hidden="true">
            PT
          </div>
        </header>

        <ProjectTabs
          activeProjectId={activeProject?.id ?? ''}
          projects={projects}
        />

        <ProgressCircle progress={progress} />
        <TodoList
          projectName={activeProject?.name ?? 'Progress Todo'}
          todos={activeProject?.todos ?? []}
        />

        <button className="add-fab" type="button" aria-label="Add todo">
          +
        </button>

        <div className="home-indicator" aria-hidden="true" />

        <SettingsDialog isOpen={false} />
      </section>
    </main>
  );
}
