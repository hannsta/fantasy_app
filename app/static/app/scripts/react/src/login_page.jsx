
'use strict';

const e = React.createElement;
var csrftoken = getCookie('csrftoken');
var YF_BASE_URL = 'http://34.220.213.20:8080'

const CSRFToken = () => {
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
    );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null,
      token: null,
      contentTab: 'my_team'
    } 
    this.switchTabs = this.switchTabs.bind(this);
  }

  switchTabs(content){
    if (content == "my_team_report"){
      if (this.state.token==null){
        fetch('/yfLogin?entry=PLAYER_SUMMARY')
        .then(res => res.json())
        .then((data) => {
          this.setState({ 
            token: data,
            contentTab: content
          })
        })
        .catch(console.log)
      }
    }
    if (content == "new_report"){
      if (this.state.token==null){
        fetch('/yfLogin?entry=NEW_REPORT')
        .then(res => res.json())
        .then((data) => {
          this.setState({ 
            token: data,
            contentTab: content
          })
        })
        .catch(console.log)
      }
    }
    if (content == "browse"){
      if (this.state.token==null){
        fetch('/yfLogin?entry=BROWSE')
        .then(res => res.json())
        .then((data) => {
          this.setState({ 
            token: data,
            contentTab: content
          })
        })
        .catch(console.log)
      }
    }
    this.setState({
      contentTab: content
    })
     
  }
  componentDidMount() {
    fetch('/getLoginStatus')
    .then(response => {
      if (response.status == 200){
        this.setState({
          loggedIn : true})
      }else{
        this.setState({
          loggedIn : false})       
      }
    })

  } 
  render() {
    return (
      <div class="row">
        <LeftNavContainer switchTabs={this.switchTabs} loggedIn={this.state.loggedIn} />
        <main className="col-main">
          <ContentContainer loggedIn={this.state.loggedIn} token={this.state.token} contentTab={this.state.contentTab}/>
        </main>
      </div>
    )
  }  
}
class ContentContainer extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      players: [],
    } 
    this.removePlayer = this.removePlayer.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
  }
  componentDidMount() {
    fetch('/getPlayers')
    .then(res => res.json())
    .then((data) => {
      this.setState({ players: data })
    })
    .catch(console.log)
  }
  removePlayer(id) {
    fetch('/removePlayer?player_id='+id)
    .then(res => res.json())
    .then((data) => {
      this.setState({ players: data })
    })
    .catch(console.log) 
  }
  addPlayer(id) {
    fetch('/addPlayer?player_id='+id)
    .then(res => res.json())
    .then((data) => {
      this.setState({ players: data })
    })
    .catch(console.log) 
  }
  render(){
    const contentTab = this.props.contentTab;
    const isLoggedIn =  this.props.loggedIn;
    var url = null;
    if (isLoggedIn){
      var yfsession = getCookie('JSESSIONID');
      if (contentTab == "my_team"){
        return (
          <div class="container">
          <div class="row">
          <h2>Team Manager</h2>
          </div>
          <div class="row">
          <h5>Build your Team!</h5>
          </div>

          <div class="row player-search">
          <PlayerSearch addPlayer = {this.addPlayer}/>
          </div>
          <div class="row player-list">

          <h5>Your Team</h5>
          <Players players={this.state.players} removePlayer = {this.removePlayer}/>
          </div>
          </div>
        )
      }else{
        if (yfsession==null){
          if (this.props.token==null){
            return(<div>Oops Couldnt Log into Yellowfin</div>)
          }
          url = YF_BASE_URL+"/logon.i4?LoginWebserviceId="+this.props.token
        }
      }
      if (contentTab == "my_team_report"){
          url = YF_BASE_URL+"/RunReport.i4?reportUUID=2e830a7b-c47f-45da-8d5d-3c19e09ee60e&primaryOrg=1&clientOrg=1"
      }
      if (contentTab == "new_report"){
          url = YF_BASE_URL+"/MIPreReportInit.i4"
      }
      if (contentTab == "browse"){
          url = YF_BASE_URL+"/MIPreReports.i4"
      }

      if (url!=null){
        return(<iframe width="100%" height="1200px" src={url}></iframe>)
      }
      return(<div>Page does not exist</div>)

    }
    else {
      return <div id="register-page"><h6>Create a New Account</h6><RegisterPage /></div>
    }
  }

}
function LeftNavContainer(props) {
  const isLoggedIn = props.loggedIn;
  if (isLoggedIn == null){
    return <div></div>
  }
  if (isLoggedIn){
    return(
      <nav className="col-left d-none d-md-block sidebar">
        <LeftNav switchTabs = {props.switchTabs}/>
      </nav>
    )
  }
  return (
    <nav className="col-left-login d-none d-md-block sidebar">
      <LoginPage/>
    </nav>
  )
};

