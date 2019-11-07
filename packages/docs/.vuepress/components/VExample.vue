<template>
	<v-card>
		<v-toolbar flat dense color="grey lighten-3">
			<v-spacer></v-spacer>
			<v-btn icon @click="show = !show">
				<v-icon v-text="'code'"></v-icon>
			</v-btn>
		</v-toolbar>

    <v-expand-transition>
      <v-card v-if="show">
        <div v-highlight>
          <pre class="ma-0 overflow-auto"><code class="html">{{ $refs.component.template }}</code></pre>
        </div>
      </v-card>
    </v-expand-transition>

		<v-card-text class="text-center">
			<component ref="component" :is="`example-${example}`"></component>
		</v-card-text>
	</v-card>
</template>

<script>
	export default {
		props: {
		  example: String
		},
		data () {
		  return {
		    show: false
			}
		}
	}
</script>