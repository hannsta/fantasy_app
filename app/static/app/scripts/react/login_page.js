
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;
var csrftoken = getCookie('csrftoken');
var YF_BASE_URL = 'http://34.220.213.20:8080';

var CSRFToken = function CSRFToken() {
  return React.createElement('input', { type: 'hidden', name: 'csrfmiddlewaretoken', value: csrftoken });
};

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      loggedIn: null,
      token: null,
      contentTab: 'my_team'
    };
    _this.switchTabs = _this.switchTabs.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: 'switchTabs',
    value: function switchTabs(content) {
      var _this2 = this;

      if (content == "my_team_report") {
        if (this.state.token == null) {
          fetch('/yfLogin?entry=PLAYER_SUMMARY').then(function (res) {
            return res.json();
          }).then(function (data) {
            _this2.setState({
              token: data,
              contentTab: content
            });
          }).catch(console.log);
        }
      }
      if (content == "new_report") {
        if (this.state.token == null) {
          fetch('/yfLogin?entry=NEW_REPORT').then(function (res) {
            return res.json();
          }).then(function (data) {
            _this2.setState({
              token: data,
              contentTab: content
            });
          }).catch(console.log);
        }
      }
      if (content == "browse") {
        if (this.state.token == null) {
          fetch('/yfLogin?entry=BROWSE').then(function (res) {
            return res.json();
          }).then(function (data) {
            _this2.setState({
              token: data,
              contentTab: content
            });
          }).catch(console.log);
        }
      }
      this.setState({
        contentTab: content
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      fetch('/getLoginStatus').then(function (response) {
        if (response.status == 200) {
          _this3.setState({
            loggedIn: true });
        } else {
          _this3.setState({
            loggedIn: false });
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { 'class': 'row' },
        React.createElement(LeftNavContainer, { switchTabs: this.switchTabs, loggedIn: this.state.loggedIn }),
        React.createElement(
          'main',
          { className: 'col-main' },
          React.createElement(ContentContainer, { loggedIn: this.state.loggedIn, token: this.state.token, contentTab: this.state.contentTab })
        )
      );
    }
  }]);

  return App;
}(React.Component);

