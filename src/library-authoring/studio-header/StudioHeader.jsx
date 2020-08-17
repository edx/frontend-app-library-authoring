import React, { useContext } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dropdown, Icon } from '@edx/paragon';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import { ensureConfig } from '@edx/frontend-platform/config';

import { libraryShape } from '../common';
import { selectLibraryDetail } from '../library-detail';
import StudioLogo from './assets/studio-logo.png';
import messages from './messages';

ensureConfig([
  'STUDIO_BASE_URL',
  'LOGOUT_URL',
], 'Library header');

const StudioHeader = ({ intl, library }) => {
  const { authenticatedUser, config } = useContext(AppContext);

  return (
    <div className="wrapper-header wrapper">
      <header className="primary" role="banner">
        <div className="wrapper-l">
          <h1 className="branding">
            <Link to="/">
              <img
                src={StudioLogo}
                alt={intl.formatMessage(messages['library.header.logo.alt'])}
              />
            </Link>
          </h1>
          <Route path="/library">
            {library
            && (
            <h2 className="info-library">
              <Link to={library.url} className="library-link">
                <span className="library-org">{library.org}</span>
                <span className="library-id">{library.id}</span>
                <span className="library-title" title={library.title}>{library.title}</span>
              </Link>
            </h2>
            )}
          </Route>
        </div>
        <div className="wrapper-r">
          {authenticatedUser !== null
          && (
          <nav className="nav-account" aria-label={intl.formatMessage(messages['library.header.account.label'])}>
            <ol>
              <li className="nav-item nav-account-help">
                <h3 className="title">
                  <a
                    href="http://edx.readthedocs.io/projects/open-edx-building-and-running-a-course/en/latest/course_components/libraries.html"
                    title={intl.formatMessage(messages['library.header.nav.help.title'])}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {intl.formatMessage(messages['library.header.nav.help'])}
                  </a>
                </h3>
              </li>
              <li className="nav-item nav-account-user">
                <Dropdown>
                  <Dropdown.Toggle>
                    {authenticatedUser.username}
                    <Icon className="fa fa-caret-down pl-3" alt="" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href={config.STUDIO_BASE_URL}>{intl.formatMessage(messages['library.header.account.studiohome'])}</Dropdown.Item>
                    <Dropdown.Item href={config.LOGOUT_URL}>{intl.formatMessage(messages['library.header.account.signout'])}</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ol>
          </nav>
          )}
        </div>
      </header>
    </div>
  );
};

StudioHeader.propTypes = {
  intl: intlShape.isRequired,
  library: libraryShape,
};

StudioHeader.defaultProps = {
  library: null,
};

export default connect(
  selectLibraryDetail,
)(injectIntl(StudioHeader));