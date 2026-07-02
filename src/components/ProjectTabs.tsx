import { useEffect, useRef } from 'react';
import type { Project } from '../types/app';

type ProjectTabsProps = {
  projects: Project[];
  activeProjectId: string;
  onAddProject: () => void;
  onSelectProject: (projectId: string) => void;
};

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
        type="button"
      >
        すべて
      </button>
      {projects.map((project) => (
        <button
          aria-pressed={project.id === activeProjectId}
          className="project-tabs__tab"
          data-active={project.id === activeProjectId}
          key={project.id}
          onClick={() => onSelectProject(project.id)}
          type="button"
        >
          {project.name}
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
