import React from 'react'

/**
 * Official Payload override point: registered via admin.components.header in
 * payload.config.ts. Injects brand font + colors without touching Payload internals.
 */
export function AdminTheme() {
  return (
    <style>{`
      @font-face {
        font-family: 'ArbelG';
        src: url('/fonts/ArbelG-Regular.woff2') format('woff2');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'ArbelG';
        src: url('/fonts/ArbelG-Medium.woff2') format('woff2');
        font-weight: 500;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'ArbelG';
        src: url('/fonts/ArbelG-Bold.woff2') format('woff2');
        font-weight: 700;
        font-style: normal;
        font-display: swap;
      }

      :root {
        --theme-success-500: #052cd1;
      }

      html {
        font-size: 16px;
      }

      small,
      .pill,
      .row-label,
      .status-list,
      .cell-line,
      .table thead th {
        font-size: 1.2em;
      }

      body,
      input,
      textarea,
      select,
      button {
        font-family: 'ArbelG', sans-serif;
      }

      .nav__header,
      .nav {
        background: #052cd1;
      }

      .nav__link,
      .nav-group__label,
      .nav-group__toggle {
        color: #fff;
        font-size: 1.2em;
      }

      .nav-group__content .nav__link {
        display: block;
        margin-bottom: 0.9em;
      }

      .nav__link:hover,
      .nav__link--active {
        color: #fab8ff;
      }

      .step-nav a,
      .step-nav__home {
        color: #052cd1;
      }

      .btn--style-primary {
        background: #052cd1;
        border-color: #052cd1;
      }

      .btn--style-primary:hover {
        background: #041fa3;
      }

      .btn--style-primary.btn--disabled {
        background-color: rgba(5, 44, 209, 0.35);
        border-color: rgba(5, 44, 209, 0.35);
        color: #fff;
        opacity: 1;
      }

      .btn--style-pill {
        background: #fbb040;
        color: #052cd1;
        border-color: #fbb040;
      }

      .btn--style-pill:hover {
        background: #e59f39;
      }

      /* Inline "create new" button inside upload fields: always about uploading an image. */
      .upload__createNewToggler .btn__label {
        font-size: 0;
      }

      .upload__createNewToggler .btn__label::before {
        content: 'העלאת תמונה';
        font-size: 1rem;
      }

      /* List-view "create new" button: Payload's own title attribute already has the
         correctly-labeled text ("יצירת {collection} חדש") — the visible label text is a
         generic string, so we swap it via the title attribute instead. Using font-size:0
         (rather than an absolutely-positioned overlay) so the button's own box still
         sizes itself around the new, usually-longer, text instead of the old short one. */
      .list-create-new-doc__create-new-button {
        font-size: 0;
        height: auto !important;
        padding: 9px !important;
        display: inline-flex !important;
        align-items: center;
        justify-content: center;
      }

      .list-create-new-doc__create-new-button::before {
        content: attr(title);
        font-family: 'ArbelG', sans-serif;
        font-size: 0.8125rem;
        line-height: 1;
        color: #052cd1;
        white-space: nowrap;
      }

      /* Remove the collapsible "אוספים" group header — keep the collection list always
         expanded; the nav sidebar already scrolls on overflow. */
      .nav-group__toggle {
        display: none;
      }

      .nav-group .rah-static {
        height: auto !important;
      }

      /* Disable the sidebar's own collapse/expand toggle — keep it permanently open
         on desktop-sized screens (mobile keeps its normal drawer behavior). */
      @media (min-width: 1024px) {
        .template-default {
          grid-template-columns: var(--nav-width) auto !important;
        }

        .nav {
          opacity: 1 !important;
          display: block !important;
        }

        .nav-toggler.template-default__nav-toggler {
          display: none !important;
        }
      }

      /* Dashboard "create new" icon buttons: orange on hover, matching site brand. */
      .card__actions .btn:hover {
        color: #fbb040 !important;
        border-color: #fbb040 !important;
      }

      /* The active "עריכה" doc-tab is disabled/non-interactive but styled like a
         pressed button, which reads as confusing next to the title. Strip the
         button chrome and fold the label into the title itself instead. */
      .doc-tab--active {
        display: none !important;
      }

      .doc-header__title::before {
        content: 'עריכה: ';
        font-size: 0.5em;
        font-weight: 400;
        opacity: 0.55;
      }
    `}</style>
  )
}
