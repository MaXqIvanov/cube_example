<template>
	<section class="home">
		<div
			class="box"
			ref="boxElement"
			id="boxElement"
			:style="style"
		></div>
		<div class="btn-list">
			<button
				class="btn"
				@click="clickHandler(ElementMovement.LEFT)"
			>
				To left
			</button>
			<button
				class="btn"
				@click="clickHandler(ElementMovement.RIGHT)"
			>
				To right
			</button>
		</div>
		<InputDefault
			v-model:input="animationSpeed"
			class="input__animation"
			type="number"
			:max-value="3000"
			:min-value="0"
		/>
		<a
			target="_blank"
			href="https://github.com/MaXqIvanov/cube_example"
			class="link__gitlab"
			>gitlab</a
		>
	</section>
</template>

<script setup lang="ts">
	import { computed, ComputedRef, onMounted, ref, StyleValue } from 'vue';
	import { TBoxElement } from '@/types/index';
	import { ElementMovement } from '@/const';
	import InputDefault from '@/components/UI/Inputs/InputDefault.vue';

	const boxElement = ref<HTMLDivElement | null>(null);
	const boxElementCharacter = ref<TBoxElement>({
		width: 0,
		height: 0,
		shiftElementOfCenter: 0,
		rotateElement: 0
	});
	let isAnimation = false;
	const animationSpeed = ref(1000);
	const style: ComputedRef<StyleValue> = computed(() => {
		return {
			position: 'absolute',
			top: 'calc(50% - 150px)',
			left: `calc(50% + ${boxElementCharacter.value.shiftElementOfCenter}px)`,
			transform: `rotate(${boxElementCharacter.value.rotateElement}deg)`
		};
	});
	const clickHandler = (movement: ElementMovement) => {
		if (isAnimation) return;
		if (movement === ElementMovement.LEFT) {
			leftHandler();
			return;
		}
		rightHandler();
	};

	const leftHandler = () => {
		if (boxElement.value && boxElementCharacter.value.width) {
			const leftMovement =
				boxElement.value.offsetLeft - boxElementCharacter.value.width > 0
					? boxElementCharacter.value.width
					: boxElement.value.offsetLeft;
			isAnimation = true;

			boxElement.value!.animate(
				[
					{ left: `calc(50% + ${boxElementCharacter.value.shiftElementOfCenter}px)`, transform: `rotate(0deg)` },
					{
						left: `calc(50% + ${boxElementCharacter.value.shiftElementOfCenter}px - ${leftMovement}px)`,
						transform: `rotate(-90deg)`
					}
				],
				{
					fill: 'forwards',
					duration: Number(animationSpeed.value),

					iterations: 1
				}
			);

			boxElementCharacter.value.shiftElementOfCenter -= leftMovement;

			setTimeout(() => {
				isAnimation = false;
			}, Number(animationSpeed.value));
		}
	};

	const rightHandler = () => {
		if (boxElement.value && boxElementCharacter.value.width) {
			const offetRight = window.innerWidth - boxElement.value!.offsetLeft - boxElementCharacter.value.width;

			const rightMovement =
				offetRight - boxElementCharacter.value.width > 0 ? boxElementCharacter.value.width : offetRight;
			isAnimation = true;

			boxElement.value!.animate(
				[
					{ left: `calc(50% + ${boxElementCharacter.value.shiftElementOfCenter}px)`, transform: `rotate(0deg)` },
					{
						left: `calc(50% + ${boxElementCharacter.value.shiftElementOfCenter}px + ${rightMovement}px)`,
						transform: `rotate(+90deg)`
					}
				],
				{
					fill: 'forwards',
					duration: Number(animationSpeed.value),

					iterations: 1
				}
			);

			boxElementCharacter.value.shiftElementOfCenter += rightMovement;

			setTimeout(() => {
				isAnimation = false;
			}, Number(animationSpeed.value));
		}
	};

	onMounted(() => {
		if (boxElement.value) {
			boxElementCharacter.value = {
				width: boxElement.value.clientWidth,
				height: boxElement.value.clientHeight,
				shiftElementOfCenter: -boxElement.value.clientWidth / 2,
				rotateElement: 0
			};
		}
	});
</script>

<style scoped lang="scss">
	.home {
		transition: all linear 10s;
		.box {
			width: 100px;
			height: 100px;
			background: red;
			animation: alternate;
		}

		.btn-list {
			display: flex;
			gap: 12px;
			margin-top: 10px;
		}

		.input {
			&__animation {
				position: absolute;
				top: 0px;
				right: 0px;
				max-width: 320px;
			}
		}
	}
	.link {
		&__gitlab {
			position: absolute;
			right: 10px;
			top: 50px;
		}
	}
</style>
