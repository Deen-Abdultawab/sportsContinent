<template>
    <footer class="bg-[#B0E3CE] background py-[2.56rem]" :style="{  backgroundImage: `url(${image})`}">
        <div class="w-[78.33%] mx-auto bg-[#ffffffe6] hover:bg-[#FFFFFF] rounded-[1.25rem] flex justify-between px-[1.25rem] pt-[2rem] pb-[3.06rem] transitionItem tab:w-[90%] tab2:flex-col tab2:items-center tab2:gap-4">
            <div class="flex flex-col justify-between tab2:items-center">
                <div class="w-[7.25rem] h-[7.5rem] overflow-hidden">
                    <img src="@/assets/images/logo.png" alt="logo image" class="w-full h-full">
                </div>
                <p class="copyright font-Raleway">© 2024, Sports Continent.</p>
            </div>
            <div class="flex mb-[14rem] gap-[5.56rem] tab:flex-wrap tab:mb-0 tab2:justify-center tab2:gap-y-[3rem]">
                <article>
                    <h3>Products</h3>
                    <ul>
                        <li>Football Jerseys</li>
                        <li>Baseball Jerseys</li>
                        <li>Joggers</li>
                        <li>Shorts</li>
                        <li>Polowears</li>
                        <li>Sweaters</li>
                    </ul>
                </article>
                <article>
                    <h3>Products</h3>
                    <ul>
                        <li>Tracksuits</li>
                        <li>Gym Essentials</li>
                        <li>Casuals</li>
                        <li>Slides</li>
                        <li>Roundnecks</li>
                        <li>Caps</li>
                    </ul>
                </article>
                <article>
                    <h3>Connects</h3>
                    <ul>
                        <li>
                            <a href="https://snapchat.com/t/140i7EO6" target="_blank">
                                Snapchat
                            </a>
                        </li>
                        <li>
                            <a href="https://x.com/sportscontinen2?s=21" target="_blank">
                                Twitter
                            </a>
                        </li>
                        <li>
                            <a href="https://wa.me/+2348138726068" target="_blank">
                                Whatsapp
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/sportscontinent?igsh=d3JsYnVva3E2czc=" target="_blank">
                                Instagram
                            </a>
                        </li>
                    </ul>
                </article>
                <article>
                    <h3>Help</h3>
                    <ul>
                        <li>FAQ</li>
                        <li>Policy</li>
                        <li>Contact Us</li>
                    </ul>
                </article>
            </div>
        </div>

    </footer>
</template>

<script setup>
import mainbg from "@/assets/images/footer.png"
const image = mainbg;

</script>

<style scoped>
.background {
    background-repeat: no-repeat;
    background-size: 71.98%;
    background-position: bottom center;
}

</style>