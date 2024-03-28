<template>
	<RouterView />
</template>

<script setup lang="ts">
	import { onMounted } from 'vue';

	onMounted(() => {
		console.log('cube_example');
	});
</script>

<style scoped lang="scss"></style>
