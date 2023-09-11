from django.contrib import admin
from . import models


class ModelAdmin(admin.ModelAdmin):
    pass


admin.site.register(models.Category, ModelAdmin)
admin.site.register(models.Institution, ModelAdmin)
admin.site.register(models.Donation, ModelAdmin)

