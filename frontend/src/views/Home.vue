<template>
<div class="container mt-2">
  <div class="home">
    <div v-for="question in questions" :key="question.pk">
      <p class="mb-0"> Posted by <span class="author-name">{{ question.author }}</span></p>
      <router-link class="question-link" :to="{ name: 'question', params: {slug: question.slug} }">
        {{ question.content }}
      </router-link>
      <p>Answers: {{ question.answers_count }}</p>
      <hr>
    </div>
    <div class="my-4">
      <p v-show="loadingQuestions">...Loading...</p>
      <button v-show="next" @click="getQuestions" class="btn btn-sm btn-outline-secondary">
        Load more
      </button>
    </div>
  </div>
</div>
</template>

<script>
import { apiService } from '../common/api_service'

export default {
  name: "Home",
  data() {
    return {
      questions:[],
      next: null,
      loadingQuestions: false
      }
  },
  methods: {
    getQuestions() {
      let endpoint = 'api/questions/'
      if (this.next){
        endpoint = this.next
      }
      this.loadingQuestions = true
      apiService(endpoint).then(data => {
        this.questions.push(...data.results)
        this.loadingQuestions = false
        if(data.next) {
          this.next = data.next
        } else {
          this.next = null
        }
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
