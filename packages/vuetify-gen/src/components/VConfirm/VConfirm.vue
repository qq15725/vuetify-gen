<template>
	<v-dialog
		max-width="400"
		v-model="isActive"
		:disabled="disabled"
		:persistent="persistent"
	>
		<template v-slot:activator="{ on }">
			<slot name="activator" :on="on">
				<v-btn
					v-if="activatorText"
					color="primary"
					small
					text
					:disabled="disabled"
					v-on="on"
				>
					{{ activatorText }}
				</v-btn>
			</slot>
		</template>

		<v-card>
			<v-card-title class="body-2">
				<div>
					<v-icon :size="22" color="tertiary" class="mr-2" v-text="'info'"></v-icon>
					{{ title }}
				</div>
			</v-card-title>
			<v-divider/>
			<v-card-actions class="justify-end">
				<v-btn
					color="primary"
					small
					dark
					depressed
					@click="onOk"
				>
					{{ okText || '确定' }}
				</v-btn>
				<v-btn
					color="primary"
					small
					dark
					depressed
					outlined
					@click="onCancel"
				>
					{{ cancelText || '取消' }}
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
  import mixins from '../../util/mixins'
  import toggleable from '../../mixins/toggleable'

	import {
    VDialog,
		VBtn,
		VCard,
		VCardTitle,
    VCardActions,
    VIcon,
		VDivider
	} from 'vuetify/lib'

  const baseMixins = mixins(
    toggleable
  )

  export default baseMixins.extend({
		components: {
      VDialog,
      VBtn,
      VCard,
      VCardTitle,
      VCardActions,
      VIcon,
      VDivider
		},
    props: {
      title: String,
      okText: String,
      cancelText: String,
      activatorText: String,
      disabled: Boolean,
      persistent: Boolean,
      ok: Function,
      cancel: Function
    },
    methods: {
      onOk () {
        if (this.ok) {
          this.ok()
        } else {
          this.$emit('ok')
        }
        this.isActive = false
      },
      onCancel () {
        if (this.cancel) {
          this.cancel()
        } else {
          this.$emit('cancel')
        }
        this.isActive = false
      }
    }
  })
</script>
