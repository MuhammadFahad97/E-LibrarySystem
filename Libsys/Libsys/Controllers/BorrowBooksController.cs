using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.Cors;
using Libsys.Models;
using System.Web.Mvc;

namespace Libsys.Controllers
{//[EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*") ]
    [ValidateAntiForgeryToken]
    public class BorrowBooksController : ApiController
    {
        private libsysEntities db = new libsysEntities();
        
        private string[] datearray = new string[3];
        // GET: api/BorrowBooks
        [Authorize]
        
        public IHttpActionResult GetborrowBooks()
        {
            //foreach (var item in db.BorrowBooks)
            //{
            //    datearray = item.BorrowDate.Split('-');
            //    if ((Convert.ToInt32(datearray[0])+3) < Convert.ToInt32(DateTime.Today.Day))
            //    {

            //        db.BorrowBooks.Remove(item);
            //        db.SaveChanges();
            //    }
            //}
            ////28-1=(25-30) Logic:
            //if(DateTime.Today.Day - Convert.ToInt32(datearray[0]))== negative_value{
            //check if(Convert.ToInt32(datearray[0]) + negative_value >3) {then delete
            //else donot delete}}


            var booksborrowed = (from x in db.BorrowBooks
                                 join y in db.Students on x.StudentID equals y.studentID
                                 select new
                                 {
                                     x.BookID,
                                     x.BookTitle,
                                     x.BorrowDate,
                                     x.MyBorrowID,
                                     x.StudentID



                                 });

            
            return Json(booksborrowed);
        }

        // GET: api/BorrowBooks/5
        [ResponseType(typeof(BorrowBook))]
        public IHttpActionResult GetBorrowBooks(int id)
        {
            var userBooks = (from brb in db.BorrowBooks
                                 join std in db.Students on brb.StudentID equals std.studentID
                                 where std.studentID==id
                                 select new
                                 {
                                     brb.BookID,
                                     brb.BookTitle,
                                     brb.BorrowDate,
                                     brb.MyBorrowID,
                                     brb.StudentID



                                 });


            var nonUserBooks = (from brb in db.BorrowBooks
                                 join std in db.Students on brb.StudentID equals std.studentID
                                 where std.studentID != id
                                 select new
                                 {
                                     brb.MyBorrowID,
                                     brb.BookID,
                                     brb.BookTitle,
                                     


                                 });

            UserBooksModel mdl_UserBooks = new UserBooksModel();
            mdl_UserBooks.userBooks = userBooks;
            mdl_UserBooks.nonUserBooks = nonUserBooks;

            return Json(mdl_UserBooks);
        }

        // PUT: api/BorrowBooks/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBorrowBooks(int id, BorrowBook borrowBooks)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != borrowBooks.MyBorrowID)
            {
                return BadRequest();
            }

            db.Entry(borrowBooks).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BorrowBooksExists(id))
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

        // POST: api/BorrowBooks
        [ResponseType(typeof(BorrowBook))]
        public IHttpActionResult PostBorrowBooks(BorrowBook borrowBooks)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            db.BorrowBooks.Add(borrowBooks);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = borrowBooks.MyBorrowID }, borrowBooks);
        }

        // DELETE: api/BorrowBooks/5
        [ResponseType(typeof(BorrowBook))]
        public IHttpActionResult DeleteBorrowBooks(int id)
        {
            BorrowBook borrowBooks = db.BorrowBooks.Find(id);
            if (borrowBooks == null)
            {
                return NotFound();
            }

            db.BorrowBooks.Remove(borrowBooks);
            db.SaveChanges();

            return Ok(borrowBooks);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BorrowBooksExists(int id)
        {
            return db.BorrowBooks.Count(e => e.MyBorrowID == id) > 0;
        }
    }
}