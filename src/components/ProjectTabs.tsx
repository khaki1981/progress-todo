import { useEffect, useRef, type CSSProperties } from 'react';
import type { Project } from '../types/app';
import { ALL_TAB_COLOR, getProjectColor } from '../utils/todoColors';

type ProjectTabsProps = {
  projects: Project[];
  activeProjectId: string;
  onAddProject: () => void;
  onSelectProject: (projectId: string) => void;
};

type ProjectTabStyle = CSSProperties & {
  '--project-tab-color': string;
};

const getProjectTabStyle = (color: string): ProjectTabStyle => ({
  '--project-tab-color': color,
});

export function ProjectTabs({
  activeProjectId,
  onAddProject,
  onSelectProject,
  projects,
}: ProjectTabsProps) {
  const tabListRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const activeTab = tabListRef.current?.querySelector<HTMLElement>(
      '.project-tabs__tab[data-active="true"]',
    );

    activeTab?.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
    });
  }, [activeProjectId, projects.length]);

  return (
    <nav className="project-tabs" aria-label="Projects" ref={tabListRef}>
      <button
        aria-pressed={activeProjectId === ''}
        className="project-tabs__tab"
        data-active={activeProjectId === ''}
        onClick={() => onSelectProject('')}
        style={getProjectTabStyle(ALL_TAB_COLOR)}
        type="button"
      >
        <span className="project-tabs__label">すべて</span>
      </button>
      {projects.map((project, index) => (
        <button
          aria-pressed={project.id === activeProjectId}
          className="project-tabs__tab"
          data-active={project.id === activeProjectId}
          key={project.id}
          onClick={() => onSelectProject(project.id)}
          style={getProjectTabStyle(getProjectColor(project.color, index))}
          title={project.name}
          type="button"
        >
          <span className="project-tabs__label">{project.name}</span>
        </button>
      ))}
      <button
        className="project-tabs__add"
        onClick={onAddProject}
        type="button"
        aria-label="プロジェクトを追加"
      >
        +
      </button>
    </nav>
  );
}
