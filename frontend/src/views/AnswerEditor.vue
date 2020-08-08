<template>
    <div class="container mt-2">
        <h1>Edit Your Answer</h1>
        <form @submit.prevent="onSubmit">
            <textarea v-model="answer" class="form-control" rows="3"></textarea>
            <br />
            <button type="submit" class="btn btn-submit">Publish your answer</button>
        </form>
        <p v-if="err" class="muted mt-2">{{ err }}</p>
    </div>
</template>

<script>
import { apiService } from '../common/api_service'

export default {
    name: 'AnswerEditor',
    props: {
        id : {
            type: String,
            required: true
        },
    },
    data() {
        return {
            answer:null,
            err: null,
            questionSlug:null,
        }
    },
    methods: {
        onSubmit(){
            if (this.answer){
                const endpiont = `/api/answers/${this.id}/`;
                apiService(endpiont, 'PUT', { body: this.answer })
                .then(() =>{
                    this.$router.push({
                        name: 'question',
                        params: { slug: this.questionSlug },             
                    })
                })
            }else {
                this.err = 'no empty answers please'
            }
        },
    },
    async beforeRouteEnter(to,from,next){
        const endpiont = `/api/answers/${to.params.id}/`
        const data = await apiService(endpiont)
        return next(vm => (
            vm.answer = data.body,
            vm.questionSlug = data.question_slug
        ))
    }
}
</script>