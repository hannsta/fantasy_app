"""
Definition of models.
"""

# Create your models here.
from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)

class CampAccess(models.Model):
    email = models.CharField(max_length=100)
    camp = models.CharField(max_length=100)

class Player(models.Model):
    player_id = models.IntegerField()
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    team = models.CharField(max_length=100)
    player_stat_id = models.IntegerField()
    season = models.IntegerField()
    week = models.IntegerField()


class PlayerStat(models.Model):
    player_stat_id = models.IntegerField()
    stat_id = models.IntegerField()
    points = models.DecimalField(decimal_places=3,max_digits=10)

class StatDefinition(models.Model):
    stat_id = models.IntegerField()
    stat_name = models.CharField(max_length=100)

class UserTeamPlayer(models.Model):
    user_id = models.EmailField(
        max_length=255,
    )
    player_id = models.IntegerField()

class MyUserManager(BaseUserManager):
    def create_user(self, email, role, teams, password=None):


        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, role, teams, password):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email,
            password=password,
        )

        for team in teams:
            al = AccessEntry(email=email, team=team)
            al.save()


        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):

    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    role = models.TextField(default='CONSUMER')
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = MyUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['role']

    def get_full_name(self):
        # The user is identified by their email address
        return self.email

    def get_short_name(self):
        # The user is identified by their email address
        return self.email

    def __str__(self):              # __unicode__ on Python 2
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin