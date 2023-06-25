<template>
    <div>
        <!-- <div style="top: var(--navbar-height);position: relative;">
            <Footer/>

        </div> -->
        <main class="home">
            <HomeHero />
            <chart :profile="profile"/>
            <!-- <HomeFeatures />
            <HomeContent /> -->
            <HomeFooter />
        </main>
    </div>
</template>

<script>
import HomeHero from '@theme/HomeHero.vue'
import HomeFooter from '@theme/HomeFooter.vue'
import Navbar from '@theme/Navbar.vue'
import Chart from '../components/chart.vue'
export default {
    components: {
        // 官方原生的header,可以直接拿来用
        Navbar,
        Chart,
        HomeFooter,
        HomeHero,
    },
    data(){
        return{
            profile:{'2023-06-01':1, '2023-05-02': 11}
        }
    }
}
</script>
