<template>
<div class="container">
  <div class="home">
    <div v-for="question in questions" :key="question.pk">
      <p class="mb-0"> Posted by <span class="author-name">{{ question.author }}</span></p>
      <router-link class="question-link" :to="{ name: 'question', params: {slug: question.slug} }">
        {{ question.content }}
      </router-link>
      <p>Answers: {{ question.answers_count }}</p>
      <hr>
    </div>
  </div>
</div>
</template>

<script>
import { apiService } from '../common/api_service'

export default {
  name: "Home",
  data() {
    return {questions:[]}
  },
  methods: {
    getQuestions() {
      let endpoint = 'api/questions/'

      apiService(endpoint).then(data => {
        this.questions.push(...data.results)
      })
    }
  },
  created(){
    document.title = 'QuestionTime'
    this.getQuestions()
  }
};
</script>

<style scoped>
.author-name{
  font-weight: bold;
  color: lightcoral;
}

.question-link {
  font-weight: bold;
  color: black;
}
.question-link:hover{
  color: crimson;
  text-decoration: none;
}
</style>
