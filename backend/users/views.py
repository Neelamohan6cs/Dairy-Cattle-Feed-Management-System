from django.http import HttpResponse

def hello_user(request):
    return HttpResponse("Hello User Server - Dairy Management System")