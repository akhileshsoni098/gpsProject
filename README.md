BASE_URL: http://localhost:3000

1.	To register/create a new user:		

Method: POST		{{BASE_URL}}/api/signup
{
    "name": "Aman",
    "email": "aman@gmail.com",
    "password": "aman@123"
}
Encrypted passwords will be saved in the database.

2.	To login a user:			

Method: POST		{{BASE_URL}}/api/login
Basic Auth:	
{
    "user_name": "aman@gmail.com",
    "password": "aman@123"
}
Response:
"response": {
"loginToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZhdGltYUBsdW1vcy5haSIsInVzZXJfaWQiOjEsImlhdCI6MTY2NjcwMTQyNiwiZXhwIjoxNjY2Nzg3ODI2fQ.as7Ctma89InKocxLq5Gs2ClyykpF-k27BVgtCVdQ3O4"
}
The user will be assigned a token that will be used in the subsequent requests after login.

3.	To get All the GPS Data		

Method: GET		{{BASE_URL}}/api
You will need to pass the token

4.	To get data for a specific device:	

Method: GET		{{BASE_URL}}/api/D-1567
You will need to pass the token
