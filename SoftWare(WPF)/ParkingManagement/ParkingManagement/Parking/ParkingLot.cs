using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParkingManagement.Parking
{
    public class ParkingLot
    {
        public string Id { get;set; }
        public string IdOwner { get;set; }
        public string Name { get;set; } 
        
        public string Address { get;set; }
        public string LocationCode { get;set; }
        public bool IsActive { get;set; }     

        public string ImageUrlLot { get; set; }
        public string Description { get;set; }

        public bool IsRoof { get; set; }
        public bool IsGuard { get; set; }

        public ParkingLot(string id, string idOwner, string name, string address, string locationCode, bool isActive, string imageUrlLot, string description, bool isRoof, bool isGuard)
        {
            Id = id;
            IdOwner = idOwner;
            Name = name;
            Address = address;
            LocationCode = locationCode;
            IsActive = isActive;
            ImageUrlLot = imageUrlLot;
            Description = description;
            IsRoof = isRoof;
            IsGuard = isGuard;
        }
    }
}
