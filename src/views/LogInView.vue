<script setup lang="ts">
import { ref } from "vue";
import { InputText, Button, Message, FloatLabel } from "primevue";
import { IdentityService } from "@/identity-service/identity-service";
import { useRouter } from "vue-router";
import { routeLocations } from "@/router";

const router = useRouter()

const username = ref("");
const password = ref("");
const invalid = ref(false);

const logIn = async () => {
    try {
        await new IdentityService().logIn(username.value, password.value)
        router.push({
            name: routeLocations.dashboardHomeView.name
        })
    } catch {
        invalid.value = true;
    }
}
</script>

<template>
    <div class="login-view">
        <div class="login-header">
            <img src="@/assets/logo.svg" alt="Clever Logo" />
        </div>
        <div class="login-container">
            <div class="login-title">
                Velkommen til <br />Selvbetjening
            </div>
            <div class="login-subtitle">
                Log ind med din brugerkonto
            </div>
            <div class="login-input-container">
                <FloatLabel variant="on">
                    <InputText v-model="username" :invalid="invalid" name="username" type="email" class="login-input" />
                    <label for="username">
                        Email *
                    </label>
                </FloatLabel>
            </div>
            <div class="login-input-container">
                <FloatLabel variant="on">
                    <InputText v-model="password" :invalid="invalid" name="password" type="password" class="login-input" />
                    <label for="password">
                        Adgangskode *
                    </label>
                </FloatLabel>
                <Message v-if="invalid" severity="error" size="small" variant="simple">
                    Den e-mail eller adgangskode, du har indtastet, er ugyldig. Prøv igen.
                </Message>
            </div>
            <Button type="submit" severity="primary" label="Log ind" @click="logIn()" class="login-button" />
            <a href="#" class="forgot-password-link">Glemt adgangskode?</a>
        </div>
    </div>
</template>


<style lang="scss" scoped>
    .login {
        &-view {
            display: flex;
            flex-direction: column;
            padding-left: 5rem;
            padding-top: 8rem;
        }

        &-container {
            padding-top: 12rem;;
            width: 450px;
            display: flex;
            gap: 1rem;
            flex-direction: column;
            align-items: flex-start;
        }

        &-title {
            font-size: 3rem;
            font-weight: 600;
            line-height: 1.2;
            margin-bottom: .75rem;
        }

        &-subtitle {
            font-size: 1.333rem;
        }

        &-input-container {
            width: 100%;
        }

        &-input {
            width: 100%;
        }

        &-button {
            margin-top: 1rem;
        }
    }
</style>