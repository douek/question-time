<template>
    <div class="container mt-2">
        <h1>Ask a Question</h1>
        <form @submit.prevent="onSubmit">
            <textarea v-model="question_body"
            class="form-control"
            placeholder="What do you want to ask?"
            rows="3"></textarea>
            <br>
            <button type="submit" class="btn btn-submit">Publish</button>
        </form>
        <p v-if="err" class="muted mt-2">{{ err }}</p>
    </div>
</template>

<script>
import { apiService } from "../common/api_service";

export default {
    name: 'QuestionEditor',
    data() {
        return {
            question_body : null,
            err : null
        }
    },
    methods: {
        onSubmit(){
            if (!this.question_body){
                this.err = "No empty questions :)"
            } else if (this.question_body.length > 240){
                this.err = "Please shorten your question (to be less than 240)"
            } else {
                this.err = null
                const endpoint = '/api/questions/'
                const method = 'POST'

                apiService(endpoint, method, {content: this.question_body})
                .then(data => {
                    this.$router.push({
                        name: 'question',
                        params: {slug: data.slug}
                    })
                })
            }
        },
    },
    created() {
        document.title = 'Ask a question'
    }
}
</script>