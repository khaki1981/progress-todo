import { useAppState } from '../hooks/useAppState';
import { ProgressCircle } from './ProgressCircle';
import { ProjectTabs } from './ProjectTabs';
import { SettingsDialog } from './SettingsDialog';
import { TodoList } from './TodoList';

export function HomeScreen() {
  const { activeProject, progress, projects } = useAppState();

  return (
    <main className="app-shell">
      <header className="app-shell__header">
        <div>
          <p className="app-shell__eyebrow">Progress Todo</p>
          <h1>Today</h1>
        </div>
      </header>

      <ProjectTabs
        activeProjectId={activeProject?.id ?? ''}
        projects={projects}
      />

      <div className="app-shell__content">
        <ProgressCircle progress={progress} />
        <TodoList todos={activeProject?.todos ?? []} />
      </div>

      <SettingsDialog isOpen={false} />
    </main>
  );
}
