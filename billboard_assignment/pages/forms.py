from django import forms
from django.core import validators

class PostForm(forms.Form):
    title = forms.CharField(max_length=150, widget=forms.Textarea (attrs={'id':'post_title'}))
    descrption = forms.CharField(widget=forms.Textarea (attrs={'id':'post_description'}))
    def clean(self):
        all_clean_data = super().clean()
        return all_clean_data

