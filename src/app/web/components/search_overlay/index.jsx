import { useState } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import routeURL from 'config/routeURL';
import { useHistory } from 'react-router-dom';
import './index.css';
import { CloseOutlined } from '@ant-design/icons';

export default function SearchOverlay() {
  let history = useHistory();
  const [searchText, setSearchText] = useState('');

  return (
    <div className="search-wrapper">
      <div className="search-box">
        <span
          onClick={() => {
            $('.search-wrapper').removeClass('open');
          }}
          className="search-close"
        >
          <CloseOutlined className="fal fa-times" style={{
            cursor: "pointer"
          }}/>
        </span>
        <div className="search-form">
          <label>Start typing and press Enter to search</label>
          <div className="search-input">
            <input
              value={searchText}
              onKeyDown={({ key }) => {
                if (searchText && key === 'Enter') {
                  $('.search-wrapper').removeClass('open');
                  history.push(
                    routeURL.params(routeURL.web.search(), `q=${searchText}`)
                  );
                }
              }}
              type="text"
              placeholder="Search foods/restaurants"
              onChange={({ target: { value } }) => setSearchText(value)}
            />

            <Link
              to={routeURL.params(routeURL.web.search(), `q=${searchText}`)}
              onClick={() => $('.search-wrapper').removeClass('open')}
            >
              <button>
                <i className="far fa-search" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
