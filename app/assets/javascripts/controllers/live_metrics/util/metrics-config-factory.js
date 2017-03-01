angular.module('miq.util').factory('metricsConfigFactory', function() {
  return function (dash) {
    function selectionChange() {
      dash.itemSelected = false;
      for (var i = 0; i < dash.items.length && !dash.itemSelected; i++) {
        if (dash.items[i].selected) {
          dash.itemSelected = true;
        }
      }
    };

    dash.actionsConfig = {
      actionsInclude: true
    };

    dash.timeFilter = {
      time_range: 24,
      range_count: 1,
      date: moment()
    };

    dash.countDecrement = function() {
      if (dash.timeFilter.range_count > 1) {
        dash.timeFilter.range_count--;
      }
    };

    dash.countIncrement = function() {
      dash.timeFilter.range_count++;
    };

    dash.timeRanges = [
      {title: _("Hours"), value: 1},
      {title: _("Days"), value: 24},
      {title: _("Weeks"), value: 168},
      {title: _("Months"), value: 672}
    ];

    dash.dateOptions = {
      format: __('MM/DD/YYYY HH:mm')
    };

    // Graphs
    dash.chartConfig = {
      legend       : { show: false },
      chartId      : 'ad-hoc-metrics-chart',
      point        : { r: 1 },
      axis         : {
        x: {
          tick: {
            count: 25,
            format: function (value) { return moment(value).format(__('MM/DD/YYYY HH:mm')); }
          }},
        y: {
          tick: {
            count: 4,
            format: function (value) { return numeral(value).format('0,0.00a'); }
          }}
      },
      setAreaChart : true,
      subchart: {
        show: true
      }
    };

    dash.listConfig = {
      selectionMatchProp: 'id',
      showSelectBox: true,
      useExpandingRows: true,
      onCheckBoxChange: selectionChange
    };
  }
});
