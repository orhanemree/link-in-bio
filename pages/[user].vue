<template>
    <div class="min-h-screen pt-24 pb-8 px-2 sm:p-24">
        <div v-if="loading" class="text-center text-lg">
            Loading...
        </div>
        <div v-else-if="error" class="text-center text-lg _flex gap-2">
            <div>{{ error }}</div>
            <a class="underline" href="/">Return Home</a>
        </div>
        <div v-else class="_flex flex-col gap-6 sm:gap-12">
            <h1 class="text-xl sm:text-3xl font-bold text-center">
                <a :href="`/${$route.params.user}`">@{{ $route.params.user }}</a>'s links
            </h1>
            <div class="w-11/12 sm:w-2/3">
                <ul>
                    <li v-for="link in links" :key="link">
                        <a class="_flex gap-1 text-base sm:text-lg bg-emerald-500 py-6 border border-black rounded mb-4" :href="link.url">
                            <img class="w-5 h-5" :src="link.src">
                            <div>{{ link.host }}</div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { getDatabase, ref, child, get} from "firebase/database";

export default {
    data(){
        return{
            loading: true,
            error: "",
            links: []
        }
    },
    methods: {
        async getLinks(){
            const user = (await get(child(ref(getDatabase()), `/user/${this.$route.params.user}`)));
            if (user.exists()){
                user.val().links.forEach(async l => {
                    const url = new URL(l.url);
                    const link = {
                        url: url,
                        host: url.host,
                        name: url.host.split('.')[url.host.split('.').length - 2],
                        src: "https://api.iconify.design/tabler:world.svg"
                    }
                    
                    // make custom icon if icon exists simple-icons' list
                    const status = (await fetch(`https://api.iconify.design/simple-icons:${link.name}.svg`)).status;
                    if (status === 200){
                        link.src = `https://api.iconify.design/simple-icons:${link.name}.svg`;
                    }
                    this.links.push(link);
                });
            } else {
                this.error = "User not found.";
            }
        }
    },
    async mounted(){
        await this.getLinks();
        this.loading = false;
    }
}
</script>