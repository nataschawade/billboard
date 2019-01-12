from django.db import models
from billboard_assignment.settings import AUTH_USER_MODEL

class Post(models.Model):
	title = models.CharField(max_length=140, unique=False)
	text = models.CharField(max_length=1400, unique=False)
	date = models.DateField()
	user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)


	def __str__(self):
		return self.title