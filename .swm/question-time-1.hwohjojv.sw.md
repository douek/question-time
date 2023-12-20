---
title: question time 1
---
1

<SwmSnippet path="/questions/apps.py" line="4">

---

&nbsp;

```python
class QuestionsConfig(AppConfig):
    name = 'questions'

    def ready(self):
        import questions.signals
```

---

</SwmSnippet>

<SwmMeta version="3.0.0" repo-id="U0sVB7lC9at5XPOW1TBW" repo-name="question-time"><sup>Powered by [Swimm](http://localhost:5000/)</sup></SwmMeta>
