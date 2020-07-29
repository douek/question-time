from django.urls import path, include
from .views import QuestionViewSet, AnswerCreateAPIView, AnswerListAPIView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'questions', QuestionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('questions/<slug:slug>/answer/', AnswerCreateAPIView.as_view(), name='create-answer'),
    path('questions/<slug:slug>/answers/', AnswerListAPIView.as_view(), name='answer-list'),
]