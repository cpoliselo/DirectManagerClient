using FluentValidation;
using CPClient.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace CPClient.Service.Interfaces
{
    public interface IService<T> where T : BaseEntity
    {
        bool Post(T obj);

        bool Put(T obj);

        bool Delete(T obj);

        T Get(int id);

        IList<T> Get();
    }
}
