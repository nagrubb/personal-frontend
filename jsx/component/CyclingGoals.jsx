import React from 'react'
import ReactDOM from 'react-dom'

export default class CyclingGoals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      rideData: {}
    };
  }

  componentDidMount() {
    fetch("api/v1/cycle")
      .then(
        (result) => {
          if (result.status != 200) {
            throw result.statusText;
          } else {
            return result.json();
          }
        }
      )
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            rideData: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, rideData } = this.state;
    var header = (
      <div>
        <p className="w3-large">
          <b>
            <i className="fa fa-bicycle fa-fw w3-margin-right w3-text-blue"></i>Cycling Goals
            <a href="https://strava.com/athletes/22005749/badge" className="w3-margin-left strava-badge- strava-badge-follow" target="_blank"><img src="images/echelon-sprite-24.png" alt="Strava" /></a>
          </b>
        </p>
      </div>
    );

    if (error) {
      return (
        <div>
          {header}
          <br />
          <div className="w3-container w3-center">
            <h5>Error: {error}</h5>
          </div>
          <br />
        </div>
      );
    } else if (!isLoaded) {
      return (
        <div>
          {header}
          <br />
          <div className="w3-container w3-center">
            <span><i className="fa fa-spinner fa-spin fa-5x"></i></span>
          </div>
          <br />
        </div>
      );
    } else {
      function calculateDayOfYear() {
        var now = new Date();
        var start = new Date(now.getFullYear(), 0, 0);
        var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
        var oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
      }

      function calculateDaysInAYear() {
        return new Date().getFullYear() % 4 == 0 ? 366 : 365;
      }

      function invertPercentage(percentage) {
        return (1.0 / (percentage / 100.0) * 100.0);
      }

      var ytd = Math.round(rideData.ytd);
      var goal = rideData.goal;
      var totalPercent = Math.round(ytd / goal * 100);
      var totalBarPercent = totalPercent;
      var ytdGoal = Math.round(goal / calculateDaysInAYear() * calculateDayOfYear());
      var ytdExpectedPacePercentage = Math.round(ytdGoal / goal * 100);
      var onTrackPercent = Math.round(ytd / ytdGoal * 100);
      var paceString = null;
      var goalBarRightColor = 'w3-blue';
      var goalBarLeftColor = 'w3-light-grey';
      var paceBarRightColor = 'w3-blue';
      var paceBarLeftColor = 'w3-light-grey'

      if (ytd < ytdGoal) {
        paceString = `${ytdGoal - ytd} miles behind`;
      } else if (ytd > ytdGoal) {
        paceString = `${ytd - ytdGoal} miles ahead`;
      } else {
        paceString = "on pace";
      }

      if (onTrackPercent > 100) {
        //we are ahead of pace, so switch up the UI.
        //This is a little hacky considering onTrackPercent now
        //represents the pace's percentage of the total. A
        //better way to do this would actually be to use a different UI
        //component or even render the UI on the server. For now, this
        //at least makes the website look better. Will refactor
        //as this website gets more complicated.
        onTrackPercent = invertPercentage(onTrackPercent);
        paceBarRightColor = 'w3-light-grey';
        paceBarLeftColor = 'w3-blue';
      }

      //Again, a bit hacky and this could be refactored as it's the same logic
      //as above.
      if (totalBarPercent > 100) {
        totalBarPercent = invertPercentage(totalBarPercent);
        goalBarRightColor = 'w3-light-grey';
        goalBarLeftColor = 'w3-blue';
      }

      return (
        <div>
          {header}
          <p>Year End Goal ({goal} miles)</p>
          <div className={`${goalBarLeftColor} w3-round-xlarge`} style={{height: "24px"}}>
            <div className="pace-wrapper">
              <div className={`w3-round-xlarge w3-center ${goalBarRightColor}`} style={{height: "24px", width: "10%"}}></div>
              <div className="pace-line w3-hide" style={{width: "60%"}}></div>
              <div className="pace-percentage w3-center">{totalPercent}%</div>
            </div>
          </div>
          <p>Pace ({paceString})</p>
          <div className={`${paceBarLeftColor} w3-round-xlarge`} style={{height: "24px"}}>
            <div className="pace-wrapper">
              <div className={`w3-round-xlarge w3-center ${paceBarRightColor}`} style={{height: "24px", width: "10%"}}></div>
              <div className="pace-percentage w3-center">{ytd} mi / {ytdGoal} mi</div>
            </div>
          </div>
        </div>
      );
    }
  }
}
