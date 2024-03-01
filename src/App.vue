<script setup lang="ts">
import { onMounted, ref } from "vue";
import { randomAdvice } from "./services/advice";
import { TYPE_TOAST, useToast } from "pine-btree";

const toast = useToast();
const advice = ref("");

const loading = ref(false);
const lastCall = ref<Date | null>(null);

const obterAdvice = async () => {
  const now = new Date();
  if (
    !lastCall.value ||
    (lastCall.value && now.getTime() - lastCall.value!.getTime() > 2000)
  ) {
    loading.value = true;
    const { data } = await randomAdvice();
    lastCall.value = new Date();
    advice.value = data.slip.advice;
    loading.value = false;
  } else {
    toast.show(
      "Any repeat-request within 2 seconds will return the same piece of advice",
      {
        type: TYPE_TOAST.ERROR,
      }
    );
  }
};

onMounted(async () => {
  obterAdvice();
});
</script>

<template>
  <PineApp>
    <PineContainer class="screen">
      <PineBtn @click="obterAdvice" :loading="loading">Search Advice</PineBtn>
      <div class="mt-5">
        <PineLoading v-if="loading" :size="30"></PineLoading>
        <p v-else class="mt-5 text">{{ advice }}</p>
      </div>
    </PineContainer>
  </PineApp>
</template>

<style scoped>
.screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.text {
  text-align: center;
}
</style>
