<script setup lang="ts">
	import { Button, Dialog } from "primevue";
    import Cookies from "js-cookie";
    import { ref } from "vue";
    import { onMounted } from "vue";

    onMounted(async () => {
        visible.value = Cookies.get(cookiePath) == null;
    });

    const step = ref<"start" | "better-user-experience" | "easier-administration" | "better-order-flow">("start");
    const cookiePath = "have-read-information-dialog";
    const visible = ref<boolean>(false);

    const closeDialog = () => {
        Cookies.set(cookiePath, "true", { expires: 365 });
        visible.value = false;
    }

    const stepForward = () => {
        if (step.value === "start") {
            step.value = "better-user-experience";
        } else if (step.value === "better-user-experience") {
            step.value = "easier-administration";
        } else if (step.value === "easier-administration") {
            step.value = "better-order-flow";
        }
    }

    const stepBeck = () => {
        if (step.value === "better-order-flow") {
            step.value = "easier-administration";
        } else if (step.value === "easier-administration") {
            step.value = "better-user-experience";
        }
    }
</script>
<template>
    <Dialog
        v-model:visible="visible"
        modal
        :closable="false"
        :dismissableMask="false"
    >
        <div class="dialog-content">
            
            <img v-if="step === 'start'" src="@/components/assets/overview.svg" alt="Step image" />
            <img v-else-if="step === 'better-user-experience'" src="@/components/assets/better-user-experience.svg" alt="Step image" />
            <img v-else-if="step === 'easier-administration'" src="@/components/assets/easier-administration.svg" alt="Step image" />
            <img v-else-if="step === 'better-order-flow'" src="@/components/assets/better-order-flow.svg" alt="Step image" />

            <div class="button-container">
                <template v-if="step === 'start'">
                    <div class="button-container--left">
                        <Button type="button" label="Kom i gang" iconPos="right" @click="stepForward()">
                            <template #icon="slotProps">
                                <img :class="[slotProps.class]" src="@/components/assets/arrow-right.svg" alt="Arrow right" />
                            </template>
                        </Button>   
                    </div>
                </template>
                <template v-else-if="step === 'better-user-experience'">
                    <div class="button-container--left">
                        <div class="skip-dialog" @click="closeDialog()">
                            Spring over
                        </div>
                    </div>
                    <div class="button-container--right">
                        <Button type="button" label="Kom i gang" iconPos="right" @click="stepForward()">
                            <template #icon="slotProps">
                                <img :class="[slotProps.class]" src="@/components/assets/arrow-right.svg" alt="Arrow right" />
                            </template>
                        </Button>
                    </div>
                </template>
                <template v-else-if="step === 'easier-administration'">
                    <div class="button-container--left">
                        <div class="skip-dialog" @click="closeDialog()">
                            Spring over
                        </div>
                    </div>
                    <div class="button-container--right">
                        <Button type="button" severity="secondary"  label="Forrige" iconPos="left" @click="stepBeck()">
                            <template #icon="slotProps">
                                <img :class="[slotProps.class]" src="@/components/assets/arrow-left.svg" alt="Arrow left" />
                            </template>
                        </Button>
                        <Button type="button" label="Næste" iconPos="right" @click="stepForward()">
                            <template #icon="slotProps">
                                <img :class="[slotProps.class]" src="@/components/assets/arrow-right.svg" alt="Arrow right" />
                            </template>
                        </Button>
                    </div>
                </template>
                <template v-else-if="step === 'better-order-flow'">
                    <div class="button-container--left">
                    </div>
                    <div class="button-container--right">
                        <Button type="button" label="Kom i gang" @click="closeDialog()" />
                    </div>
                </template>
            </div>
        </div>
    </Dialog>

</template>


<style lang="scss" scoped>
    .dialog-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 2rem 3rem;

        > img {
            max-width: 800px;
        }
    }

    .button-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 4rem;

        .skip-dialog {
            font-size: 14px;
            line-height: calc(14px * 1.4);
            text-decoration: underline;
            cursor: pointer;
        }

        &--right {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
    }

</style>