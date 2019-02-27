using FluentValidation;
using CPClient.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace CPClient.Data.Interfaces
{
    public interface IService<T> where T : BaseEntity
    {
        T Post<V>(T obj) where V : AbstractValidator<T>;

        T Put<V>(T obj) where V : AbstractValidator<T>;

        bool Delete(T obj);

        T Get(int id);

        IList<T> Get();
    }
}
