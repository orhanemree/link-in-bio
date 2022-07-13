<template>
    <div>

        <!-- Menu -->
        <nav class="w-full absolute">
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="https://github.com/orhanemree/link-in-bio">
                        <img class="w-6 sm:w-9 m-1" src="https://api.iconify.design/simple-icons:github.svg">
                    </a>
                </li>
            </ul>
        </nav>

        <!-- Page -->
       <slot />

       <!-- Footer -->
       <footer class="text-sm sm:text-base text-center p-5 gap-5">
            Made with 💗 by <mark><a href="https://github.com/orhanemree">orhanemree</a></mark>. 
            Open source on <mark><a href="https://github.com/orhanemree/link-in-bio">GitHub</a></mark>.
       </footer>

    </div>
</template>

<style scoped>
ul{
    @apply
    w-full
    flex
    items-center
    justify-between
    py-6 
    px-6 sm:px-12
    text-base sm:text-xl
}

mark{
    @apply
    font-bold
    underline
    bg-transparent
    text-rose-700
    py-0.5 px-1
}
</style>

<style>
body{
    @apply
    bg-emerald-50
}

._flex{
    @apply
    flex
    items-center
    justify-center
}

a{
    @apply
    opacity-100
    transition
    hover:opacity-80
}

::-webkit-scrollbar {
  @apply
  w-1
}

::-webkit-scrollbar-track {
    @apply
    bg-rose-50
}
 
::-webkit-scrollbar-thumb {
    @apply
    bg-rose-500
}

::-webkit-scrollbar-thumb:hover {
    @apply
    bg-rose-700
}
</style>