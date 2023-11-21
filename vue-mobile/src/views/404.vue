<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="error-template">
                        <h1>
                            Oops!
                        </h1>
                        <h2>
                            404 Not Found
                        </h2>
                        <div class="error-details">
                            Sorry, an error has occured, Requested page not found!
                        </div>
                        <div class="error-actions">
                            <router-link to="/" class="btn btn-primary btn-lg">
                                <i class="fa fa-home"></i> Take Me Home
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>            
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>