var ContentContainer = function (_React$Component2) {
  _inherits(ContentContainer, _React$Component2);

  function ContentContainer(props) {
    _classCallCheck(this, ContentContainer);

    var _this4 = _possibleConstructorReturn(this, (ContentContainer.__proto__ || Object.getPrototypeOf(ContentContainer)).call(this, props));

    _this4.state = {
      players: []
    };
    _this4.removePlayer = _this4.removePlayer.bind(_this4);
    _this4.addPlayer = _this4.addPlayer.bind(_this4);
    return _this4;
  }

  _createClass(ContentContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this5 = this;

      fetch('/getPlayers').then(function (res) {
        return res.json();
      }).then(function (data) {
        _this5.setState({ players: data });
      }).catch(console.log);
    }
  }, {
    key: 'removePlayer',
    value: function removePlayer(id) {
      var _this6 = this;

      fetch('/removePlayer?player_id=' + id).then(function (res) {
        return res.json();
      }).then(function (data) {
        _this6.setState({ players: data });
      }).catch(console.log);
    }
  }, {
    key: 'addPlayer',
    value: function addPlayer(id) {
      var _this7 = this;

      fetch('/addPlayer?player_id=' + id).then(function (res) {
        return res.json();
      }).then(function (data) {
        _this7.setState({ players: data });
      }).catch(console.log);
    }
  }, {
    key: 'render',
    value: function render() {
      var contentTab = this.props.contentTab;
      var isLoggedIn = this.props.loggedIn;
      var url = null;
      if (isLoggedIn) {
        var yfsession = getCookie('JSESSIONID');
        if (contentTab == "my_team") {
          return React.createElement(
            'div',
            { 'class': 'container' },
            React.createElement(
              'div',
              { 'class': 'row' },
              React.createElement(
                'h2',
                null,
                'Team Manager'
              )
            ),
            React.createElement(
              'div',
              { 'class': 'row' },
              React.createElement(
                'h5',
                null,
                'Build your Team!'
              )
            ),
            React.createElement(
              'div',
              { 'class': 'row player-search' },
              React.createElement(PlayerSearch, { addPlayer: this.addPlayer })
            ),
            React.createElement(
              'div',
              { 'class': 'row player-list' },
              React.createElement(
                'h5',
                null,
                'Your Team'
              ),
              React.createElement(Players, { players: this.state.players, removePlayer: this.removePlayer })
            )
          );
        } else {
          if (yfsession == null) {
            if (this.props.token == null) {
              return React.createElement(
                'div',
                null,
                'Oops Couldnt Log into Yellowfin'
              );
            }
            url = YF_BASE_URL + "/logon.i4?LoginWebserviceId=" + this.props.token;
          }
        }
        if (contentTab == "my_team_report") {
          url = YF_BASE_URL + "/RunReport.i4?reportUUID=2e830a7b-c47f-45da-8d5d-3c19e09ee60e&primaryOrg=1&clientOrg=1";
        }
        if (contentTab == "new_report") {
          url = YF_BASE_URL + "/MIPreReportInit.i4";
        }
        if (contentTab == "browse") {
          url = YF_BASE_URL + "/MIPreReports.i4";
        }

        if (url != null) {
          return React.createElement('iframe', { width: '100%', height: '1200px', src: url });
        }
        return React.createElement(
          'div',
          null,
          'Page does not exist'
        );
      } else {
        return React.createElement(
          'div',
          { id: 'register-page' },
          React.createElement(
            'h6',
            null,
            'Create a New Account'
          ),
          React.createElement(RegisterPage, null)
        );
      }
    }
  }]);

  return ContentContainer;
}(React.Component);

function LeftNavContainer(props) {
  var isLoggedIn = props.loggedIn;
  if (isLoggedIn == null) {
    return React.createElement('div', null);
  }
  if (isLoggedIn) {
    return React.createElement(
      'nav',
      { className: 'col-left d-none d-md-block sidebar' },
      React.createElement(LeftNav, { switchTabs: props.switchTabs })
    );
  }
  return React.createElement(
    'nav',
    { className: 'col-left-login d-none d-md-block sidebar' },
    React.createElement(LoginPage, null)
  );
};

var LeftNav = function (_React$Component3) {
  _inherits(LeftNav, _React$Component3);

  function LeftNav() {
    _classCallCheck(this, LeftNav);

    return _possibleConstructorReturn(this, (LeftNav.__proto__ || Object.getPrototypeOf(LeftNav)).apply(this, arguments));
  }

  _createClass(LeftNav, [{
    key: 'render',
    value: function render() {
      var _this9 = this;

      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { 'class': 'row' },
          React.createElement(
            'div',
            { id: 'opt_select', onClick: function onClick(e) {
                return _this9.props.switchTabs("my_team");
              } },
            React.createElement('img', { src: '/static/app/images/team.svg', width: '40px', height: '40px' }),
            React.createElement(
              'p',
              null,
              'My Team'
            )
          )
        ),
        React.createElement(
          'div',
          { 'class': 'row' },
          React.createElement(
            'div',
            { id: 'opt_select', onClick: function onClick(e) {
                return _this9.props.switchTabs("my_team_report");
              } },
            React.createElement('img', { src: '/static/app/images/statistics.svg', width: '40px', height: '40px' }),
            React.createElement(
              'p',
              null,
              'Overview'
            )
          )
        ),
        React.createElement(
          'div',
          { 'class': 'row' },
          React.createElement(
            'div',
            { id: 'opt_select', onClick: function onClick(e) {
                return _this9.props.switchTabs("new_report");
              } },
            React.createElement('img', { src: '/static/app/images/new-page.svg', width: '40px', height: '40px' }),
            React.createElement(
              'p',
              null,
              'New Report'
            )
          )
        ),
        React.createElement(
          'div',
          { 'class': 'row' },
          React.createElement(
            'div',
            { id: 'opt_select', onClick: function onClick(e) {
                return _this9.props.switchTabs("browse");
              } },
            React.createElement('img', { src: '/static/app/images/search.svg', width: '40px', height: '40px' }),
            React.createElement(
              'p',
              null,
              'Browse'
            )
          )
        )
      );
    }
  }]);

  return LeftNav;
}(React.Component);

