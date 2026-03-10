from django.http import JsonResponse
from users.models import User

def get_users(request):
    users = User.objects.all()

    data = []
    for u in users:
        data.append({
            "id": u.id,
            "name": u.name,
            "phone": u.phone
        })

    return JsonResponse(data, safe=False)