class LeftNav extends React.Component{
  render(){
    return (
      <div>
        <div class="row">
          <div id="opt_select" onClick={(e) => this.props.switchTabs("my_team")}> 
            <img src="/static/app/images/team.svg" width="40px" height="40px"></img>
            <p>My Team</p>
            </div>
        </div>
        <div class="row">
          <div id="opt_select" onClick={(e) => this.props.switchTabs("my_team_report")}>
            <img src="/static/app/images/statistics.svg" width="40px" height="40px"></img>
            <p>Overview</p>
          </div>
        </div>
        <div class="row">
          <div id="opt_select" onClick={(e) => this.props.switchTabs("new_report")}>
            <img src="/static/app/images/new-page.svg" width="40px" height="40px"></img>
            <p>New Report</p>
          </div>
        </div>
        <div class="row">
          <div id="opt_select" onClick={(e) => this.props.switchTabs("browse")}>
            <img src="/static/app/images/search.svg" width="40px" height="40px"></img>
            <p>Browse</p>
          </div>
        </div>
      </div>
    );
  }

}
class LoginPage extends React.Component{
  render(){
    return (
      <form action="/login" method="post">
        <CSRFToken />
        <input type="text" name="email" className="form-control" placeholder="Email" maxlength="254" required="" id="id_email"></input>
        <input type="password" name="password" className="form-control" placeholder="Password" required="" id="id_password"></input>
        <button type="submit">Login</button>
      </form>
    );
  }

}
class RegisterPage extends React.Component{
  render(){
    return (
      <form action="/add_user" method="post">
        <CSRFToken />
        <input type="text" name="email" className="form-control" placeholder="Email" maxlength="254" required="" id="id_email"></input>
        <input type="password" name="password" className="form-control" placeholder="Password" required="" id="id_password"></input>
        <button type="submit">Register</button>
      </form>
    );
  }

}

class Players extends React.Component {
  render() {
     return (
      <div id="player-card" className="container">
        {this.props.players.map((player) => (
          <div className="row player-row">
              <div className="col-6">
                <p>{player.name}</p>
              </div>
              <div className="col">
                <p class="card-text">{player.position}  {player.team}</p>
              </div>
              <div className="col button-col">
                <button  id="drop-button" onClick={(e) => this.props.removePlayer(player.player_id)}>
                  Drop
                </button>
              </div>
          </div>
        ))}
      </div>
    );
  }
};



class PlayerSearch extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
      players: [],
      selectedId: '',
      isPlayerSelected: false
    };  
    this.getSuggestions = this.getSuggestions.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this)

  }
  componentDidMount() {
    fetch('/getAllPlayers')
    .then(res => res.json())
    .then((data) => {
      this.setState({ players : data })
    })
    .catch(console.log)
  }
   
  
  getSuggestions(value) {
    //const escapedValue = this.escapeRegexCharacters(value.trim());
    const escapedValue = value
    if (escapedValue === '') {
      return [];
    }
  
    const regex = new RegExp(escapedValue, 'i');
  
    return this.state.players.filter(player => regex.test(player.name));
  }
  
  getSuggestionValue(suggestion) {
    return suggestion.name;
  }
  
  renderSuggestion(suggestion) {
    return (
      <span>{suggestion}</span>
    );
  }
  onChange = (event, { newValue, method }) => {
    this.setState({
      isPlayerSelected: false,
      value: newValue
    });
  };
  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    const selectedPlayer = this.state.players.filter(player => {
      return player.name == suggestion
    })[0]
    this.setState({
      isPlayerSelected: true,
      selectedId: selectedPlayer.player_id,
      value: suggestion
    });
  };
  onSuggestionsFetchRequested = ({ value }) => {
    const permittedValues = this.getSuggestions(value).map(player => player.name);
    this.setState({
      suggestions: permittedValues
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search for Players",
      value,
      onChange: this.onChange
    };
    const selectedId=this.state.selectedId
    const isPlayerSelected = this.state.isPlayerSelected
    return (
      <div>

      <Autosuggest 
      suggestions={suggestions}
      onSuggestionSelected = {this.onSuggestionSelected}
      onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
      onSuggestionsClearRequested={this.onSuggestionsClearRequested}
      getSuggestionValue={this.getSuggestionValue}
      renderSuggestion={this.renderSuggestion}
      inputProps={inputProps} 
      />
      {isPlayerSelected ? (
        <div id="floats">
          <button  onClick={(e) => this.props.addPlayer(selectedId)}>
            Add Player
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
      
    );
  }
}

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';'); 
      for (var i = 0; i < cookies.length; i++) {
          var cookie = jQuery.trim(cookies[i]);
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

ReactDOM.render(e(App), document.querySelector('#app'));
//ReactDOM.render(e(PlayerCard), document.querySelector('#contacts_list'));