from django.http import JsonResponse
from .models import District, Village
from django.views.decorators.csrf import csrf_exempt
import json

def district_list(request):
    districts = District.objects.all()
    data = [{"id": d.id, "name": d.name} for d in districts]
    return JsonResponse(data, safe=False)

def villages_by_district(request, district_id):
    try:
        district = District.objects.get(id=district_id)
        villages = district.villages.all()
        data = [{"id": v.id, "name": v.name} for v in villages]
        return JsonResponse(data, safe=False)
    except District.DoesNotExist:
        return JsonResponse({"error": "District not found"}, status=404)
    
@csrf_exempt
def add_village(request):
    if request.method == "POST":
        data = json.loads(request.body)

        district_id = data.get("district_id")
        village_name = data.get("village_name")

        district = District.objects.get(id=district_id)

        village = Village.objects.create(
            name=village_name,
            district=district
        )

        return JsonResponse({
            "message": "Village created successfully",
            "village": village.name,
            "district": district.name
        })
    
@csrf_exempt
def add_district(request):
    if request.method == "POST":
        data = json.loads(request.body)

        district_name = data.get("name")

        district = District.objects.create(name=district_name)

        return JsonResponse({
            "message": "District created successfully",
            "district": district.name
        })