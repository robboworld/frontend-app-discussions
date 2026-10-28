/**
 * Copyright (C) 2026 Robbo <https://robbo.ru>
 * SPDX-License-Identifier: AGPL-3.0-only
 *
 * Part of the Robbo Open edX MFE overrides. See NOTICE at repository root.
 */
import { defineMessages } from '@edx/frontend-platform/i18n';

// Same ids and texts as the «Студия» pill of RobboHeader in the other MFEs.
const messages = defineMessages({
  studioLabel: {
    id: 'robbo.header.studio.label',
    defaultMessage: 'Studio',
    description: 'Header pill that opens Studio (platform staff only)',
  },
  whatsNew: {
    id: 'robbo.header.user.whatsNew',
    defaultMessage: "What's new",
    description: 'User menu item that opens the latest platform changes (learners)',
  },
  studioAria: {
    id: 'robbo.header.studio.aria',
    defaultMessage: 'Go to Studio',
    description: 'Accessible name of the Studio header pill',
  },
});

export default messages;
