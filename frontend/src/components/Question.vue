<template>
    <div class="single-question mt-2">
        <div class="container">
            <h1>{{ question.content }}</h1>
            <p class="mb-0"> Posted by <span class="author-name">{{ question.author }}</span></p>
            <p>Created at: {{ question.created_at }}</p>
        </div>
    </div>
</template>

<script>
import { apiService } from "../common/api_service";

export default {
    name: "Question",
    props: {
        slug: {
            type: String,
            required: true
        }
    },
    data() {
        return { question: {} };
    },
    methods: {
        setTitle(title) {
            document.title = title
        },
        getQuestion() {
            let endpoint = `/api/questions/${this.slug}/`;
            apiService(endpoint).then(data => {
                this.question = data
                this.setTitle(data.content)
            });
        },
    },
    created() {
        this.getQuestion()
    }
};
</script>

<style scoped>
.author-name{
  font-weight: bold;
  color: lightcoral;
}
</style>