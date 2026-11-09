// Modifications Copyright (C) 2026 Robbo. See NOTICE at repository root.
import React from 'react';

import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { useIntl } from '@edx/frontend-platform/i18n';

import { getLocalizedCourseTabTitle } from './courseTabTitleMessages';
import Tabs from './tabs/Tabs';
import messages from './messages';

import './navBar.scss';

// Robbo: the same tab bar as the Learning course pages (container-xl, tab titles by slug).
const CourseTabsNavigation = () => {
  const intl = useIntl();
  const tabs = useSelector(state => state.courseTabs.tabs);

  return (
    <div id="courseTabsNavigation" className="course-tabs-navigation bg-white">
      <div className="container-xl">
        {!!tabs.length && (
          <Tabs
            className="nav-underline-tabs"
            aria-label={intl.formatMessage(messages.courseMaterial)}
          >
            {tabs.map(({ url, title, slug }) => (
              <a
                key={slug}
                className={classNames('nav-item flex-shrink-0 nav-link', { active: slug === 'discussion' })}
                href={url}
              >
                {getLocalizedCourseTabTitle(intl.formatMessage, slug, title)}
              </a>
            ))}
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default React.memo(CourseTabsNavigation);
