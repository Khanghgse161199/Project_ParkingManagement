using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParkingManagement.Parking
{
    public class ParkingSub
    {
        public string Id { get; set; }
        public string IdParkingLot { get; set; }
        public string Name { get; set; }
        public string Ammount { get; set; }
        public string UrlImage { get; set; }
        public bool IsActive { get; set; }

        public ParkingSub(string id, string idParkingLot, string name, string ammount, string urlImage, bool isActive)
        {
            Id = id;
            IdParkingLot = idParkingLot;
            Name = name;
            Ammount = ammount;
            UrlImage = urlImage;
            IsActive = isActive;
        }
    }
}
