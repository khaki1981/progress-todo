import {
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
} from 'react';
import type { Project } from '../types/app';
import { ALL_TAB_COLOR, getProjectColorByIndex } from '../utils/todoColors';

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

const SCROLL_SETTLE_DELAY = 140;

const getProjectTabs = (tabList: HTMLElement): HTMLElement[] =>
  Array.from(
    tabList.querySelectorAll<HTMLElement>('.project-tabs__tab[data-project-id]'),
  );

const findProjectTab = (
  tabList: HTMLElement,
  projectId: string,
): HTMLElement | undefined =>
  getProjectTabs(tabList).find((tab) => tab.dataset.projectId === projectId);

const getScrollInset = (tabList: HTMLElement): number => {
  const paddingLeft = Number.parseFloat(
    window.getComputedStyle(tabList).paddingLeft,
  );

  return Number.isFinite(paddingLeft) ? paddingLeft : 0;
};

const getStartAlignedScrollLeft = (
  tabList: HTMLElement,
  tab: HTMLElement,
): number => {
  const tabListRect = tabList.getBoundingClientRect();
  const tabRect = tab.getBoundingClientRect();
  const nextScrollLeft =
    tabList.scrollLeft + tabRect.left - tabListRect.left - getScrollInset(tabList);
  const maxScrollLeft = tabList.scrollWidth - tabList.clientWidth;

  return Math.max(0, Math.min(nextScrollLeft, maxScrollLeft));
};

const scrollTabToStart = (
  tabList: HTMLElement,
  tab: HTMLElement,
  behavior: ScrollBehavior = 'smooth',
) => {
  tabList.scrollTo({
    behavior,
    left: getStartAlignedScrollLeft(tabList, tab),
  });
};

const getNearestStartTab = (tabList: HTMLElement): HTMLElement | undefined => {
  const tabs = getProjectTabs(tabList);
  const startEdge = tabList.getBoundingClientRect().left + getScrollInset(tabList);

  return tabs.reduce<HTMLElement | undefined>((nearestTab, tab) => {
    if (!nearestTab) {
      return tab;
    }

    const nearestDistance = Math.abs(
      nearestTab.getBoundingClientRect().left - startEdge,
    );
    const tabDistance = Math.abs(tab.getBoundingClientRect().left - startEdge);

    return tabDistance < nearestDistance ? tab : nearestTab;
  }, undefined);
};

export function ProjectTabs({
  activeProjectId,
  onAddProject,
  onSelectProject,
  projects,
}: ProjectTabsProps) {
  const tabListRef = useRef<HTMLElement>(null);
  const scrollSettleTimerRef = useRef<number | null>(null);
  const activeProjectIdRef = useRef(activeProjectId);

  useEffect(() => {
    activeProjectIdRef.current = activeProjectId;
  }, [activeProjectId]);

  useEffect(() => {
    const tabList = tabListRef.current;

    if (!tabList) {
      return;
    }

    const activeTab = findProjectTab(tabList, activeProjectId);

    if (activeTab) {
      scrollTabToStart(tabList, activeTab);
    }
  }, [activeProjectId, projects.length]);

  useEffect(
    () => () => {
      if (scrollSettleTimerRef.current) {
        window.clearTimeout(scrollSettleTimerRef.current);
      }
    },
    [],
  );

  const handleSelectProject = useCallback(
    (projectId: string) => {
      onSelectProject(projectId);

      const tabList = tabListRef.current;
      const selectedTab = tabList ? findProjectTab(tabList, projectId) : undefined;

      if (tabList && selectedTab) {
        scrollTabToStart(tabList, selectedTab);
      }
    },
    [onSelectProject],
  );

  const handleScroll = useCallback(() => {
    if (scrollSettleTimerRef.current) {
      window.clearTimeout(scrollSettleTimerRef.current);
    }

    scrollSettleTimerRef.current = window.setTimeout(() => {
      const tabList = tabListRef.current;
      const nearestTab = tabList ? getNearestStartTab(tabList) : undefined;
      const nearestProjectId = nearestTab?.dataset.projectId;

      if (
        nearestProjectId !== undefined &&
        nearestProjectId !== activeProjectIdRef.current
      ) {
        onSelectProject(nearestProjectId);
      }
    }, SCROLL_SETTLE_DELAY);
  }, [onSelectProject]);

  return (
    <nav
      className="project-tabs"
      aria-label="Projects"
      onScroll={handleScroll}
      ref={tabListRef}
    >
      <button
        aria-pressed={activeProjectId === ''}
        className="project-tabs__tab"
        data-active={activeProjectId === ''}
        data-project-id=""
        onClick={() => handleSelectProject('')}
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
          data-project-id={project.id}
          key={project.id}
          onClick={() => handleSelectProject(project.id)}
          style={getProjectTabStyle(getProjectColorByIndex(index))}
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
