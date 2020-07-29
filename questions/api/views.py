from rest_framework import viewsets
from .serializers import QuestionSerializer, AnswerSerializer
from questions.models import Question
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAuthorOrReadOnly

class QuestionViewSet(viewsets.ModelViewSet):
    queryset= Question.objects.all()
    lookup_field = 'slug'
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthorOrReadOnly, IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)