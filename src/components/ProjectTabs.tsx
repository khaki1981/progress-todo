import type { Project } from '../types/app';

type ProjectTabsProps = {
  projects: Project[];
  activeProjectId: string;
};

export function ProjectTabs({ projects, activeProjectId }: ProjectTabsProps) {
  return (
    <nav className="project-tabs" aria-label="Projects">
      <span
        className="project-tabs__tab"
        data-active={activeProjectId === ''}
      >
        すべて
      </span>
      {projects.map((project) => (
        <span
          className="project-tabs__tab"
          data-active={project.id === activeProjectId}
          key={project.id}
        >
          {project.name}
        </span>
      ))}
      <span className="project-tabs__add" aria-hidden="true">
        +
      </span>
    </nav>
  );
}
