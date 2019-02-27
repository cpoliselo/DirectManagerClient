using CPClient.Domain.Entities;
using CPClient.Data.Interfaces;
using CPClient.Infra.Data.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CPClient.Infra.Data.Repository
{
    //https://stackoverflow.com/questions/40974378/using-method-of-inherited-interface-with-generic-repository-pattern-unitofwork
    public class BaseRepository<T> : IRepository<T> where T : BaseEntity
    {
        //private SqlContext context2 = new SqlContext();

        protected SqlContext _context;
        private bool _disposed;

        public BaseRepository(SqlContext context)
        {
            _context = context;
        }

        //public BaseRepository()
        //{
        //    _context = context2;
        //}

        public void Commit()
        {
            _context.SaveChanges();
        }

        public bool Insert(T obj, bool commit = true)
        {
            try
            {
                var retorno = _context.Set<T>().Add(obj);
                if (commit)
                    _context.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool Update(T obj)
        {
            try
            {
                _context.Entry(obj).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                _context.SaveChanges();

                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool Delete(T obj)
        {
            try
            {
                obj.Ativo = false;
                obj.DataAtualizacao = System.DateTime.Now;
                _context.Entry(obj).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                _context.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public IList<T> Select()
        {
            return _context.Set<T>().ToList();
        }

        public T Select(int id)
        {
            return _context.Set<T>().Find(id);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public virtual void Dispose(bool disposing)
        {
            if (!_disposed && disposing)
            {
                _context.Dispose();
            }
            _disposed = true;
        }
    }
}
