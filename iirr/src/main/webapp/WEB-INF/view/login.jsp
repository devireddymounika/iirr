<%@ include file="header.jsp"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>How To Create Simple Login Form Design In Bootstrap 5</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">    
    <!-- Bootstrap CSS -->
    <!-- <link rel="stylesheet" href="https://www.markuptag.com/bootstrap/5/css/bootstrap.min.css"> -->
</head>
<body>

    <div class="container">
    <div class="container">
		
		
	<div class="clear"></div>
	</div>
            <div class="row">
                      <div class="col-md-4 offset-md-4">
                <div class="login-form bg-light mt-4 p-4">
                    <form action="" method="" class="row g-3">
                        <h4>Login Page</h4>
                        <div class="col-12">
                            <label>Username</label>
                            <input type="text" name="username" class="form-control" placeholder="Username">
                        </div>
                        <div class="col-12">
                            <label>Password</label>
                            <input type="password" name="password" class="form-control" placeholder="Password">
                        </div>
                        <div class="col-12">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="rememberMe">
                                <label class="form-check-label" for="rememberMe"> Remember me</label>
                            </div>
                        </div>
                        <div class="col-12">
                            <button type="submit" class="btn btn-dark float-end">SignUp</button>
                            <button type="submit" class="btn btn-dark float-end">Login</button>
                        </div>
                    </form>
                    <hr class="mt-4">
                    <div class="col-12">
                        <p class="text-center mb-0">Have not account yet? <a href="#">Signup</a></p>
                    </div>
                    <div class="sign-up-form">
                    <div class="col-12">
                            <label>Username</label>
                            <input type="text" name="username" class="form-control" placeholder="Username">
                        </div>
                        <div class="col-12">
                            <label>Password</label>
                            <input type="password" name="password" class="form-control" placeholder="Password">
                        </div>
                            <div class="col-12">
                            <label>Repeat Password</label>
                            <input type="password" name="password" class="form-control" placeholder="Password">
                        </div>
                            <!-- <div class="group"> <label for="pass" class="label">Email Address</label> <input id="pass" type="text" class="input" placeholder="Enter your email address"> </div> -->
                            <div class="col-12">
                            <button type="submit" class="btn btn-dark float-end">Signup</button>
                        </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
    
 
    
 

<%@ include file="footer.jsp"%>

