using Libsys.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Mvc;

using HttpGetAttribute = System.Web.Http.HttpGetAttribute;

namespace Libsys.Controllers
{//http://localhost:2762/api/Login/LoginAuth/fahad@gmail.com/abcde/false

    
   
    public class LoginController : ApiController
    {
        // GET: Login

        [HttpGet]
        [ValidateAntiForgeryToken]
        [Authorize]
        [System.Web.Http.Route("api/Login/Login")]
        public IHttpActionResult LoginStatus()
        {
           if( HttpContext.Current.User.IsInRole("Admin"))
            return Json("UserIsLoggedInAdmin");
           else return Json("UserIsLoggedInUser");

        }

        //http://localhost:2762/Login/LoginAuth?userName=fahad@gmail.com&userPassword=abcde&remembercheck=false
        //called from Login view and authenticate user create session and if user not verified redirect to verifyemail view througn ajax promise
        
        [HttpGet]
        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.Route("api/Login/LoginAuth/{userName}/{userPassword}/{remembercheck:bool}")]
        public IHttpActionResult LoginAuth(string userName,string userPassword,bool remembercheck)//[FromBody]LoginCredentials lc)
        {

            LoginCredentials lc = new LoginCredentials
            {

                userName = userName,
                userPassword = userPassword,
                remembercheck = remembercheck
            };


            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://localhost:2762/token");

                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Post, "http://localhost:2762/token");

                TokenModel TM = new TokenModel
                {

                    username = lc.userName,
                    password = lc.userPassword,
                    grant_type = "password"
                };
                //JsonConvert.SerializeObject(TM)
                requestMessage.Content = new StringContent($"username={TM.username}&password={TM.password}&grant_type=password", Encoding.Default, "application/x-www-form-urlencoded");

                //HTTP POST
                //var postTask = client.PostAsJsonAsync<TokenModel>("/token",TM);
                //postTask.Wait();

                //var result = postTask.Result;



                HttpResponseMessage result = client.SendAsync(requestMessage).GetAwaiter().GetResult();

                if (result.IsSuccessStatusCode)
                {
                   Student  user_identity = null;
                    var res = result.Content.ReadAsStringAsync();
                    using (Models.libsysEntities db = new Models.libsysEntities())
                    {

                        user_identity = db.Students.SingleOrDefault(user => user.userName == lc.userName && user.userPassword == lc.userPassword);
                    }
                    // var js = JsonConvert.DeserializeObject(res.Result+"StudentID : "+user_identity.studentID);
                    var Token = JsonConvert.DeserializeObject(res.Result);
                    LoginResponseModel responseModel = new LoginResponseModel();
                    responseModel.Token = Token;
                    responseModel.StudentID = user_identity.studentID;
                    return Json(responseModel);
                }
            }



            return Json("failed");

        }

            //if (remembercheck == "true") { lc.remembercheck = true; }
            //else lc.remembercheck = false;

            //using (libsysEntities db = new libsysEntities())
            //{
            //    var user = db.Students.SingleOrDefault(x => (x.userName == lc.userName) && (x.userPassword == lc.userPassword));

            //    if (user != null)
            //    {


            //        if (lc.remembercheck == true)
            //        {
            //            if (user.userToken == null)
            //            {
            //                var token = Guid.NewGuid().ToString();
            //                user.userToken = token;
            //                db.SaveChanges();
            //            }

            //            RememberChecked(user.studentName, user.userToken);

            //        }




            //        HttpContext.Current.Session["UserID"] = user.studentID;
            //        HttpContext.Current.Session["UserName"] = user.studentName;
            //        HttpContext.Current.Session["Userkey"] = user.studentID;
            //            return Json("success");

            //        }

            //    }
            //    return Json("failed");
       // }



        //logsout user
        //[HttpGet]
        //[System.Web.Http.Route("api/Login/LogOut")]
        //public IHttpActionResult LogOut()
        //{
        //    if (HttpContext.Current.Session["UserID"] != null && HttpContext.Current.Session["UserName"] != null)
        //    {
        //        HttpContext.Current.Session["UserID"] = null;
        //        HttpContext.Current.Session["UserName"] = null;

        //        try
        //        {
        //            var c = HttpContext.Current.Request.Cookies.Get("usertoken");
        //            c.Expires = DateTime.Now.AddDays(-1);
        //            HttpContext.Current.Response.Cookies.Set(c);
                   
        //        }
        //        catch (Exception ex)
        //        {

        //         return Redirect("Login");
        //        }
        //    }
        //    return Json("LoggedOutSuccessfully");



        //}

        //public void RememberChecked(string userDispName, string userToken)
        //{

            
        //    HttpCookie mycookie = new HttpCookie("usertoken");
        //    mycookie.Values["user"] = userDispName;
        //    mycookie.Values["token"] = userToken;
        //    mycookie.Expires = System.DateTime.Now.AddDays(1);
        //    HttpContext.Current.Response.Cookies.Add(mycookie);



        //}
        //private bool cookiefetch()
        //{

        //    try
        //    {

        //        HttpCookie authCookie = HttpContext.Current.Request.Cookies.Get("usertoken");
        //        if (authCookie != null)
        //        {
        //            string userName = authCookie.Values["user"];
        //            string userToken = authCookie.Values["token"];
        //            using (libsysEntities db = new libsysEntities())
        //            {
        //                var user = db.Students.SingleOrDefault(x => ((x.studentName == userName) && (x.userToken == userToken)));
        //                if (user != null)
        //                {

        //                    HttpContext.Current.Session["UserID"] = user.userName;
        //                    HttpContext.Current.Session["UserName"] = user.studentName;
                            

        //                    return true;
        //                }
        //            }

        //        }

        //        // Decrypts the FormsAuthenticationTicket that is held in the cookie's .Value property.
        //        return false;
        //    }
        //    catch (Exception ex)
        //    {

        //        return false;
        //    }
        //}

    }
}