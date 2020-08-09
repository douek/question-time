<template>
    <div>
        <router-link
            :to="{ name: 'ask', params: { slug }}"
            class="btn btn-sm btn-outline-info mr-1"
        >Edit</router-link>
        <button class="btn btn-sm btn-outline-danger mr-1" @click="deleteQuestion">Delete</button>
    </div>
</template>

<script>
import { apiService } from "../common/api_service";

export default {
    name: "QuestionActions",
    props:{
        slug:{
            type: String,
            required: true
        }
    },
    methods:{
        async deleteQuestion(){
            const endpoint = `/api/questions/${this.slug}/`
            try {
                await apiService(endpoint,'DELETE')
                this.$router.push('/')
            } catch (err) {
                console.log(err)
            }
        }
    }
};
</script>