from django.http import JsonResponse
from django.shortcuts import render

def chatbot(request):
    if request.method == 'POST':
        message = request.POST.get('message', '')
        response = get_chatbot_response(message)
        return JsonResponse({'response': response})
    elif request.method == 'GET':
        return render(request, 'chatbot.html')
    else:
        return JsonResponse({'error': 'Invalid request method'})

def get_chatbot_response(message):
    if message.lower() == 'hi':
        return 'Hi!'
    elif 'i need your help' in message.lower():
        return 'Sure, I can help. Please explain what you need assistance with.'
    else:
        return 'I did not understand that. Can you please rephrase or ask something else?'