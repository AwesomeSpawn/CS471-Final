from django.test import TestCase
from rest_framework.test import APIClient
# Create your tests here.

class TestAPI(TestCase):
    def setUp(self):
        print('testing')
    def test_this(self):
        client = APIClient()
        request=client.get("/api/logins/", {"first_name": "Connor"}, format="json")
        #print(dir(request))
        print(request.data)
        self.assertEquals("1", "2")