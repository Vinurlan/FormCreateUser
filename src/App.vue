<template>
	<div id="app">
		<FormCreateUser @success="openModal"/>
        <ModalSuccessful v-if='showModal' @close="closeModal"/>
	</div>
	
</template>

<script>
import FormCreateUser from './components/FormCreateUser'
import ModalSuccessful from './components/ModalSuccessful'


export default {
	name: 'App',
	components: {
		FormCreateUser,
		ModalSuccessful
	},
	data() {
		return {
			showModal: false
		}
	},
	methods: {
		closeModal() {
            this.showModal = false
		},
		openModal() {
			this.showModal = true
		}
	}
}
</script>

<style lang="scss">
#app {
	font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #5E4C4C;
	width: 100%;
	min-height: 740px;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
