using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParkingManagement.Object
{
    public class AcountOwner
    {
       
        public Account account { get; set; }
        public Owner owner { get; set; }
        public bool isActive { get; set; }

        public AcountOwner(Account account, Owner owner, bool isActive)
        {         
            this.account = account;
            this.owner = owner;
            this.isActive = isActive;
        }
    }

   

    
}
