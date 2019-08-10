/* global define, KeyboardEvent, module */
(function () {
  var keyboardeventKeyPolyfill = {
    polyfill: polyfill,
    keys: {
      3: 'Cancel',
      6: 'Help',
      8: 'Backspace',
      9: 'Tab',
      12: 'Clear',
      13: 'Enter',
      16: 'Shift',
      17: 'Control',
      18: 'Alt',
      19: 'Pause',
      20: 'CapsLock',
      27: 'Escape',
      28: 'Convert',
      29: 'NonConvert',
      30: 'Accept',
      31: 'ModeChange',
      32: ' ',
      33: 'PageUp',
      34: 'PageDown',
      35: 'End',
      36: 'Home',
      37: 'ArrowLeft',
      38: 'ArrowUp',
      39: 'ArrowRight',
      40: 'ArrowDown',
      41: 'Select',
      42: 'Print',
      43: 'Execute',
      44: 'PrintScreen',
      45: 'Insert',
      46: 'Delete',
      48: ['0', ')'],
      49: ['1', '!'],
      50: ['2', '@'],
      51: ['3', '#'],
      52: ['4', '$'],
      53: ['5', '%'],
      54: ['6', '^'],
      55: ['7', '&'],
      56: ['8', '*'],
      57: ['9', '('],
      91: 'OS',
      93: 'ContextMenu',
      106: '*',
      107: '+',
      109: '-',
      110: '.',
      111: '/',
      144: 'NumLock',
      145: 'ScrollLock',
      181: 'VolumeMute',
      182: 'VolumeDown',
      183: 'VolumeUp',
      186: [';', ':'],
      187: ['=', '+'],
      188: [',', '<'],
      189: ['-', '_'],
      190: ['.', '>'],
      191: ['/', '?'],
      192: ['`', '~'],
      219: ['[', '{'],
      220: ['\\', '|'],
      221: [']', '}'],
      222: ["'", '"'],
      224: 'Meta',
      225: 'AltGraph',
      246: 'Attn',
      247: 'CrSel',
      248: 'ExSel',
      249: 'EraseEof',
      250: 'Play',
      251: 'ZoomOut'
    }
  };

  // Function keys (F1-24).
  var i;
  for (i = 1; i < 25; i++) {
    keyboardeventKeyPolyfill.keys[111 + i] = 'F' + i;
  }

  // Printable ASCII characters.
  var letter = '';
  for (i = 65; i < 91; i++) {
    letter = String.fromCharCode(i);
    keyboardeventKeyPolyfill.keys[i] = [letter.toLowerCase(), letter.toUpperCase()];
  }

  // Numbers on numeric keyboard.
  for (i = 96; i < 106; i++) {
    letter = String.fromCharCode(i - 48);
    keyboardeventKeyPolyfill.keys[i] = letter;
  }

  function polyfill () {
    var isEdgeOrIE = (navigator.userAgent.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) || navigator.userAgent.indexOf("Edge/") > 0);
    if (!('KeyboardEvent' in window) ||
        ('key' in KeyboardEvent.prototype && !isEdgeOrIE)) {
      return false;
    }

    // Polyfill `key` on `KeyboardEvent`.
    var proto = {
      get: function (x) {
        var key = keyboardeventKeyPolyfill.keys[this.which || this.keyCode];

        if (Array.isArray(key)) {
          key = key[+this.shiftKey];
        }

        return key;
      },
      enumerable: true,
      configurable: true
    };
    Object.defineProperty(KeyboardEvent.prototype, 'key', proto);
    return proto;
  }

  if (typeof define === 'function' && define.amd) {
    define('keyboardevent-key-polyfill', keyboardeventKeyPolyfill);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    module.exports = keyboardeventKeyPolyfill;
  } else if (window) {
    window.keyboardeventKeyPolyfill = keyboardeventKeyPolyfill;
  }

  keyboardeventKeyPolyfill.polyfill();

  String.prototype.strip = function(char) {
      return this.replace(new RegExp("^" + char + "*"), '').
          replace(new RegExp(char + "*$"), '');
  }

  $.extend_if_has = function(desc, source, array) {
      for (var i=array.length;i--;) {
          if (typeof source[array[i]] != 'undefined') {
              desc[array[i]] = source[array[i]];
          }
      }
      return desc;
  };

  (function($) {
      $.fn.console = function(eval, options) {
          if ($('body').data('console')) {
              return $('body').data('console').terminal;
          }
          this.addClass('tilda');
          options = options || {};
          eval = eval || function(command, term) {
              term.echo("you don't set eval for console");
          };
          var settings = {
              prompt: 'ninja> ',
              name: 'console',
              height: 150,
              enabled: false,
              greetings: 'Welcome to the ninja console!',
              keypress: function(e) {
                  if (e.which == 96) {
                      return false;
                  }
              }
          };
          if (options) {
              $.extend(settings, options);
          }
          this.append('<div class="td"></div>');
          var self = this;
          self.terminal = this.find('.td').terminal(eval, settings);
          var focus = false;
          $(document.documentElement).keypress(function(e) {
              if (e.which == 96) {
                  self.slideToggle('fast');
                  self.terminal.focus(focus = !focus);
                  self.terminal.attr({
                      scrollTop: self.terminal.attr("scrollHeight")
                  });
              }
          });
          $('body').data('console', this);
          this.hide();
          return self;
      };
  })(jQuery);

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

  function fetchCyclingGoalData(rideData){
    var fillFunction = function(rideData) {
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

      var content = `
      <p>Year End Goal (${goal} miles)</p>
      <div class="${goalBarLeftColor} w3-round-xlarge" style="height:24px">
        <div class="pace-wrapper">
          <div class="w3-round-xlarge w3-center ${goalBarRightColor}" style="height:24px;width:${totalBarPercent}%"></div>
          <div class="pace-line w3-hide" style="width:${ytdExpectedPacePercentage}%"></div>
          <div class="pace-percentage w3-center">${totalPercent}%</div>
        </div>
      </div>
      <p>Pace (${paceString})</p>
      <div class="${paceBarLeftColor} w3-round-xlarge" style="height:24px">
        <div class="pace-wrapper">
          <div class="w3-round-xlarge w3-center ${paceBarRightColor}" style="height:24px;width:${onTrackPercent}%"></div>
          <div class="pace-percentage w3-center">${ytd} mi / ${ytdGoal} mi</div>
        </div>
      </div>
      `;
      $("#CyclingGoalContent").html(content);
    }

    $.ajax({
      url: "cycle",
      dataType: 'json',
      success: function(result) {
        fillFunction(result);
      },
      error: function() {
        /*
        //use for testing
        result = {
          "ytd"  : 0,
          "goal" : 2000
        };
        fillFunction(result);
        */
      }
    });
  }

  function createJobHeader(id, title, company, location, companyUrl, logo, duration) {
    var selector = `[id=${id}]`;
    var content =
      `<h5 class="w3-opacity">
        <div class="w3-hide-small w3-hide-medium">
          <b>${title} / <a href="${companyUrl}">${company}</a></b>
          <img src="images/${logo}" class="w3-margin-left" style="width:20px"/>
        </div>
        <div class="w3-hide-large">
          <b>${title}</b>
          <div></div>
          <b><a href="${companyUrl}">${company}</a></b>
          <div></div>
        </div>
      </h5>
      <h6 class="w3-text-grey w3-hide-small w3-hide-medium">
        <i class="w3-text-blue fa fa-calendar fa-fw w3-margin-right"></i>${duration}
        <i class="w3-right w3-text-blue fa fa-map fa-fw w3-margin-left"></i>
        <span class="w3-right">${location}</span>
      </h6>
      <h6 class="w3-text-grey w3-hide-large">
        <div><i class="w3-text-blue fa fa-map fa-fw w3-margin-right"></i>${location}</div>
        <div><i class="w3-text-blue fa fa-calendar fa-fw w3-margin-right"></i>${duration}</div>
      </h6>`;
    body=$(selector).html();
    $(selector).html(content + body);
  }

  function fetchStockPrice(quote) {
    var url = `stock/${quote}`;
    var selector = `[id=${quote}]`;

    var fillFunction = function(selector, price) {
      var content = `<i class="w3-text-black w3-margin-left"></i><b class="w3-margin-left">${price}</b>`
      $(selector).html(content);
    }

    $.ajax({
      url: url,
      dataType: 'json',
      success: function(result) {
        fillFunction(selector, `$${result.closing_price}`);
      },
      error: function() {
        fillFunction(selector, "");
      }
    });
  }

  jQuery(document).ready(function($) {
      //power the Quake terminal ;)
      $('#console').console(function(command, terminal) {
          terminal.echo('you type command "' + command + '"');
      });

      createJobHeader(
        'job-axon-manager',
        'Software Engineering Manager',
        'Axon',
        'HCMC, Vietnam',
        'https:///www.axon.com',
        'axon.png',
        'May 2019 - <span class="w3-tag w3-blue w3-round">Current</span>'
      );

      createJobHeader(
        'job-axon-staff',
        'Staff Software Engineer',
        'Axon',
        'Seattle, WA, USA',
        'https:///www.axon.com',
        'axon.png',
        'Jan 2019 - May 2019'
      );

      createJobHeader(
        'job-axon-senior',
        'Senior Software Engineer',
        'Axon',
        'Seattle, WA, USA',
        'https:///www.axon.com',
        'axon.png',
        'Feb 2015 - Dec 2018'
      );

      createJobHeader(
        'job-msft-II',
        'Software Engineer II',
        'Microsoft',
        'Redmond, WA, USA',
        'https://www.microsoft.com',
        'msft.png',
        'Jan 2012 - Feb 2015'
      );

      createJobHeader(
        'job-bbry-junior',
        'Software Engineer',
        'BlackBerry',
        'Wateroo, ON, Canada',
        'https://www.blackberry.com',
        'bbry.png',
        'Jun 2010 - Jan 2012'
      );

      createJobHeader(
        'job-bbry-intern',
        'Software Engineer Intern',
        'BlackBerry',
        'Wateroo, ON, Canada',
        'https://www.blackberry.com',
        'bbry.png',
        'Apr 2008 - Aug 2009'
      );

      //kick off some AJAX calls to fill in some dynamic data
      fetchCyclingGoalData();

      $.getJSON('json/visited_countries.geo.json', function(data) {
        createMap('map', data);
      });
  });
})();
