from django.conf import settings
from django.contrib.auth.hashers import check_password
from .models import User

class SettingsBackend:

    def authenticate(self, email=None, password=None):
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return None
        print(User.password)
        if (check_password(password, user.password)):
            return user
        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None