var LoginPage = function (_React$Component4) {
  _inherits(LoginPage, _React$Component4);

  function LoginPage() {
    _classCallCheck(this, LoginPage);

    return _possibleConstructorReturn(this, (LoginPage.__proto__ || Object.getPrototypeOf(LoginPage)).apply(this, arguments));
  }

  _createClass(LoginPage, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'form',
        { action: '/login', method: 'post' },
        React.createElement(CSRFToken, null),
        React.createElement('input', { type: 'text', name: 'email', className: 'form-control', placeholder: 'Email', maxlength: '254', required: '', id: 'id_email' }),
        React.createElement('input', { type: 'password', name: 'password', className: 'form-control', placeholder: 'Password', required: '', id: 'id_password' }),
        React.createElement(
          'button',
          { type: 'submit' },
          'Login'
        )
      );
    }
  }]);

  return LoginPage;
}(React.Component);

var RegisterPage = function (_React$Component5) {
  _inherits(RegisterPage, _React$Component5);

  function RegisterPage() {
    _classCallCheck(this, RegisterPage);

    return _possibleConstructorReturn(this, (RegisterPage.__proto__ || Object.getPrototypeOf(RegisterPage)).apply(this, arguments));
  }

  _createClass(RegisterPage, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'form',
        { action: '/add_user', method: 'post' },
        React.createElement(CSRFToken, null),
        React.createElement('input', { type: 'text', name: 'email', className: 'form-control', placeholder: 'Email', maxlength: '254', required: '', id: 'id_email' }),
        React.createElement('input', { type: 'password', name: 'password', className: 'form-control', placeholder: 'Password', required: '', id: 'id_password' }),
        React.createElement(
          'button',
          { type: 'submit' },
          'Register'
        )
      );
    }
  }]);

  return RegisterPage;
}(React.Component);

var Players = function (_React$Component6) {
  _inherits(Players, _React$Component6);

  function Players() {
    _classCallCheck(this, Players);

    return _possibleConstructorReturn(this, (Players.__proto__ || Object.getPrototypeOf(Players)).apply(this, arguments));
  }

  _createClass(Players, [{
    key: 'render',
    value: function render() {
      var _this13 = this;

      return React.createElement(
        'div',
        { id: 'player-card', className: 'container' },
        this.props.players.map(function (player) {
          return React.createElement(
            'div',
            { className: 'row player-row' },
            React.createElement(
              'div',
              { className: 'col-6' },
              React.createElement(
                'p',
                null,
                player.name
              )
            ),
            React.createElement(
              'div',
              { className: 'col' },
              React.createElement(
                'p',
                { 'class': 'card-text' },
                player.position,
                '  ',
                player.team
              )
            ),
            React.createElement(
              'div',
              { className: 'col button-col' },
              React.createElement(
                'button',
                { id: 'drop-button', onClick: function onClick(e) {
                    return _this13.props.removePlayer(player.player_id);
                  } },
                'Drop'
              )
            )
          );
        })
      );
    }
  }]);

  return Players;
}(React.Component);

;

