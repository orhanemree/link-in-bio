<template>
    <div class="grid grid-cols-1 md:grid-cols-2 min-h-screen pt-24 pb-8 px-7 sm:p-24 gap-12">
        <div class="_flex">
            <div class="sm:p-5 text-emerald-800">
                <div>
                    <h1 class="text-[50px] sm:text-[70px] font-bold">Link In Bio.</h1>
                </div>
                <div class="text-lg sm:text-xl">
                    All-in-one bio link tool.
                    An open source alternative to
                    <a class="underline" href="https://linktr.ee">Linktree</a>,
                    with no registration required.
                </div>
            </div>
        </div>
        <div class="_flex flex-col">
            <form class="sm:text-lg gap-2 grid" @submit.prevent="create">
                <div>
                    <div>Username</div>
                    <input placeholder="/" type="text" v-model.trim="input.username">
                </div>
                <div>
                    <div>Links</div>
                    <div class="grid grid-cols-2 gap-2">
                        <input placeholder="https://" type="url" v-for="link in input.links" :key="link" v-model="link.url">
                        <button @click="addLink" type="button">+</button>
                    </div>
                </div>
                <button class="create">Create</button>
                <div>
                </div>
                <div class="text-orange-700">{{ input.error }}</div>
            </form>
        </div>
    </div>
</template>

<script> 
import { getDatabase, ref, child, get, set } from "firebase/database";

export default {
    data(){
        return{
            input: { username: "", links: [{ url: "" }], error: "" }
        }
    },
    methods: {
        async create(){
            if (this.input.username && this.input.links[0].url){
                const isUserExists = (await get(child(ref(getDatabase()), `/user/${this.input.username}`))).exists();
                if (!isUserExists){
                    await set(ref(getDatabase(), `/user/${this.input.username}`), { ıusername: this.input.username, links: this.input.links });
                    window.location = `/${this.input.username}`;
                } else {
                    this.input.error = "Username already taken.";
                }
            } else {
                this.input.error = "Username and at least one link required.";
            }
        },
        addLink(){
            this.input.links.push({ url: "" });
        }
    }
}
</script>

<style scoped>
input, .create{
    @apply
    block
    border border-emerald-800
    transition
    hover:border-black
    outline-none
    rounded
    py-1 px-2
}

.create{
    @apply
    bg-white
    hover:bg-emerald-600
}
</style>