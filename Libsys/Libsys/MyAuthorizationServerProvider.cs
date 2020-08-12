using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace Libsys
{
    public class MyAuthorizationServerProvider: OAuthAuthorizationServerProvider
    {

        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            Models.Student user_identity = null;
            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            using (Models.libsysEntities db = new Models.libsysEntities())
            {

                user_identity = db.Students.SingleOrDefault(user => user.userName == context.UserName && user.userPassword == context.Password);
            }
            if (user_identity!=null && user_identity.userName=="fahad@gmail.com")
            {
                identity.AddClaim(new Claim(ClaimTypes.Role, "Admin"));
                identity.AddClaim(new Claim("username", user_identity.userName));
                identity.AddClaim(new Claim(ClaimTypes.Name, user_identity.studentName));
                context.Validated(identity);
            }
            else if (user_identity != null && user_identity.userName != "fahad@gmail.com") {

                identity.AddClaim(new Claim(ClaimTypes.Role, "user"));
                identity.AddClaim(new Claim("username", user_identity.userName));
                identity.AddClaim(new Claim(ClaimTypes.Name, user_identity.studentName));
                context.Validated(identity);

            }
            else {

                context.SetError("invalid username of password");
                return;
            }
        }
    }
    
    

}