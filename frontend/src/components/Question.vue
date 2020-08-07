<template>
    <div class="single-question mt-2">
        <div class="container">
            <h1>{{ question.content }}</h1>
            <p class="mb-0"> Posted by <span class="author-name">{{ question.author }}</span></p>
            <p>Created at: {{ question.created_at }}</p>
            <hr>
        </div>
        <div class="container">
            <div v-if="userHasAnswered">
                <p class="answer-added">You Submmited an Answer</p>
            </div>
            <div v-else-if="showForm">
                <form  @submit.prevent="onASubmitAnswer" class="crad">
                    <div class="card-header px-3">
                        How would you like to answer?
                    </div>
                    <div class="card-block">
                        <textarea v-model="answerBody"
                        class="form-control"
                        placeholder="Answer the question"
                        rows="5"></textarea>
                    </div>
                    <div class="card-footer px-3">
                        <button type="submit" class="btn btn-sm btn-success">Submit Answer</button>
                    </div>
                </form>
                <p v-if="error" class="error mt-2">{{ error }}</p>
            </div>
            <div v-else >
                <button class="btn btn-sm btn-success" @click="showForm=true">
                    Answer Question
                </button>
            </div>
        </div>
        <div class="container">
            <Answer v-for="(answer, index) in answers"
             :key="index"
             :answer="answer"></Answer>
        </div>
    </div>
</template>

<script>
import { apiService } from "../common/api_service";
import Answer from "../components/Answer"

export default {
    name: "Question",
    props: {
        slug: {
            type: String,
            required: true
        }
    },
    components: {
        Answer
    },
    data() {
        return { 
            question: {},
            answers: [],
            answerBody:null,
            error: null,
            userHasAnswered: false,
            showForm: false
         }
    },
    methods: {
        setTitle(title) {
            document.title = title
        },
        getQuestion() {
            const endpoint = `/api/questions/${this.slug}/`;
            apiService(endpoint).then(data => {
                this.question = data
                this.userHasAnswered = data.user_has_answered
                this.setTitle(data.content)
            });
        },
        getQuestionAnswer() {
            const endpoint = `/api/questions/${this.slug}/answers/`;
            apiService(endpoint).then(data => {
                this.answers = data.results
            });
        },
        onASubmitAnswer(){
            if (this.answerBody){
                const endpoint = `/api/questions/${this.slug}/answer/`
                apiService(endpoint, 'POST', {body:this.answerBody}).then(data => {
                this.answers.unshift(data)
            })
            this.userHasAnswered = true
            this.showForm = false
            this.error = false
            this.answerBody = null
            } else {
                this.error = 'Empty answer is not cool'
            }
        }
    },
    created() {
        this.getQuestion()
        this.getQuestionAnswer()
    }
};
</script>

<style scoped>
.author-name{
  font-weight: bold;
  color: lightcoral;
}
.answer-added{
  font-weight: bold;
  color: darkgreen;
}
.error {
    font-weight: bold;
    color: red;
}
</style>