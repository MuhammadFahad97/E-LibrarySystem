using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Libsys.Models
{
    public class LoginResponseModel
    {
        public object Token { get; set; }
        public int StudentID { get; set; }
    }
}