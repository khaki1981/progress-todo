import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
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
const LOOP_SET_COUNT = 5;
const CENTER_SET_INDEX = Math.floor(LOOP_SET_COUNT / 2);
const LOOP_SET_INDEXES = Array.from(
  { length: LOOP_SET_COUNT },
  (_, index) => index,
);

const getProjectTabs = (tabList: HTMLElement): HTMLElement[] =>
  Array.from(
    tabList.querySelectorAll<HTMLElement>('.project-tabs__tab[data-project-id]'),
  );

const findProjectTab = (
  tabList: HTMLElement,
  projectId: string,
  setIndex?: number,
): HTMLElement | undefined =>
  getProjectTabs(tabList).find((tab) => {
    const tabSetIndex = Number(tab.dataset.loopSet);

    return (
      tab.dataset.projectId === projectId &&
      (setIndex === undefined || tabSetIndex === setIndex)
    );
  });

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

const normalizeLoopScrollPosition = (tabList: HTMLElement) => {
  const nearestTab = getNearestStartTab(tabList);
  const nearestProjectId = nearestTab?.dataset.projectId;
  const nearestSetIndex = Number(nearestTab?.dataset.loopSet);

  if (
    !nearestTab ||
    nearestProjectId === undefined ||
    !Number.isInteger(nearestSetIndex) ||
    (nearestSetIndex > 0 && nearestSetIndex < LOOP_SET_COUNT - 1)
  ) {
    return;
  }

  const centerTab = findProjectTab(
    tabList,
    nearestProjectId,
    CENTER_SET_INDEX,
  );

  if (!centerTab) {
    return;
  }

  const offsetFromNearestStart =
    tabList.scrollLeft - getStartAlignedScrollLeft(tabList, nearestTab);

  tabList.scrollTo({
    behavior: 'auto',
    left:
      getStartAlignedScrollLeft(tabList, centerTab) + offsetFromNearestStart,
  });
};

export function ProjectTabs({
  activeProjectId,
  onAddProject,
  onSelectProject,
  projects,
}: ProjectTabsProps) {
  const [activeSetIndex, setActiveSetIndex] = useState(CENTER_SET_INDEX);
  const tabListRef = useRef<HTMLElement>(null);
  const manualSelectionRef = useRef<string | null>(null);
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

    if (manualSelectionRef.current === activeProjectId) {
      manualSelectionRef.current = null;
      return;
    }

    manualSelectionRef.current = null;

    const activeTab = findProjectTab(
      tabList,
      activeProjectId,
      CENTER_SET_INDEX,
    );

    if (activeTab) {
      setActiveSetIndex(CENTER_SET_INDEX);
      scrollTabToStart(tabList, activeTab, 'auto');
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
    (projectId: string, setIndex: number) => {
      manualSelectionRef.current = projectId;
      setActiveSetIndex(setIndex);
      onSelectProject(projectId);

      const tabList = tabListRef.current;
      const selectedTab = tabList
        ? findProjectTab(tabList, projectId, setIndex)
        : undefined;

      if (tabList && selectedTab) {
        scrollTabToStart(tabList, selectedTab);
      }
    },
    [onSelectProject],
  );

  const handleScroll = useCallback(() => {
    const tabList = tabListRef.current;

    if (tabList) {
      normalizeLoopScrollPosition(tabList);
    }

    if (scrollSettleTimerRef.current) {
      window.clearTimeout(scrollSettleTimerRef.current);
    }

    scrollSettleTimerRef.current = window.setTimeout(() => {
      const tabList = tabListRef.current;

      if (!tabList) {
        return;
      }

      const nearestTab = getNearestStartTab(tabList);
      const nearestProjectId = nearestTab?.dataset.projectId;
      const nearestSetIndex = Number(nearestTab?.dataset.loopSet);

      if (
        nearestProjectId === undefined ||
        !Number.isInteger(nearestSetIndex)
      ) {
        return;
      }

      manualSelectionRef.current = nearestProjectId;

      if (nearestProjectId !== activeProjectIdRef.current) {
        onSelectProject(nearestProjectId);
      }

      const centerTab = findProjectTab(
        tabList,
        nearestProjectId,
        CENTER_SET_INDEX,
      );
      const shouldResetToCenter =
        nearestSetIndex !== CENTER_SET_INDEX && centerTab !== undefined;
      const nextActiveSetIndex = shouldResetToCenter
        ? CENTER_SET_INDEX
        : nearestSetIndex;
      const nextActiveTab = shouldResetToCenter ? centerTab : nearestTab;

      if (!nextActiveTab) {
        return;
      }

      setActiveSetIndex(nextActiveSetIndex);
      scrollTabToStart(
        tabList,
        nextActiveTab,
        shouldResetToCenter ? 'auto' : 'smooth',
      );
    }, SCROLL_SETTLE_DELAY);
  }, [onSelectProject]);

  const renderProjectSet = (setIndex: number) => (
    <Fragment key={`project-tab-set-${setIndex}`}>
      <button
        aria-pressed={activeProjectId === '' && activeSetIndex === setIndex}
        className="project-tabs__tab"
        data-active={activeProjectId === '' && activeSetIndex === setIndex}
        data-loop-set={setIndex}
        data-project-id=""
        key={`all-${setIndex}`}
        onClick={() => handleSelectProject('', setIndex)}
        style={getProjectTabStyle(ALL_TAB_COLOR)}
        type="button"
      >
        <span className="project-tabs__label">すべて</span>
      </button>
      {projects.map((project, index) => (
        <button
          aria-pressed={
            project.id === activeProjectId && activeSetIndex === setIndex
          }
          className="project-tabs__tab"
          data-active={
            project.id === activeProjectId && activeSetIndex === setIndex
          }
          data-loop-set={setIndex}
          data-project-id={project.id}
          key={`${project.id}-${setIndex}`}
          onClick={() => handleSelectProject(project.id, setIndex)}
          style={getProjectTabStyle(getProjectColorByIndex(index))}
          title={project.name}
          type="button"
        >
          <span className="project-tabs__label">{project.name}</span>
        </button>
      ))}
      <button
        aria-label="プロジェクトを追加"
        className="project-tabs__add"
        data-loop-set={setIndex}
        data-tab-role="add"
        key={`add-${setIndex}`}
        onClick={onAddProject}
        type="button"
      >
        +
      </button>
    </Fragment>
  );

  return (
    <nav
      className="project-tabs"
      aria-label="Projects"
      onScroll={handleScroll}
      ref={tabListRef}
    >
      {LOOP_SET_INDEXES.map(renderProjectSet)}
    </nav>
  );
}
