<template>
	<v-app>
		<parent-layout/>
	</v-app>
</template>

<script>
  import ParentLayout from '@parent-theme/layouts/Layout.vue'

  export default {
    components: {
      ParentLayout
    }
  }
</script>

<style>
	.v-application code {
		box-shadow: none;
	}

	.v-application code:after, .v-application code:before, .v-application kbd:after, .v-application kbd:before {
		content: none;
	}

  /* fix v-date */
  .v-date-picker-table--date table {
    margin: 0;
  }
  .v-date-picker-table--date th {
    border: 0;
  }
  .v-date-picker-table--date tr,
  .v-date-picker-table--date td {
    background-color: inherit;
    border: 0;
    padding: 0;
  }

  /* fix v-table */

  .v-data-table table {
    display: table;
  }

  .v-data-table tr,
  .v-data-table th,
  .v-data-table td {
    border: inherit;
  }
</style>