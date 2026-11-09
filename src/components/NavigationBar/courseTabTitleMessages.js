/**
 * Copyright (C) 2026 Robbo <https://robbo.ru>
 * SPDX-License-Identifier: AGPL-3.0-only
 *
 * Part of the Robbo Open edX MFE overrides. See NOTICE at repository root.
 */
import { defineMessages } from '@edx/frontend-platform/i18n';

/**
 * LMS sends English tab titles; we localize known slugs for RU (and keep EN defaults here).
 */
export const courseTabTitleMessageBySlug = defineMessages({
  outline: {
    id: 'robbo.courseTab.outline',
    defaultMessage: 'Course',
    description: 'Course outline / home tab label',
  },
  courseware: {
    id: 'robbo.courseTab.courseware',
    defaultMessage: 'Course',
    description: 'Courseware tab label',
  },
  discussion: {
    id: 'robbo.courseTab.discussion',
    defaultMessage: 'Discussion',
    description: 'Discussion tab label',
  },
  wiki: {
    id: 'robbo.courseTab.wiki',
    defaultMessage: 'Wiki',
    description: 'Wiki tab label',
  },
  progress: {
    id: 'robbo.courseTab.progress',
    defaultMessage: 'Progress',
    description: 'Progress tab label',
  },
  verified: {
    id: 'robbo.courseTab.verified',
    defaultMessage: 'Full access',
    description: 'Full-access upgrade tab label',
  },
  dates: {
    id: 'robbo.courseTab.dates',
    defaultMessage: 'Dates',
    description: 'Important dates tab label',
  },
  instructor: {
    id: 'robbo.courseTab.instructor',
    defaultMessage: 'Instructor',
    description: 'Instructor dashboard tab label',
  },
  live: {
    id: 'robbo.courseTab.live',
    defaultMessage: 'Live',
    description: 'Live / LTI live tab label',
  },
  teams: {
    id: 'robbo.courseTab.teams',
    defaultMessage: 'Teams',
    description: 'Teams tab label',
  },
  bookmarks: {
    id: 'robbo.courseTab.bookmarks',
    defaultMessage: 'Bookmarks',
    description: 'Bookmarks tab label',
  },
});

/**
 * @param {import('@edx/frontend-platform/i18n').IntlShape['formatMessage']} formatMessage
 * @param {string} slug
 * @param {string} serverTitle
 */
export function getLocalizedCourseTabTitle(formatMessage, slug, serverTitle) {
  const message = courseTabTitleMessageBySlug[slug];
  if (!message) {
    return serverTitle;
  }
  return formatMessage(message);
}