var PlayerSearch = function (_React$Component7) {
  _inherits(PlayerSearch, _React$Component7);

  function PlayerSearch() {
    _classCallCheck(this, PlayerSearch);

    var _this14 = _possibleConstructorReturn(this, (PlayerSearch.__proto__ || Object.getPrototypeOf(PlayerSearch)).call(this));

    _this14.onChange = function (event, _ref) {
      var newValue = _ref.newValue,
          method = _ref.method;

      _this14.setState({
        isPlayerSelected: false,
        value: newValue
      });
    };

    _this14.onSuggestionSelected = function (event, _ref2) {
      var suggestion = _ref2.suggestion,
          suggestionValue = _ref2.suggestionValue,
          suggestionIndex = _ref2.suggestionIndex,
          sectionIndex = _ref2.sectionIndex,
          method = _ref2.method;

      var selectedPlayer = _this14.state.players.filter(function (player) {
        return player.name == suggestion;
      })[0];
      _this14.setState({
        isPlayerSelected: true,
        selectedId: selectedPlayer.player_id,
        value: suggestion
      });
    };

    _this14.onSuggestionsFetchRequested = function (_ref3) {
      var value = _ref3.value;

      var permittedValues = _this14.getSuggestions(value).map(function (player) {
        return player.name;
      });
      _this14.setState({
        suggestions: permittedValues
      });
    };

    _this14.onSuggestionsClearRequested = function () {
      _this14.setState({
        suggestions: []
      });
    };

    _this14.state = {
      value: '',
      suggestions: [],
      players: [],
      selectedId: '',
      isPlayerSelected: false
    };
    _this14.getSuggestions = _this14.getSuggestions.bind(_this14);
    _this14.getSuggestionValue = _this14.getSuggestionValue.bind(_this14);
    _this14.renderSuggestion = _this14.renderSuggestion.bind(_this14);
    _this14.onSuggestionSelected = _this14.onSuggestionSelected.bind(_this14);

    return _this14;
  }

  _createClass(PlayerSearch, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this15 = this;

      fetch('/getAllPlayers').then(function (res) {
        return res.json();
      }).then(function (data) {
        _this15.setState({ players: data });
      }).catch(console.log);
    }
  }, {
    key: 'getSuggestions',
    value: function getSuggestions(value) {
      //const escapedValue = this.escapeRegexCharacters(value.trim());
      var escapedValue = value;
      if (escapedValue === '') {
        return [];
      }

      var regex = new RegExp(escapedValue, 'i');

      return this.state.players.filter(function (player) {
        return regex.test(player.name);
      });
    }
  }, {
    key: 'getSuggestionValue',
    value: function getSuggestionValue(suggestion) {
      return suggestion.name;
    }
  }, {
    key: 'renderSuggestion',
    value: function renderSuggestion(suggestion) {
      return React.createElement(
        'span',
        null,
        suggestion
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this16 = this;

      var _state = this.state,
          value = _state.value,
          suggestions = _state.suggestions;

      var inputProps = {
        placeholder: "Search for Players",
        value: value,
        onChange: this.onChange
      };
      var selectedId = this.state.selectedId;
      var isPlayerSelected = this.state.isPlayerSelected;
      return React.createElement(
        'div',
        null,
        React.createElement(Autosuggest, {
          suggestions: suggestions,
          onSuggestionSelected: this.onSuggestionSelected,
          onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
          onSuggestionsClearRequested: this.onSuggestionsClearRequested,
          getSuggestionValue: this.getSuggestionValue,
          renderSuggestion: this.renderSuggestion,
          inputProps: inputProps
        }),
        isPlayerSelected ? React.createElement(
          'div',
          { id: 'floats' },
          React.createElement(
            'button',
            { onClick: function onClick(e) {
                return _this16.props.addPlayer(selectedId);
              } },
            'Add Player'
          )
        ) : React.createElement('div', null)
      );
    }
  }]);

  return PlayerSearch;
}(React.Component);

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = jQuery.trim(cookies[i]);
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

ReactDOM.render(e(App), document.querySelector('#app'));
//ReactDOM.render(e(PlayerCard), document.querySelector('#contacts_list'));