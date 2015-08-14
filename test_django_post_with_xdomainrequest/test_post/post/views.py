# coding: utf-8

import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def index(request):
    if request.method == 'POST':
        data = request.POST
        print 'POSTed: ', data
        response = HttpResponse('POSTed: ' + json.dumps(data), content_type='text/html')
    elif request.method == 'GET':
        response = HttpResponse('Please use post method', content_type='text/html')
    else:
        response = HttpResponse('What', content_type='text/html')

    response['Access-Control-Allow-Origin'] = '*'
    response['Access-Control-Allow-Headers'] = '*'
    response['Pragma'] = 'no-cache'

    return response
