"""
URL configuration for app project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from rest_framework import routers
from accounts.auth import CustomAuthToken
from accounts.views import (
    UserViewSet,
    UserRegistrationViewSet,
    UserImageViewSet)
from properties.views import PropertyViewSet
from communities.views import (
    NeighborhoodViewSet,
    BankAccountViewSet,
    RecordViewSet,
    DebtViewSet,
    AgreementViewSet,
    NeighborhoodByManagerViewSet)
from chats.views import ChatViewSet, MessageViewSet, ChatMessagesViewSet
from notifications.views import NotificationsViewSet, NotificationsByUserViewSet

router = routers.DefaultRouter()
router.register(r"accounts", UserViewSet, basename="accounts")
router.register(r'accounts/(?P<user_id>\d+)/notifications', NotificationsByUserViewSet, basename="notificationsbyuser")
router.register(r'accounts/(?P<user_id>\d+)/communities-manager', NeighborhoodByManagerViewSet, basename='communitiesbymanager')
router.register(r"accountmedias", UserImageViewSet, basename="accountmedias")
router.register("signup", UserRegistrationViewSet, basename="signup")
router.register(r"properties", PropertyViewSet, basename="properties")
router.register(r"neighborhoods", NeighborhoodViewSet, basename="neighborhoods")
router.register(r"bankaccounts", BankAccountViewSet, basename="bankaccounts")
router.register(r"records", RecordViewSet, basename="records")
router.register(r"debts", DebtViewSet, basename="debts")
router.register(r"agreements", AgreementViewSet, basename="agreements")
router.register(r'chats/(?P<chat_id>\d+)/messages', ChatMessagesViewSet, basename='chatmessages')
router.register(r"chats", ChatViewSet, basename="chats")
router.register(r"messages", MessageViewSet, basename="messages")
router.register(r"notifications", NotificationsViewSet, basename="notifictions")

urlpatterns = [
    path("admin/", admin.site.urls),
    path('login/', CustomAuthToken.as_view()),
    path('', include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)