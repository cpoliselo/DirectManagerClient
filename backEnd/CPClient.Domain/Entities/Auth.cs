using System;
using System.Collections.Generic;
using System.Text;

namespace CPClient.Domain.Entities
{
    public class Auth : BaseEntity
    {
        public string userName { get; set; }

        public string password { get; set; }
    }
}

