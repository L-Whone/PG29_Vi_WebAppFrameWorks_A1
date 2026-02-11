<template>
    <div class="contact-page">
        <ContactHeader />

        <form @submit.prevent="handleSubmit">
            <label>Name: </label>
            <input v-model="name" />

            <label>Email: </label>
            <input v-model="email" />

            <label>Message: </label>
            <input v-model="message" />

            <button class="submit" type="submit">Submit Feedback</button>
        </form>
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import ContactHeader from "@/components/ContactHeader.vue"


    const name = ref("");
    const email = ref("");
    const message = ref("");


    type ContactFormInfo = {
        name: string;
        email: string;
        message: string;
    }

    async function handleSubmit() {
        if (name.value === "" || email.value === "" || message.value === "") return

        const contactForm: ContactFormInfo = {
            name: name.value,
            email: email.value,
            message: message.value
        };

    
        try {
            const response = await fetch("http://localhost:3000/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contactForm)
            });

            const data = await response.json();
            console.log("Server response:", data);

            // Reset input fieldsa
            name.value = "";
            email.value = "";
            message.value = "";

        } catch (err) {
            console.error("Error sending feedback:", err);
        }
    }
</script>

