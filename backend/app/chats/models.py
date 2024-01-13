from django.db import models
from accounts.models import User
from datetime import datetime, timedelta, timezone

class Chat(models.Model):
    participants = models.ManyToManyField(User, related_name='chats')

    def __str__(self):
        return f"Chat {self.id}"
    
    def get_last_message_timestamp(self):
        last_message = Message.objects.filter(chat=self).order_by('-timestamp').first()
        return last_message.timestamp if last_message and last_message.timestamp is not None else datetime.min.replace(tzinfo=timezone.utc)

class Message(models.Model):
    chat = models.ForeignKey(Chat, related_name='messages', on_delete=models.CASCADE)
    sender = models.ForeignKey(User, related_name='sent_messages', on_delete=models.CASCADE)
    recipient = models.ForeignKey(User, related_name='received_messages', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message {self.id} in Chat {self.chat_id}"