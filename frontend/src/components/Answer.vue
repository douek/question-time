<template>
    <div class="single-answer">
        <p class="text-muted">
            <strong>{{ answer.author }}</strong>
            &#8901; {{ answer.created_at}}
        </p>
        <p>{{ answer.body }}</p>
        <div v-if="isAnswerAuthor">
            <router-link
                :to="{ name: 'answer-editor', params: { id: answer.id }}"
                class="btn btn-sm btn-outline-info mr-1"
            >Edit</router-link>
            <button class="btn btn-sm btn-outline-danger mr-1" @click="deleteAnswer">Delete</button>
        </div>
        <div v-else>
            <button @click="likeToggle" v-if="!userLikedAnswer" class="btn btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path
                        fill-rule="evenodd"
                        d="M6.736 4C4.657 4 2.5 5.88 2.5 8.514c0 3.107 2.324 5.96 4.861 8.12a29.66 29.66 0 004.566 3.175l.073.041.073-.04c.271-.153.661-.38 1.13-.674.94-.588 2.19-1.441 3.436-2.502 2.537-2.16 4.861-5.013 4.861-8.12C21.5 5.88 19.343 4 17.264 4c-2.106 0-3.801 1.389-4.553 3.643a.75.75 0 01-1.422 0C10.537 5.389 8.841 4 6.736 4zM12 20.703l.343.667a.75.75 0 01-.686 0l.343-.667zM1 8.513C1 5.053 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262a31.146 31.146 0 01-5.233 3.576l-.025.013-.007.003-.002.001-.344-.666-.343.667-.003-.002-.007-.003-.025-.013A29.308 29.308 0 0110 20.408a31.147 31.147 0 01-3.611-2.632C3.8 15.573 1 12.332 1 8.514z"
                    />
                </svg>
                <strong> Like [{{ likesCounter }}] </strong>
            </button>
            <button @click="likeToggle" v-else class="btn btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path
                        d="M14 20.408c-.492.308-.903.546-1.192.709-.153.086-.308.17-.463.252h-.002a.75.75 0 01-.686 0 16.709 16.709 0 01-.465-.252 31.147 31.147 0 01-4.803-3.34C3.8 15.572 1 12.331 1 8.513 1 5.052 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262A31.146 31.146 0 0114 20.408z"
                    />
                </svg>
                <strong> Liked [{{ likesCounter }}]</strong>
            </button>
        </div>
        <hr />
    </div>
</template>

<script>
import { apiService } from "../common/api_service";

export default {
    name: "Answer",
    props: {
        answer: {
            type: Object,
            required: true
        },
        currentUser: {
            type: String,
            required: true
        }
    },
    data(){
        return {
            likesCounter: this.answer.likes_count,
            userLikedAnswer: this.answer.user_has_voted
        }
    },
    computed: {
        isAnswerAuthor() {
            return this.answer.author === this.currentUser;
        },
    },
    methods: {
        deleteAnswer() {
            this.$emit("delete-answer", this.answer);
        },
        unlikeAnswer(){
            this.userLikedAnswer = false
            this.likesCounter -= 1
            const endpint = `/api/answers/${this.answer.id}/like/`
            apiService(endpint,'DELETE')
        },
        likeAnswer(){
            this.userLikedAnswer = true
            this.likesCounter += 1
            const endpint = `/api/answers/${this.answer.id}/like/`
            apiService(endpint,'POST')
        },
        likeToggle(){
            this.userLikedAnswer ? this.unlikeAnswer() : this.likeAnswer()
        }
    }
};
</script>