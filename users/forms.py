from django_registration.forms import RegistrationForm
from .models import CustomUser

class MyCustomUserForm(RegistrationForm):
    class Meta(RegistrationForm.Meta):
        model = CustomUser
