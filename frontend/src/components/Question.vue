<template>
    <div class="single-question mt-2">
        <div class="container">
            <h1>{{ question.content }}</h1>
            <QuestionActions v-if="isQuestionAuthor" :slug="question.slug" />
            <p class="mb-0">
                Posted by
                <span class="author-name">{{ question.author }}</span>
            </p>
            <p>Created at: {{ question.created_at }}</p>
            <hr />
        </div>
        <div class="container">
            <div v-if="userHasAnswered">
                <p class="answer-added">{{ username }}, you submmited an answer</p>
            </div>
            <div v-else-if="showForm">
                <form @submit.prevent="onASubmitAnswer" class="crad">
                    <div class="card-header px-3">How would you like to answer?</div>
                    <div class="card-block">
                        <textarea
                            v-model="answerBody"
                            class="form-control"
                            placeholder="Answer the question"
                            rows="5"
                        ></textarea>
                    </div>
                    <div class="card-footer px-3">
                        <button type="submit" class="btn btn-sm btn-success">Submit Answer</button>
                    </div>
                </form>
                <p v-if="error" class="error mt-2">{{ error }}</p>
            </div>
            <div v-else>
                <button class="btn btn-sm btn-success" @click="showForm=true">Answer Question</button>
            </div>
        </div>
        <div class="container">
            <Answer
                v-for="answer in answers"
                :key="answer.id"
                :answer="answer"
                :currentUser="username"
                @delete-answer="deleteAnswer"
            ></Answer>
            <div class="my-4">
                <p v-show="loadingAnswers">...Loading...</p>
                <button
                    v-show="next"
                    @click="getQuestionAnswer"
                    class="btn btn-sm btn-outline-secondary"
                >Load more</button>
            </div>
        </div>
    </div>
</template>

<script>
import { apiService } from "../common/api_service";
import Answer from "../components/Answer";
import QuestionActions from "../components/QuestionActions";

export default {
    name: "Question",
    props: {
        slug: {
            type: String,
            required: true
        }
    },
    components: {
        Answer,
        QuestionActions
    },
    data() {
        return {
            question: {},
            answers: [],
            answerBody: null,
            error: null,
            userHasAnswered: false,
            showForm: false,
            next: null,
            loadingAnswers: false,
            username: null
        };
    },
    computed: {
        isQuestionAuthor() {
            return this.username === this.question.author;
        }
    },
    methods: {
        setTitle(title) {
            document.title = title;
        },
        getQuestion() {
            const endpoint = `/api/questions/${this.slug}/`;
            apiService(endpoint).then(data => {
                if (data){
                this.question = data;
                this.userHasAnswered = data.user_has_answered;
                this.setTitle(data.content);
                } else {
                    this.$router.push('/notfound/')
                }
            });
        },
        getQuestionAnswer() {
            let endpoint = `/api/questions/${this.slug}/answers/`;
            if (this.next) {
                endpoint = this.next;
            }
            apiService(endpoint).then(data => {
                this.answers.push(...data.results);
                if (data.next) {
                    this.next = data.next;
                } else {
                    this.next = null;
                }
            });
        },
        onASubmitAnswer() {
            this.loadingAnswers = true;
            if (this.answerBody) {
                const endpoint = `/api/questions/${this.slug}/answer/`;
                apiService(endpoint, "POST", { body: this.answerBody }).then(
                    data => {
                        this.answers.unshift(data);
                    }
                );
                this.userHasAnswered = true;
                this.showForm = false;
                this.error = false;
                this.answerBody = null;
            } else {
                this.error = "Empty answer is not cool";
            }
            this.loadingAnswers = false;
        },
        async deleteAnswer(answer) {
            const endpoint = `/api/answers/${answer.id}/`;
            try {
                await apiService(endpoint, "DELETE");
                this.$delete(this.answers, this.answers.indexOf(answer));
                this.userHasAnswered = false;
            } catch (err) {
                console.log(err);
            }
        }
    },
    created() {
        this.getQuestion();
        this.getQuestionAnswer();
        this.username = window.localStorage.getItem("username");
    }
};
</script>

<style scoped>
.author-name {
    font-weight: bold;
    color: lightcoral;
}
.answer-added {
    font-weight: bold;
    color: darkgreen;
}
.error {
    font-weight: bold;
    color: red;
}
</style>