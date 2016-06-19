/**
 * Schedule view. Displays periods of selected courses in a week grid.
 * @param {Object} data - Object containing schedule data as returned from the API
 * @return {undefined}
 * @memberOf Yacs.views
 */
Yacs.views.schedule = function (data) {
  Yacs.setContents(HandlebarsTemplates.schedule(data));
  var scheduleElement = document.querySelector('#scheduleContainer');
  var leftSwitch = document.querySelector('#leftSwitch');
  var rightSwitch = document.querySelector('#rightSwitch');
  var scheduleNum = document.querySelector('#scheduleNum')
  var schedule = new Schedule(scheduleContainer);
  var scheduleIndex = 0;


  // this function will be deprecated when backend is updated to use minutes-since-midnight format
  // see issue #102
  var toMinutes = function (timeString) {
    var int = parseInt(timeString);
    return Math.floor(int / 100) * 60 + int % 100;
  }

  var getEvents = function (schedule) {
    var events = [];
    var crns = [];

    schedule.sections.forEach(function (section) {
      var color = crns.indexOf(section.crn);
      if (color === -1) {
        crns.push(section.crn);
        color = crns.length - 1;
      }

      section.periods.forEach(function (period) {
        events.push({
          start: toMinutes(period.start),
          end: toMinutes(period.end),
          day: period.day,
          colorNum: color,
          title: section.department_code + ' ' + section.course_number + ' - ' + section.name
        });
      });
    });
    return events;
  };

  var showSchedule = function (index) {
    var events = getEvents(data.schedules[index]);
    schedule.setEvents(events)
    scheduleNum.textContent = index + 1;
  }

  if(data.schedules.length == 0) {
    // TODO: this will happen if there are no available schedules
    return;
  }

  Yacs.on('click', leftSwitch, function () {
    scheduleIndex = (--scheduleIndex < 0 ? data.schedules.length - 1 : scheduleIndex);
    showSchedule(scheduleIndex);
  });
  Yacs.on('click', rightSwitch, function () {
    scheduleIndex = (++scheduleIndex < data.schedules.length ? scheduleIndex : 0);
    showSchedule(scheduleIndex);
  });

  showSchedule(scheduleIndex);
};