from rest_framework import serializers
from .models import Chat, Message
from accounts.models import User, UserImage
from django.db.models import Q

class BasicUserSerializer(serializers.ModelSerializer):

    image = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'username', 'email', 'image',)
        extra_kwargs = {
            'first_name': {'read_only': True},
            'last_name': {'read_only': True},
            'username': {'read_only': True},
            'email': {'read_only': True},
            'image': {'read_only': True}
        }

    def get_image(self, obj):
        if obj.image:
            user_image_serializer = UserImageSerializer(obj.image)
            request = self.context.get('request')
            image_url = user_image_serializer.data['image']
            return request.build_absolute_uri(image_url)
        return None
    
class UserImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserImage
        fields = ('image',)


class ChatSerializer(serializers.ModelSerializer):

    participants = BasicUserSerializer(many=True)
    last_message = serializers.SerializerMethodField()

    class Meta:
        model = Chat
        fields = ['id', 'participants', 'last_message']

    def create(self, validated_data):
        request = self.context.get('request')
        participants = request.data.get('participants')
        chat = Chat.objects.create()
        for participant in participants:
            chat.participants.add(participant['id'])
        return chat

    def get_last_message(self, obj):
        last_message = Message.objects.filter(chat=obj).order_by('-timestamp').first()
        if last_message:
            message_serializer = MessageSerializer(last_message)
            return message_serializer.data
        return None

class MessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Message
        fields = ['id', 'chat', 'sender', 'recipient', 'content', 'timestamp']
