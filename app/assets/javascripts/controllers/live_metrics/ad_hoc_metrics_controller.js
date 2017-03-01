/* global miqHttpInject */

  ManageIQ.angular.app.controller('adHocMetricsController', ['$http', '$window', 'miqService',
    'metricsUtilsFactory', 'metricsHttpFactory', 'metricsConfigFactory',
    function($http, $window, miqService, metricsUtilsFactory, metricsHttpFactory, metricsConfigFactory) {

    var dash = this;
    var utils = metricsUtilsFactory(dash);
    var httpUtils = metricsHttpFactory(dash, $http, utils, miqService);

    // get the pathname and remove trailing / if exist
    var pathname = $window.location.pathname.replace(/\/$/, '');

    dash.providerId = '/' + (/^\/[^\/]+\/(\d+)$/.exec(pathname)[1]);
    dash.tenant = '_ops';
    dash.minBucketDurationInSecondes = 20 * 60;
    dash.max_metrics = 1000;

    var initialization = function() {
      dash.tenantChanged = false;
      dash.filterChanged = true;
      dash.itemSelected = false;
      dash.tagsLoaded = false;
      dash.applied = false;
      dash.showGraph = false;

      dash.filtersText = '';
      dash.definitions = [];
      dash.items = [];
      dash.tags = {};
      dash.chartData = {};

      dash.filterConfig = {
        fields: [],
        appliedFilters: [],
        resultsCount: 0,
        onFilterChange: filterChange
      };

      dash.toolbarConfig = {
        filterConfig: dash.filterConfig,
        actionsConfig: dash.actionsConfig
      };

      dash.graphToolbarConfig = {
        actionsConfig: dash.actionsConfig
      };

      dash.url = '/container_dashboard/data' + dash.providerId  + '/?live=true&tenant=' + dash.tenant;

      httpUtils.getMetricTags();
    }

    var filterChange = function (filters, addOnly) {
      dash.filterChanged = true;
      dash.filtersText = "";
      dash.tags = {};

      // prevent listing all metrics point
      if (dash.filterConfig.appliedFilters.length === 0) {
        dash.applied = false;
        dash.items = [];
        dash.filterConfig.resultsCount = 0;
        return;
      }

      dash.filterConfig.appliedFilters.forEach(function (filter) {
        if (filter.title && filter.value) {
          dash.filtersText += filter.title + " : " + filter.value + "\n";
          dash.tags[filter.id] = filter.value;
        }
      });

      // when change filter we automatically apply changes
      if (!addOnly) {
        dash.items = [];
        dash.filterChanged = false;
        dash.filterConfig.resultsCount = 0;
        dash.applyFilters();
      }
    };

    dash.doAddFilter = function() {
      // if field is empty return
      if ( !dash.filterConfig.currentValue ) return;
      var filter = $('.filter-pf.filter-fields').scope().currentField;

      dash.filterConfig.appliedFilters.push({
        id: filter.id,
        title: filter.title,
        value: dash.filterConfig.currentValue}
      );
      dash.filterConfig.currentValue = "";

      // add a filter but only add (do not apply)
      filterChange(null, true);
    };

    dash.applyFilters = function() {
      dash.applied = true;
      dash.filterChanged = false;
      httpUtils.refreshList();
    };

    dash.viewGraph = function() {
      dash.showGraph = true;
      dash.chartDataInit = false;
      httpUtils.refreshGraph();
    };

    dash.viewMetrics = function() {
      dash.showGraph = false;
      httpUtils.refreshList();
    };

    dash.refreshTenant = function() {
      initialization();
    };

    dash.getTenants = httpUtils.getTenants;
    dash.refreshList = httpUtils.refreshList;
    dash.refreshGraph = httpUtils.refreshGraph;

    metricsConfigFactory(dash);
    initialization();
  }]);
