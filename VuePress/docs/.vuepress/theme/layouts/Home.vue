<template>
    <div>
        <Navbar/>
        <div style="top: var(--navbar-height);position: relative;">
            <!-- <Footer/> -->
            <chart/>
        </div>
    </div>
</template>

<script>
import Navbar from '@theme/Navbar.vue'
import Chart from '../components/chart.vue'
export default {
    components: {
        // 官方原生的header,可以直接拿来用
        Navbar,
        Chart,
    },
    data(){
        return{
            profile:{

            }
        }
    }
}
</script>
