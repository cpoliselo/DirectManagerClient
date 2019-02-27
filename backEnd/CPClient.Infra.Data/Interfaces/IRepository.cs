using CPClient.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace CPClient.Data.Interfaces
{
    public interface IRepository<T> where T : BaseEntity
    {

        void Commit();

        bool Insert(T obj, bool commit = true);

        bool Update(T obj);

        bool Delete(T obj);

        T Select(int id);

        IList<T> Select();
    }
}

