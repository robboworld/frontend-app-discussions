/**
 * Copyright (C) 2026 Robbo <https://robbo.ru>
 * SPDX-License-Identifier: AGPL-3.0-only
 *
 * Part of the Robbo Open edX MFE overrides. See NOTICE at repository root.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { useIntl } from '@edx/frontend-platform/i18n';

import { useRobboHeaderSlot } from './headerSlot';
import messages from './messages';
import RobboWhatsNew from './whatsNew';

const getStudioUrl = (config) => {
  const base = config.STUDIO_BASE_URL || config.CMS_BASE_URL || '';
  return base ? String(base).replace(/\/$/, '') : '';
};

// Before the user menu, as in RobboHeader of the other MFEs: «Что нового» and, for platform staff,
// the «Студия» pill. Styles: learning-header.css.
const RobboHeaderExtras = ({ shellRef }) => {
  const intl = useIntl();
  const slot = useRobboHeaderSlot(shellRef);
  if (!slot) {
    return null;
  }
  const studioUrl = getStudioUrl(getConfig());
  // LMS studio_header_link: superuser / global staff only (`administrator` in JWT).
  const showStudioLink = Boolean(studioUrl && getAuthenticatedUser()?.administrator);
  return createPortal(
    <>
      <RobboWhatsNew />
      {showStudioLink && (
        <a
          className="robbo-header-studio-link__btn"
          href={studioUrl}
          aria-label={intl.formatMessage(messages.studioAria)}
        >
          {intl.formatMessage(messages.studioLabel)}
        </a>
      )}
    </>,
    slot,
  );
};

RobboHeaderExtras.propTypes = {
  shellRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
};

export default RobboHeaderExtras;
