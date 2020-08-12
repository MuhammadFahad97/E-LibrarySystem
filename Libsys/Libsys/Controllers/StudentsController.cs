using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using System.Web.Mvc;
using Libsys.Models;

namespace Libsys.Controllers
{
    // [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    [ValidateAntiForgeryToken]
    public class StudentsController : ApiController
    {
        private libsysEntities db = new libsysEntities();

        // GET: api/Students
        [Authorize(Roles ="Admin")]
        public IHttpActionResult Getstudents()
        {
            //if (System.Web.HttpContext.Current.Session["UserID"] == null && System.Web.HttpContext.Current.Session["UserName"] == null && System.Web.HttpContext.Current.Session["UserKey"] == null) { return Json("please login"); }
            var students = (from st in db.Students
                            select new
                            {
                                st.studentID,
                                st.studentName,
                                st.userName,
                                st.userPassword,
                                st.studentYear,
                                st.studentFatherName,
                                st.studentAge,
                                st.studentAddress,

                            });
            return Json(students);
        }

        // GET: api/Students/5
        [ResponseType(typeof(Student))]
        public IHttpActionResult GetStudent(int id)
        {
            var student = (from std in db.Students where std.studentID==id select new{

                std.studentID,
                std.studentName,
                std.studentFatherName,
                std.studentAddress,
                std.studentAge,
                
            }).FirstOrDefault() ;
            if (student == null)
            {
                return NotFound();
            }

            return Json(student);
        }
        // PUT: api/Students/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutStudent(int id,[FromBody] Student student)
        {
            if (student == null) {
                return Json("null student");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != student.studentID)
            {
                return BadRequest();
            }

            db.Entry(student).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Students
        [ResponseType(typeof(Student))]
        public IHttpActionResult PostStudent(Student student)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Students.Add(student);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = student.studentID }, student);
        }

        // DELETE: api/Students/5
        
        [ResponseType(typeof(Student))]
        public IHttpActionResult DeleteStudent(int id)
        {
            Student student = db.Students.Find(id);
            if (student == null)
            {
                return NotFound();
            }

            db.Students.Remove(student);
            db.SaveChanges();

            return Json("success");
        }
       
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool StudentExists(int id)
        {
            return db.Students.Count(e => e.studentID == id) > 0;
        }
    }
}