using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParkingManagement.Parking
{
    public class ParkingSlot
    {    
            public string Id { get; set; }
            public string IdParkingLot { get; set; }
            public string IdParkingSub { get; set; }

            public string Name { get; set; }
            public string Acreage { get; set; }
            public string ImgUrl { get; set; }

            public double PriceDaytime { get; set; }
            public double PriceOverNight { get; set; }
            public Status status{ get; set; }

            public bool IsActive { get; set; }

        public enum Status
        {
            Empty,
            Booked,
        }

        public ParkingSlot(string id, string idParkingLot, string idParkingSub, string name, string acreage, string imgUrl, double priceDaytime, double priceOverNight, Status status, bool isActive)
        {
            Id = id;
            IdParkingLot = idParkingLot;
            IdParkingSub = idParkingSub;
            Name = name;
            Acreage = acreage;
            ImgUrl = imgUrl;
            PriceDaytime = priceDaytime;
            PriceOverNight = priceOverNight;
            this.status = status;
            IsActive = isActive;
        }
    }
}
