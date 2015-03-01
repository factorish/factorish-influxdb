// == Configuration
// config.js is where you will find the core Grafana configuration. This file contains parameter that
// must be set before Grafana is run for the first time.

{{ $influx_api := getvs "/influxdb-8086/*" }}
{{ $grafana_db := getenv "GRAFANA_DATABASE"}}{{ $grafana_user := getenv "GRAFANA_USER"}}
{{ $grafana_metrics_db := getenv "GRAFANA_METRICS_DATABASE"}}{{ $grafana_metrics_user := getenv "GRAFANA_METRICS_USER"}}
{{ $grafana_user_loc := printf "/influxdb/databases/%s/users/%s" $grafana_db $grafana_user }}
{{ $grafana_metrics_user_loc := printf "/influxdb/databases/%s/users/%s" $grafana_metrics_db $grafana_metrics_user }}

define(['settings'], function(Settings) {

  return new Settings({

      /* Data sources
      * ========================================================
      * Datasources are used to fetch metrics, annotations, and serve as dashboard storage
      *  - You can have multiple of the same type.
      *  - grafanaDB: true    marks it for use for dashboard storage
      *  - default: true      marks the datasource as the default metric source (if you have multiple)
      *  - basic authentication: use url syntax http://username:password@domain:port
      */

      // InfluxDB example setup (the InfluxDB databases specified need to exist)

      datasources: {
        influxdb: {
          type: 'influxdb',
          url: "http://{{ getenv "HOST" }}:8082/db/{{ $grafana_metrics_db }}",
          username: '{{ $grafana_metrics_user }}',
          password: '{{ getv $grafana_metrics_user_loc }}',
        },
        grafana: {
          type: 'influxdb',
          url: "http://{{ getenv "HOST" }}:8082/db/{{ $grafana_db }}",
          username: '{{ $grafana_user }}',
          password: '{{ getv $grafana_user_loc }}',
          grafanaDB: true
        },
      },

      /* Global configuration options
      * ========================================================
      */

      // specify the limit for dashboard search results
      search: {
        max_results: 100
      },

      // default home dashboard
      default_route: '/dashboard/file/default.json',

      // set to false to disable unsaved changes warning
      unsaved_changes_warning: true,

      // set the default timespan for the playlist feature
      // Example: "1m", "1h"
      playlist_timespan: "1m",

      // If you want to specify password before saving, please specify it below
      // The purpose of this password is not security, but to stop some users from accidentally changing dashboards
      admin: {
        password: ''
      },

      // Change window title prefix from 'Grafana - <dashboard title>'
      window_title_prefix: 'Grafana - ',

      // Add your own custom panels
      plugins: {
        // list of plugin panels
        panels: [],
        // requirejs modules in plugins folder that should be loaded
        // for example custom datasources
        dependencies: [],
      }

    });
});
