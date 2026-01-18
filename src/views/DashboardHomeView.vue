<script setup lang="ts">
	import InformationDialog from "@/components/information-dialog/InformationDialog.vue";
	import { Button } from "primevue";
	import Cookies from "js-cookie";

	const reset = () => {
		Cookies.remove("have-read-information-dialog");
		Cookies.remove("access-token");
		Cookies.remove("refresh-token");
		window.location.reload();
	}
</script>

<template>
	<div class="about">
		<h1>This is an about page</h1>
		<Button label="Click me to reset" @click="reset()" />

		<InformationDialog />
	</div>
</template>

<style>
</style>
