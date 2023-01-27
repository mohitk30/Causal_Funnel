``` 
The Below is the Documentation of the Related Api of Blog Post Application. I have used packages express, cors, bcryptjs,
```

## Auth API's

### Register User Post API
``` https://localhost:7000/v1/auth/register```



```
request body should contain this object
{
     email:'User Email',
     password:'User Password'
}

It will check is the user with same email exist or not and if no use exist it will register a new user other wise it will give suitable error message.
 

```


### Login User Post API
``` https://localhost:7000/v1/auth/login```



```
request body should contain this object
{
     email:'User Email',
     password:'User Password'
}

It will check is the user with same email exist or not and if user email found then we have used bcryptjs to hash the passwords and then we match the hash accordingly else it will return a suitable error message.
 
```


### Reset User Post API
``` https://localhost:7000/v1/auth/reset```



```
request body should contain this object
{
     email:'User Email',
     password:'User Password'
}

It will reset the user password , as of now i have used it directly but we can use the security question to conform the security message and answer. 
 
```


## Blog API's

### Get Blog API for page no.
``` https://localhost:7000/v1/blog/all?page=2```



```
 
It will return the min of 10 or available no of blogs for a given page no.

Example:-
In the given example if we have 12 blogs the above api will return 2 blogs and if we replace 2 with 1 we will get 10 blogs.
 

```
<br><br>

## For all the api listed below we also need to pass a variable `auth-token` through the headers  which hold the jwt token we got during  login. 


<br><br>

### Post API for add blog
``` https://localhost:7000/v1/blog/add```



```
request body should contain this object
{
    blogTitle:'... blog title....',
    blogCategory:'... blog category....',
    blogDescription:'... blog description....',
    blogAddedByUser:'... blog added by user....',
    blogAddedByUserEmail:'... email of user adding blog....',
}

It will add a new blog to our database if the operation is not possible  it will return a suitable error message.
 
```


### Update Blog Post API
``` https://localhost:7000/v1/blog/update```



```
request body should contain this object
{
    id:'.....blog id ....',
    blogTitle:'... blog title....',
    blogCategory:'... blog category....',
    blogDescription:'... blog description....',
    blogAddedByUser:'... blog added by user....',
    blogAddedByUserEmail:'... email of user adding blog....',
}

It will update the blog that contain _id=given_id if the operation is not possible  it will return a suitable error message. 
 
```


### Delete Blog Post API
``` https://localhost:7000/v1/blog/delete```



```
request body should contain this object
{
      id:'.....blog id ....',
}

It will delete the blog with the given id other wise it will return suitable error message. 
 
```
