from django.urls import path
from . import views

urlpatterns = [
    path("districts/", views.district_list, name="district_list"),
    path("add-village/", views.add_village),
    path("add-district/", views.add_district),
    path("districts/<int:district_id>/villages/", views.villages_by_district, name="villages_by_district"),
]
