/**
 * Copyright (C) 2026 Robbo <https://robbo.ru>
 * SPDX-License-Identifier: AGPL-3.0-only
 *
 * Part of the Robbo Open edX MFE overrides. See NOTICE at repository root.
 */
import { useEffect } from 'react';

const TOGGLE = '.user-dropdown > .dropdown-toggle, .user-dropdown > .btn';
const ITEM_CLASS = 'dropdown-item robbo-header-whats-new-item';

export const findUserMenuToggle = (shell) => (shell ? shell.querySelector(TOGGLE) : null);

const setText = (node, text) => {
  if (node.textContent !== text) {
    // eslint-disable-next-line no-param-reassign
    node.textContent = text;
  }
};

const syncDot = (toggle, unread) => {
  let dot = toggle.querySelector(':scope > .robbo-wn-dot');
  if (!unread) {
    if (dot) {
      dot.remove();
    }
    return;
  }
  if (!dot) {
    dot = document.createElement('span');
    dot.className = 'robbo-wn-dot';
    dot.setAttribute('aria-hidden', 'true');
    toggle.appendChild(dot);
  }
};

const syncItem = (menu, whatsNew, text, toggle) => {
  let item = menu.querySelector(':scope > .robbo-header-whats-new-item');
  if (!whatsNew.inMenu) {
    if (item) {
      item.remove();
    }
    return;
  }
  if (!item) {
    item = document.createElement('a');
    item.className = ITEM_CLASS;
    item.setAttribute('role', 'menuitem');
    item.appendChild(document.createElement('span'));
    const count = document.createElement('span');
    count.className = 'robbo-wn-count';
    count.setAttribute('aria-hidden', 'true');
    item.appendChild(count);
  }
  // Right above «Выйти», the last item of the package menu.
  const items = Array.prototype.filter.call(
    menu.querySelectorAll(':scope > .dropdown-item'),
    (node) => node !== item,
  );
  const logout = items[items.length - 1] || null;
  if (item.nextSibling !== logout || item.parentNode !== menu) {
    menu.insertBefore(item, logout);
  }
  item.href = whatsNew.pageUrl;
  // Writes only on change: text changes are child mutations and would wake the observer again.
  setText(item.firstChild, text);
  if (whatsNew.label) {
    item.setAttribute('aria-label', whatsNew.label);
  }
  const count = item.lastChild;
  count.hidden = !whatsNew.unread;
  setText(count, whatsNew.unread > 9 ? '9+' : String(whatsNew.unread || ''));
  item.onclick = (event) => {
    event.preventDefault();
    if (toggle && toggle.getAttribute('aria-expanded') === 'true') {
      toggle.click();
    }
    whatsNew.open();
  };
};

// LearningHeader (a package) owns the user menu, so for learners the «Что нового» item and the dot on the
// menu button are kept in its markup from outside, like the slot in headerSlot.js.
export const useUserMenuWhatsNew = (shellRef, whatsNew, text) => {
  useEffect(() => {
    const shell = shellRef.current;
    if (!shell || !whatsNew) {
      return undefined;
    }
    let frame = null;
    const sync = () => {
      frame = null;
      const toggle = findUserMenuToggle(shell);
      if (toggle) {
        syncDot(toggle, whatsNew.inMenu ? whatsNew.unread : 0);
      }
      const menu = shell.querySelector('.user-dropdown .dropdown-menu');
      if (menu) {
        syncItem(menu, whatsNew, text, toggle);
      }
    };
    const observer = new MutationObserver(() => {
      if (frame === null) {
        frame = window.requestAnimationFrame(sync);
      }
    });
    sync();
    observer.observe(shell, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [shellRef, whatsNew, text]);
};

export default useUserMenuWhatsNew;
