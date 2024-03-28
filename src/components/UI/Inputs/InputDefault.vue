<template>
	<div class="form-group">
		<span>speed animation (max 3000)</span>
		<input
			v-model.trim="inputValue"
			class="form-field"
			:type="type"
			placeholder=""
			@keyup="keypressHandler"
			:max="maxValue"
			:min="minValue"
		/>
	</div>
</template>

<script setup lang="ts">
	import { computed } from 'vue';

	const props = withDefaults(
		defineProps<{
			input: string | number;
			type: 'text' | 'number';
			maxValue?: number;
			minValue?: number;
		}>(),
		{
			type: 'text'
		}
	);

	const emits = defineEmits(['update:input']);

	const inputValue = computed({
		get() {
			return props.input;
		},
		set(value) {
			emits('update:input', value);
		}
	});

	const keypressHandler = (e: KeyboardEvent) => {
		if (props.type === 'number') {
			const currentValue = (e.target as HTMLInputElement).value;
			if (props.maxValue && Number(currentValue) > props.maxValue) {
				inputValue.value = props.maxValue;
			}
		}
	};
</script>

<style scoped lang="scss">
	.form-field {
		display: block;
		width: 100%;
		padding: 8px 16px;
		line-height: 25px;
		font-size: 14px;
		font-weight: 500;
		font-family: inherit;
		border-radius: 6px;
		-webkit-appearance: none;
		color: var(--input-color);
		border: 1px solid var(--input-border);
		background: var(--input-background);
		transition: border 0.3s ease;
		&::placeholder {
			color: var(--input-placeholder);
		}
		&:focus {
			outline: none;
			border-color: var(--input-border-focus);
		}
	}

	.form-group {
		position: relative;
		display: flex;
		width: 100%;
		& > span,
		.form-field {
			white-space: nowrap;
			display: block;
			&:not(:first-child):not(:last-child) {
				border-radius: 0;
			}
			&:first-child {
				border-radius: 6px 0 0 6px;
			}
			&:last-child {
				border-radius: 0 6px 6px 0;
			}
			&:not(:first-child) {
				margin-left: -1px;
			}
		}
		.form-field {
			position: relative;
			z-index: 1;
			flex: 1 1 auto;
			width: 1%;
			margin-top: 0;
			margin-bottom: 0;
		}
		& > span {
			text-align: center;
			padding: 8px 12px;
			font-size: 14px;
			line-height: 25px;
			color: var(--group-color);
			background: var(--group-background);
			border: 1px solid var(--group-border);
			transition: background 0.3s ease, border 0.3s ease, color 0.3s ease;
		}
		&:focus-within {
			& > span {
				color: var(--group-color-focus);
				background: var(--group-background-focus);
				border-color: var(--group-border-focus);
			}
		}
	}
</style>
