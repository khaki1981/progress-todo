import type { Project } from '../types/app';

type ProjectTabsProps = {
  projects: Project[];
  activeProjectId: string;
};

export function ProjectTabs({ projects, activeProjectId }: ProjectTabsProps) {
  if (projects.length === 0) {
    return (
      <nav className="project-tabs" aria-label="Projects">
        <span className="project-tabs__empty">No projects</span>
      </nav>
    );
  }

  return (
    <nav className="project-tabs" aria-label="Projects">
      {projects.map((project) => (
        <span
          className="project-tabs__tab"
          data-active={project.id === activeProjectId}
          key={project.id}
        >
          {project.name}
        </span>
      ))}
    </nav>
  );
}
